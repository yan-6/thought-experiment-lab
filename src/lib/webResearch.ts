import { callInfiniSynapse } from "./infinisynapse";

const RESEARCH_SYSTEM = `你是一个研究助手，负责为思维实验收集真实世界的数据背景。

用户提出了一个假设，你需要快速整理出与这个假设相关的真实数据或事实，用作实验分析的基础。

要求：
1. 如果假设涉及经济（如通胀、GDP、就业），提供近年真实数据。
2. 如果假设涉及科技，提供相关技术的当前状态。
3. 如果假设涉及社会，提供相关人口、趋势或调查数据。
4. 如果假设涉及环境，提供相关气候、能源数据。
5. 不要编造数据——如果你不确定，就说"数据不确定，以下为推测范围"。
6. 用中文输出，简洁明了。
7. 输出不超过 500 字。
8. 格式：列出 3-5 条关键数据点，每条一行。`;

export interface ResearchContext {
  keyword: string;
  dataPoints: string[];
  timestamp: string;
}

export async function researchHypothesis(
  hypothesis: string,
  config: { subject: string; domains: string[]; scope: string; region: string }
): Promise<ResearchContext | null> {
  const domainList = config.domains.join("、");
  const prompt = `假设：${hypothesis}
实验对象：${config.subject}
影响领域：${domainList}
范围：${config.scope} | 地区：${config.region}

请为这个思维实验收集相关的真实世界数据背景。`;

  try {
    const raw = await callInfiniSynapse(
      [
        { role: "system", content: RESEARCH_SYSTEM },
        { role: "user", content: prompt },
      ],
      { temperature: 0.3, maxTokens: 800, timeoutMs: 25000 }
    );

    const lines = raw
      .split(/\n/)
      .map((l) => l.replace(/^[\d\-•·*]\s*/, "").trim())
      .filter((l) => l.length > 10);

    return {
      keyword: config.subject,
      dataPoints: lines.slice(0, 5),
      timestamp: new Date().toISOString(),
    };
  } catch {
    console.warn("Research call failed for:", hypothesis.slice(0, 40));
    return null;
  }
}

/** Quick fallback — generates basic context from config without API call */
export function basicResearchContext(config: {
  subject: string;
  domains: string[];
  scope: string;
  region: string;
}): ResearchContext {
  const domainStr = config.domains.join("、");
  return {
    keyword: config.subject,
    dataPoints: [
      `范围：${config.scope}级别影响，涉及${config.region}`,
      `主要领域：${domainStr}`,
      `核心变量：${config.subject}`,
      `影响规模：${config.scope === "全球" ? "全球性" : config.scope === "国家" ? "全国性" : config.scope === "城市" ? "城市级" : "个人级"}影响`,
      `分析维度：经济、社会、技术、政策等多维度综合推演`,
    ],
    timestamp: new Date().toISOString(),
  };
}