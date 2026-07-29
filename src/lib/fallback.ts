import { ExperimentResult, ExperimentConfig } from "@/types/experiment";

// ─── Static preset — only used as last-resort fallback ───
export const FALLBACK_EXPERIMENT_CONFIG = {
  title: "微信消失一年",
  subject: "微信及其数字生态（aka 你手机里最胖的那个 App）",
  change: "微信突然被外星人绑架，在中国大陆停止运行一年",
  duration: "一年",
  scope: "国家" as const,
  adaptation_speed: "中等" as const,
  replacement_level: "有限允许",
  intervention_level: "有限",
  affected_domains: ["社交", "支付", "商业", "办公", "朋友圈点赞内卷"],
  assumptions: [
    "互联网基础设施正常运行（Wi-Fi 密码依然有效）",
    "其他应用可以继续使用（QQ 老将申请出战）",
    "市场允许替代产品出现（但不保证好用）",
  ],
};

export const FALLBACK_RESULT: ExperimentResult = {
  experiment: FALLBACK_EXPERIMENT_CONFIG,
  dependency_graph: {
    core: "微信生态系统（一个绿色图标统治的帝国）",
    direct_nodes: ["即时通讯服务", "移动支付系统", "小程序平台", "公众号内容生态", "企业微信办公", "朋友圈社交网络"],
    secondary_nodes: ["私域流量商业", "广告投放渠道", "客户关系管理", "社区团购网络", "政务服务入口", "社交游戏平台"],
    long_term_nodes: ["去中心化社交协议", "超级应用竞争格局", "反垄断新规", "人类重新学会打电话", "跨平台互联互通"],
  },
  direct_effects: [],
  second_order_effects: [],
  unexpected_effects: [],
  timeline: [],
  worldlines: [],
  constraint_conflicts: [],
  biggest_winners: [],
  biggest_losers: [],
  first_breaking_point: "",
  hardest_to_replace: "",
  new_thing_created: "",
  final_insight: "",
  disclaimer: "本结果为 AI 辅助的结构化思维实验。文章里的段子是真的，预测是假的。",
};

// ═══════════════════════════════════════════════════════════
// Dynamic fallback — generates unique results per hypothesis
// ═══════════════════════════════════════════════════════════

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** extract a 2-4 character keyword from the end-user hypothesis */
function extractKeyword(hypothesis: string): string {
  const cleaned = hypothesis.replace(/^(如果|假如|假设|要是|一旦)\s*/i, "").replace(/[？?。.!！~～,，\s]*(会发生什么|会怎样|会如何|会怎么样|怎么样|如何|怎么办|呢|吗)?[？?。.!！~～]*$/, "");
  return cleaned.slice(0, 8).trim() || cleaned.slice(0, 8).trim();
}

/** direction words for generating varied worldline summaries */
const DIRECTIONS = ["乐观版", "悲观版", "魔幻版"];
const LIKELIHOODS = ["More Likely", "Plausible", "Edge Case"] as const;
const IMPACT_LEVELS = ["critical", "high", "high", "medium", "medium", "low"] as const;

const TIMELINE_LABELS = [
  { label: "T + 1 天", headline: "第一波冲击来了" },
  { label: "T + 1 周", headline: "连锁反应开始扩散" },
  { label: "T + 1 月", headline: "旧秩序瓦解，新势力登场" },
  { label: "T + 3 月", headline: "各方博弈白热化" },
  { label: "T + 1 年", headline: "新常态确立" },
];

interface TemplateSlots {
  subject: string;
  title: string;
  change: string;
  keyword: string;
  scope: string;
  region: string;
  duration: string;
  domains: string[];
  adaptSpeed: string;
}

function buildTemplates(s: TemplateSlots) {
  const { subject, title, keyword, scope, region, domains, change } = s;
  const d1 = domains[0] || "社会经济";
  const d2 = domains[1] || domains[0] || "日常生活";

  return {
    directEffects: [
      `${region}的${d1}体系遭受直接冲击——${keyword}突然消失/改变，相关从业者一脸懵`,
      `${subject}的突然变动引发 ${d2} 领域的连锁紊乱，短期内出现混乱`,
      `与${subject}直接相关的${d1}产业链面临断崖式调整，从业者开始疯狂刷招聘软件`,
      `${scope}范围内的${d2}模式被迫重构，旧有的习惯一夜之间全部作废`,
      `围绕${keyword}建立起来的一整套游戏规则瞬间失效，既得利益者们开始手忙脚乱`,
    ],
    secondOrderEffects: [
      `${d1}的震荡波传导到${d2}领域——本来觉得跟自己没关系的人突然发现自己也被卷进去了`,
      `替代方案开始涌现，但每个替代方案都引发了意料之外的连锁问题`,
      `围绕${subject}缺失形成的新商业模式迅速出现，像雨后蘑菇一样，有毒没毒还不确定`,
      `${scope}范围内的政策制定者开始紧急开会，互联网上出现了至少 37 种互相矛盾的解读`,
      `${d2}行业重新洗牌，曾经的边缘玩家意外获得了出头机会`,
      `一波围绕「后${keyword}时代」的创业潮袭来，投资人疯狂撒币但大部分会打水漂`,
    ],
    unexpectedEffects: [
      `原本跟${subject}八竿子打不着的行业竟然意外受益——世界就是这么不讲道理`,
      `${region}人民的某个人类本能行为突然回归（比如面对面聊天、手写书信等复古操作）`,
      `一种「泛${keyword}焦虑症」在社交媒体上传播——虽然大部分人其实并不真的受影响`,
      `${subject}的变化意外引发了对一个更深层社会问题的讨论`,
      `一小撮人靠着炒作「${title}」概念发了大财，而真正受影响的人还在发朋友圈吐槽`,
    ],
    worldlineSummaries: [
      `${subject}的变化被市场快速消化，${region}展现出惊人的适应力。短期阵痛后，新的${d1}生态在这一年中迅速成型，最终比原来更多元、更有弹性。`,
      `${subject}的变化引发连锁崩溃，${d2}等多个领域受到波及。重建过程缓慢而痛苦，${region}在这一年里经历了「断奶」的剧烈阵痛。`,
      `${subject}的变化触发了完全意料之外的蝴蝶效应，一路狂奔向荒诞的方向。${region}在这一年里见证了一系列黑天鹅事件，最终结果让所有预言家颜面扫地。`,
    ],
  };
}

function generateTimeline(s: TemplateSlots) {
  const { subject, keyword, region, domains } = s;
  const d1 = domains[0] || "该领域";
  return TIMELINE_LABELS.map((t, i) => ({
    time: t.label,
    headline: `${t.headline}：${subject}影响下的${region}`,
    description: i === 0
      ? `${keyword}的变化在第一条发生，${region}各界反应从「不至于吧」到「卧槽真的假的」仅用了几个小时。${d1}相关从业者开始紧急评估影响。社交媒体上出现大量段子和少量恐慌。`
      : i === 1
      ? `冲击波从${d1}蔓延到更多领域。媒体开始用「后${keyword}时代」来概括这个新世界。专家们纷纷发表观点，其中至少有一半是互相矛盾的。普通居民开始认真思考：这对我到底意味着什么？`
      : i === 2
      ? `围绕「后${keyword}时代」的讨论进入深水区。有人呼吁回归传统，有人主张全面拥抱变化。${region}各界力量开始博弈，新的利益格局在混乱中逐渐成型。`
      : i === 3
      ? `${keyword}变化引发的震荡开始沉淀为结构性改变。一些适应快的群体已经找到了新活法，而反应慢的群体还在怀念「那个有${subject}的好时光」。${region}出现了一批「${keyword}难民」和一批「${keyword}淘金者」。`
      : `一年过去，${region}人民惊觉自己已经习惯了没有${subject}（或者说${subject}变样后）的生活。历史学者开始撰文：「${keyword}事件将被称为这个时代的转折点。」当然，也可能只是普通人茶余饭后的一个话题罢了。`,
    impact_level: IMPACT_LEVELS[i],
  }));
}

function generateWorldlines(s: TemplateSlots) {
  const { subject, keyword, region, domains, title } = s;
  const d1 = domains[0] || "该领域";
  const summaries = buildTemplates(s).worldlineSummaries;

  return [
    {
      name: `Worldline A — ${DIRECTIONS[0]} 😎`,
      likelihood: LIKELIHOODS[0],
      summary: summaries[0],
      turning_point: `一家创业公司推出「${keyword}替代方案2.0」，用户发现新方案竟然比原来好用一点点`,
      winners: [`率先拥抱变化的${d1}从业者`, `做${keyword}替代方案的创业者`, `${region}的灵活适应者`],
      losers: [`死守旧模式的${d1}顽固派`, `以为${subject}会恢复原样的天真投资人`, `靠信息差吃饭的中间商`],
      trigger_conditions: [
        `${region}社会有较强的适应能力和容错空间`,
        `技术方案能够快速填补${subject}缺失的空白`,
        `没有外部力量强行干预市场自组织`,
      ],
    },
    {
      name: `Worldline B — ${DIRECTIONS[1]} 🫠`,
      likelihood: LIKELIHOODS[1],
      summary: summaries[1],
      turning_point: `一个关键节点——连替代方案都出现问题时，人们才意识到${subject}原来如此不可替代`,
      winners: [`坚持做多手准备的${d1}老手`, `危机公关公司（业务量大增）`, `教人「如何在${title}中生存」的知识付费博主`],
      losers: [`过度依赖单一${d1}体系的人`, `${region}的保守派（被迫改变最痛苦）`, `在混乱中站错队的人`],
      trigger_conditions: [
        `各利益方互相扯皮，迟迟不能达成共识`,
        `替代方案出现严重的技术或管理问题`,
        `${region}社会对变化缺乏心理准备`,
      ],
    },
    {
      name: `Worldline C — ${DIRECTIONS[2]} 🤪`,
      likelihood: LIKELIHOODS[2],
      summary: summaries[2],
      turning_point: `一个完全没有人预料到的黑天鹅事件——跟${subject}八竿子打不着的某个领域意外爆雷`,
      winners: [`囤积了大量${keyword}相关资源的投机者`, `写${title}畅销书的作者`, `拍${title}纪录片的导演（Netflix 投资）`],
      losers: [`相信一切会按「正常逻辑」发展的人`, `所有试图预测结果的专家（集体翻车）`, `在荒诞中仍然坚持理性的人`],
      trigger_conditions: [
        `多个低概率事件同时发生`,
        `${region}内部出现意料之外的连锁效应`,
        `人类在${subject}变化后做出非理性集体行为`,
      ],
    },
  ];
}

/** ─── The main dynamic generator ─── */
export function generateDynamicResult(
  hypothesis: string,
  config: ExperimentConfig
): ExperimentResult {
  const keyword = extractKeyword(hypothesis);
  const slots: TemplateSlots = {
    subject: config.subject || keyword,
    title: config.title || `${keyword}的${config.duration || "一段时间"}`,
    change: config.change || hypothesis,
    keyword,
    scope: config.scope || "国家",
    region: "相关区域",
    duration: config.duration || "一年",
    domains: config.affected_domains.length > 0 ? config.affected_domains : ["社会经济", "日常生活", "科技产业"],
    adaptSpeed: config.adaptation_speed || "中等",
  };

  const t = buildTemplates(slots);
  const depCore = `${slots.subject}（${slots.keyword}相关生态体系）`;
  const depDirect = slots.domains.map((d) => `${d}系统`) as string[];
  const depSecond = slots.domains.map((d) => `${d}上下游产业链`) as string[];
  const depLong = [
    `「后${slots.keyword}时代」新社会契约`,
    `去中心化替代方案能否成功`,
    `${slots.region}${slots.scope}范围内的规则重构`,
  ];

  // ensure at least meaningful arrays
  const directNodes = depDirect.length >= 3 ? depDirect : [...depDirect, "相关基础设施", "用户习惯与认知", "法律法规体系"];
  const secondaryNodes = depSecond.length >= 3 ? depSecond : [...depSecond, "周边服务生态", "教育培训体系", "金融服务网络"];
  const longTermNodes = depLong.length >= 3 ? depLong : [...depLong, "社会信任机制重建", "新型协作模式"];

  return {
    experiment: config,
    dependency_graph: {
      core: depCore,
      direct_nodes: directNodes.slice(0, 6),
      secondary_nodes: secondaryNodes.slice(0, 8),
      long_term_nodes: longTermNodes.slice(0, 5),
    },
    direct_effects: t.directEffects.slice(0, 5),
    second_order_effects: t.secondOrderEffects.slice(0, 6),
    unexpected_effects: t.unexpectedEffects.slice(0, 5),
    timeline: generateTimeline(slots),
    worldlines: generateWorldlines(slots),
    constraint_conflicts: [],
    biggest_winners: [
      `提前布局「后${slots.keyword}时代」的远见者`,
      `提供${slots.domains[0] || "该领域"}替代方案的创业者`,
      `因${slots.subject}变化而意外获益的边缘玩家`,
      `${slots.region}的灵活适应者`,
      `在这场变化中保持冷静的长期主义者`,
    ],
    biggest_losers: [
      `过度依赖${slots.subject}原状态的既得利益者`,
      `反应迟钝的传统${slots.domains[0] || "行业"}巨头`,
      `在${config.duration || "这段时间"}内押错方向的投机者`,
      `只会用一种方式做事而不愿改变的群体`,
      `被这场变化打乱人生计划的所有普通人`,
    ],
    first_breaking_point: `${slots.domains[0] || "核心系统"}的失灵——每次剧变都是从最脆弱的那根链条开始断裂的`,
    hardest_to_replace: `${slots.subject}所承载的社会关系与日常习惯——技术可以复制，但沉淀下来的生活方式没法 Ctrl+C`,
    new_thing_created: `围绕「${slots.keyword}替代方案」生长出来的全新产业生态——人类在被逼无奈的时候创造力总是爆棚`,
    final_insight: `${slots.subject}的变化不是末日，而是一面镜子——照出我们曾经以为理所当然的一切，原来都建立在多么脆弱的假设之上。而每次「重新开始」，都是一次重新选择的奢侈。`,
    disclaimer: `本结果为 AI 辅助的结构化思维实验。以上推演基于「${slots.subject}」的假设生成，仅供参考娱乐。段子是真的，预测是假的。请勿当真，更请勿据此做任何人生重大决策。`,
  };
}