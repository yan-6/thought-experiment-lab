/**
 * Database connector — queries remote_preset datasets based on
 * the experiment's domain to inject real-world context.
 */
import type { ExperimentConfig } from "@/types/experiment";

interface DataSnapshot {
  source: string;
  description: string;
  facts: string[];
}

interface DataContextOptions {
  baseUrl?: string;
}

/** Main entry: fetch relevant data based on experiment config */
export async function fetchDataContext(
  config: ExperimentConfig,
  options: DataContextOptions = {}
): Promise<DataSnapshot[]> {
  const domains = config.affected_domains.map((d) => d.toLowerCase());
  const snapshots: DataSnapshot[] = [];
  const apiBaseUrl = resolveApiBaseUrl(options.baseUrl);

  // Match domains to available datasets
  if (domains.some((d) => d.includes("经济") || d.includes("金融") || d.includes("支付") || d.includes("消费"))) {
    try {
      const s = await getCreditCardSnapshot(apiBaseUrl);
      if (s) snapshots.push(s);
    } catch {}
  }

  if (domains.some((d) => d.includes("商业") || d.includes("零售") || d.includes("电商") || d.includes("市场"))) {
    try {
      const s = await getSalesSnapshot(apiBaseUrl);
      if (s) snapshots.push(s);
    } catch {}
  }

  if (domains.some((d) => d.includes("办公") || d.includes("就业") || d.includes("职场") || d.includes("人力"))) {
    try {
      const s = await getEmployeeSnapshot(apiBaseUrl);
      if (s) snapshots.push(s);
    } catch {}
  }

  // If no specific match, provide at least one general snapshot
  if (snapshots.length === 0) {
    snapshots.push(generateGeneralSnapshot(config));
  }

  return snapshots;
}

function resolveApiBaseUrl(baseUrl?: string): string {
  if (baseUrl) return baseUrl;
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

async function getCreditCardSnapshot(apiBaseUrl: string): Promise<DataSnapshot | null> {
  try {
    const res = await fetch(`${apiBaseUrl}/api/data/credit-card`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.success) return null;

    const d = data.data;
    return {
      source: "信用卡用户数据库（30,000 条记录）",
      description: `${d.region || "某地区"}真实信用卡用户行为数据`,
      facts: [
        `${d.total_users?.toLocaleString() || "30,000"} 名用户, 平均年龄 ${d.avg_age || "35.5"} 岁`,
        `平均信用额度 ¥${(d.avg_limit || 167484).toLocaleString()}, 违约率 ${d.default_rate || "22.1"}%`,
        `平均信用利用率 ${d.avg_util || "37.3"}%, ${d.zero_overdue || "66.4"}% 用户从未逾期`,
        `支付行为: 月度账单均值反映真实消费习惯`,
      ],
    };
  } catch {
    return null;
  }
}

async function getSalesSnapshot(apiBaseUrl: string): Promise<DataSnapshot | null> {
  try {
    const res = await fetch(`${apiBaseUrl}/api/data/sales`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.success) return null;

    const d = data.data;
    return {
      source: "零售销售数据库（样本数据）",
      description: "跨区域、跨品类零售交易快照",
      facts: [
        `${d.transactions || 20} 笔交易, 总营收 ¥${(d.total_revenue || 4253).toLocaleString()}`,
        `涉及 ${d.categories || 5} 个品类 (电子/服装/体育/家居/图书), ${d.regions || 5} 个区域`,
        `支付方式: 信用卡/借记卡/PayPal/现金, 线上线下双渠道`,
        `客单价 ¥${d.avg_order || "212.63"}, 反映终端消费能力`,
      ],
    };
  } catch {
    return null;
  }
}

async function getEmployeeSnapshot(apiBaseUrl: string): Promise<DataSnapshot | null> {
  try {
    const res = await fetch(`${apiBaseUrl}/api/data/employees`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.success) return null;

    const d = data.data;
    return {
      source: "企业员工数据库",
      description: "跨部门员工薪酬与结构数据",
      facts: [
        `${d.total || 5} 个部门: 技术/市场/财务/人事`,
        `平均月薪 ¥${(d.avg_salary || 16000).toLocaleString()}, 最高 ¥${(d.max_salary || 25000).toLocaleString()}, 最低 ¥${(d.min_salary || 10000).toLocaleString()}`,
        `反映 ${d.region || "某地区"} 中型企业典型人力成本结构`,
      ],
    };
  } catch {
    return null;
  }
}

function generateGeneralSnapshot(config: ExperimentConfig): DataSnapshot {
  const scopeLabel = config.scope || "相关区域";
  return {
    source: "通用经济背景",
    description: `基于实验配置的基本场景描述（${scopeLabel}级别）`,
    facts: [
      `影响范围: ${config.scope}`,
      `涉及领域: ${config.affected_domains.join("、")}`,
      `时间跨度: ${config.duration}`,
      `适应速度: ${config.adaptation_speed}, 替代程度: ${config.replacement_level}`,
    ],
  };
}

/** Format all data snapshots into a single string for AI prompt injection */
export function formatDataContext(
  snapshots: DataSnapshot[],
  config: ExperimentConfig
): string {
  if (snapshots.length === 0) {
    return `实验范围: ${config.scope}级别，涉及${config.affected_domains.join("、")}。`;
  }

  return snapshots
    .map(
      (s) =>
        `📊 【${s.source}】${s.description}\n${s.facts.map((f) => `  • ${f}`).join("\n")}`
    )
    .join("\n\n");
}
