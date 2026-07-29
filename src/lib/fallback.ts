import { ExperimentResult, ExperimentConfig } from "@/types/experiment";

export const FALLBACK_EXPERIMENT_CONFIG = {
  title: "微信消失一年",
  subject: "微信及其数字生态",
  change: "微信在中国大陆停止运行一年",
  duration: "一年",
  scope: "国家" as const,
  adaptation_speed: "中等" as const,
  replacement_level: "有限允许",
  intervention_level: "有限",
  affected_domains: ["社交", "支付", "商业", "办公"],
  assumptions: ["互联网基础设施正常运行", "其他应用可以继续使用", "市场允许替代产品出现"],
};

export const FALLBACK_RESULT: ExperimentResult = {
  experiment: FALLBACK_EXPERIMENT_CONFIG,
  dependency_graph: { core: "", direct_nodes: [], secondary_nodes: [], long_term_nodes: [] },
  direct_effects: [], second_order_effects: [], unexpected_effects: [],
  timeline: [], worldlines: [], constraint_conflicts: [],
  biggest_winners: [], biggest_losers: [],
  first_breaking_point: "", hardest_to_replace: "", new_thing_created: "", final_insight: "",
  disclaimer: "本结果为 AI 辅助的结构化思维实验。段子是真的，预测是假的。",
};

// ═══════════════════════════════════════════════════════════
// Dynamic fallback — dramatic, twist-filled, unexpected
// ═══════════════════════════════════════════════════════════

function extractKeyword(h: string): string {
  return h.replace(/^(如果|假如|假设|要是|一旦)\s*/i, "").replace(/[？?。.!！~～,，\s]*(会发生什么|会怎样|会如何|怎么样|如何|怎么办|呢|吗)?[？?。.!！~～]*$/, "").slice(0, 10).trim();
}

const IMPACT = ["critical","high","high","medium","medium","low"] as const;

interface S { subject:string; title:string; change:string; keyword:string; scope:string; duration:string; domains:string[]; }

function buildTemplates(s: S) {
  const { subject, title, keyword, scope, domains } = s;
  const d1 = domains[0] || "相关领域";
  const d2 = domains[1] || domains[0] || "日常生活";

  return {
    directEffects: [
      `${d1}体系陷入混乱——但这只是开胃菜。真正吓人的是${keyword}消失后暴露出的那根一直靠它撑着的暗柱。`,
      `用户的第一反应不是恐慌，是茫然——就像突然发现空气有重量，因为之前从来不需要考虑它的存在。`,
      `与${subject}直接绑定的${d1}从业者第一时间发现：自己引以为傲的「不可替代性」，有效期只有 24 小时。`,
      `最早的赢家不是替代品，是「教你怎么不用${keyword}」的知识付费账号——一周涨粉百万，然后两个月后无人问津。`,
      `最先慌乱的不是普通人，是那些已经用${keyword}默默取代了自己核心能力的机构和平台——他们比任何人都慌。`,
    ],
    secondOrderEffects: [
      `平台替代战正式打响。但更精彩的不是谁赢了——是那些从未想过的玩家突然加入牌局：${scope === "个人" ? "隔壁邻居" : scope === "城市" ? "本地小卖部" : "跨国巨头"}开始干起了跟${d1}毫无关系的事，结果反而赚翻了。`,
      `${d2}领域发生了谁也没预料到的诡异转变：那些一直被${d1}压得抬不起头的「过时」方法，突然成了香饽饽——复古真是一种不可战胜的力量。`,
      `「${keyword}缺失焦虑症」被正式命名——虽然不是真实的医学诊断，但不妨碍有人在淘宝上花 399 元买「治愈课程」。`,
      `一个完全不在任何预测范围内的角色成为最大赢家：${scope === "国家" ? "线下实体店老板" : scope === "全球" ? "某个叫不上名字的小岛国" : "一个名不见经传的小公司"}。世界就是这么不公平，但这次是不公平得好。`,
      `${d1}行业的精英们集体经历了一次「存在主义危机」——如果你被一个你曾经看不起的东西取代了，那你究竟是比以前更强了还是更弱了？`,
    ],
    unexpectedEffects: [
      `一个跟${subject}八竿子打不着的冷门行业原地起飞——因为它恰好是${keyword}缺失后唯一不需要做任何改变就能照常运转的。有时候「什么都不做」才是核心竞争力。`,
      `${title}被拍成了纪录片，上映首周票房超过好莱坞大片。人类果然最爱看别人遭殃。`,
      `一个意想不到的社会运动兴起：呼吁「回到${subject}之前的世界」。但讽刺的是，这个运动完全靠智能手机和社交网络组织——而这两样东西如果没有${keyword}的消失，根本不会获得这么多注意力。`,
      `${scope}范围内诞生了一个新的社交礼仪：「你还记得原来有${keyword}的日子吗」成为新一代破冰话题。怀旧产业蓬勃发展——而这一切不过才过了几个月。`,
      `一小群人在${subject}消失后的第三天就完全适应了，仿佛什么都没发生。他们不是麻木——他们是那种永远能在任何世界找到活法的人。人类学家开始研究他们，但至今没能总结出什么有价值的结论。`,
    ],
  };
}

function generateTimeline(s: S) {
  const { subject, keyword, domains } = s;
  const d1 = domains[0] || "该领域";

  return [
    {
      time: "T + 1 天",
      headline: "没人觉得这真会发生——直到它发生了",
      description: `${keyword}的变化在第一秒只是一个谣言，第一分钟变成热搜，第一小时变成恐慌。但恐慌的人不是你以为的那些人——最先打电话确认的不是${d1}从业者，是投资者。钱从来比人先闻到血腥味。`,
      impact_level: "critical",
    },
    {
      time: "T + 1 周",
      headline: "替代品混战——但最猛的玩家不在牌桌上",
      description: `媒体还在报道「谁将取代${subject}」，但真正的答案藏在另一个赛道：那些根本不想取代${subject}、只想趁乱收割认知盈余的人。他们不声不响地赚走了第一批钱，而所有人都在看别处。`,
      impact_level: "high",
    },
    {
      time: "T + 1 月",
      headline: "第一个反转：敌人变成了朋友，朋友变成了敌人",
      description: `所有人都以为会受益的一方反而开始焦头烂额——因为他们发现${subject}的缺失暴露出自己一直以来的隐性依赖。而那些哭得最大声的人，悄悄完成了转型，现在正微笑着看别人手忙脚乱。`,
      impact_level: "high",
    },
    {
      time: "T + 3 月",
      headline: "第二个反转：解决方案比问题还糟糕",
      description: `一系列「替代方案」相继推出——每一个都在解决一个问题的同时制造了两个新问题。${d1}领域变成了一场打地鼠游戏。有人在论坛上留言：「我开始怀念原来的${keyword}了，至少那时候我只用一个App。」这条评论的点赞数破了纪录。`,
      impact_level: "medium",
    },
    {
      time: "T + 1 年",
      headline: "新世界并不是旧世界的修复版——它是另一个东西",
      description: `一年后回头看，变化最大不是技术或商业模式，是人的心态。那些坚持「一切都会恢复原样」的人终于放弃了——不是因为恢复了不可能，而是因为他们自己已经不是一年前的自己了。${subject}的缺失像一个引力黑洞，把所有人的生活轨迹拉向了完全没预料到的方向。有人变得更好，有人变得更糟——但没人留在原地。`,
      impact_level: "medium",
    },
  ];
}

function generateWorldlines(s: S) {
  const { subject, keyword, domains, title } = s;
  const d1 = domains[0] || "该领域";

  return [
    {
      name: "世界线 A：赢家通吃——但赢家不是你猜的那个",
      likelihood: "More Likely",
      summary: `看起来是「快速适应」的故事：${d1}市场迅速被几个巨头瓜分。但真正的转折发生在无人关注的角落——某个一直被${subject}压制的边缘玩家，利用${keyword}消失后的真空，悄悄吃掉了一个被所有人忽视的利基市场。等大家反应过来时它已经大到不能忽略了。这场游戏的最大赢家，从始至终没有出现在任何一篇主流分析里。`,
      turning_point: `一家从来没人听过的公司推出了一项「根本不打算替代${keyword}」的服务——结果人们蜂拥而至，因为它做了一件${subject}从来没想过要做的事`,
      winners: [`一个你完全没听过的公司——这才是最可怕的地方`, `不声不响收割认知盈余的人`, `在混乱中保持冷静的长期主义者`],
      losers: [`所有在头条新闻上被预测为「赢家」的——因为一个人尽皆知的赢家通常不是真正的赢家`, `过于依赖${subject}的既得利益者`, `花了太多时间预测未来以至于错过了现在的人`],
      trigger_conditions: [`市场上有足够的「边缘玩家」等待机会`, `${d1}的准入门槛没有高到离谱`, `信息不对称足够严重——总有人知道别人不知道的东西`],
    },
    {
      name: "世界线 B：谁也不赢——大家一起烂得整整齐齐",
      likelihood: "Plausible",
      summary: `这是一条让所有乐观主义者沉默的世界线。${subject}的缺失没有催生出更好的替代方案——它只是让人们发现：原来这个问题根本没有好的解。各种半吊子方案此起彼伏，用户在不同平台之间反复横跳，效率不升反降。但这还不是最糟糕的——最糟糕的是人们发现自己开始对「烂」这件事感到麻木。曾经不可接受的事，现在变成了「还行吧，习惯了」。真正的悲剧不是失败，是慢慢习惯了失败。`,
      turning_point: `第三个「终极解决方案」宣告失败的那个下午——人们不再愤怒，只是默默地把手机切到了下一个App。这就是绝望的真正模样。`,
      winners: [`那种能在任何环境下活下去的人——不是因为强大，是因为他们已经没有任何期待了`, `卖「怀旧经济」的人：${keyword}周边纪念品、${subject}时代的BGM合集、回忆录`, `心理咨询师——人们需要有人告诉他们：习惯混乱不是一种病`],
      losers: [`理想主义者——这是最不适合他们的世界线`, `相信${title}会催生更好未来的人`, `习惯了「效率至上」叙事的人——这个世界不在乎效率，它只在乎你什么时候认命`],
      trigger_conditions: [`${d1}领域的结构性问题太深，表面替代无法解决`, `各利益方无法就统一标准达成共识`, `用户的集体行动能力比所有人以为的都弱——因为大家都累了`],
    },
    {
      name: "世界线 C：一切都反过来了",
      likelihood: "Edge Case",
      summary: `这不是悲观或乐观——这是一条把因果完全翻转的世界线。${subject}缺失后，人们没有去寻找替代方案，而是开始质疑：我们一开始为什么需要${keyword}？这场无心的哲学追问，意外催生了一场去中心化运动——不是技术意义上的去中心化，是生活方式的去中心化。${d1}不再是少数几个应用定义的赛道，而变成了一种人人参与的社会实践。这听起来很理想主义，对吗？但它最荒谬的地方在于：它真的大规模发生了。不是因为技术、不是因为政策——是因为人这个东西，在被逼到角落的时候，偶尔会做出意想不到的选择。`,
      turning_point: `一个程序员在论坛上发了个帖子，标题是：「我花了一个月，不用任何${d1}平台，活得很好。」帖子下面第一个回复是：「所以你这一个月是在哪个论坛发的帖？」但这条回复被淹没在了 10 万条好奇的讨论中。`,
      winners: [`那些从来不依赖${subject}也能活得好的人——他们一直存在，只是不酷，现在突然变得很酷`, `教人们「如何用非${d1}的方式做${d1}」的人——这门课可能只火一季，但足够改变一些人的思维`, `被${subject}排除在外的群体——他们终于等到了弯道超车的机会`],
      losers: [`中心化平台——不是因为它们不好，是因为这世界线里的风向不对。平台本身没问题，问题是人们突然不想要了。`, `过于依赖「趋势分析」的投资人——这条世界线里所有正确的投资决策看起来都像在犯蠢`, `那些在A和B之间犹豫不决的人——他们还没做出选择，选择就已经替他们做了`],
      trigger_conditions: [`一种集体性的「反思疲劳」达到临界点——人们厌倦了被动接受`, `某次偶然事件成为导火索——不需要很大，但需要在对的时间发生`, `足够多的普通人发现「不用${keyword}」其实也没那么可怕`, `当时没人把这个当回事——包括将从中受益的人自己`],
    },
  ];
}

export function generateDynamicResult(hypothesis: string, config: ExperimentConfig): ExperimentResult {
  const keyword = extractKeyword(hypothesis);
  const s: S = {
    subject: config.subject || keyword,
    title: config.title || keyword,
    change: config.change || hypothesis,
    keyword,
    scope: config.scope || "国家",
    duration: config.duration || "一年",
    domains: config.affected_domains.length > 0 ? config.affected_domains : ["社会经济", "日常生活", "科技产业"],
  };

  const t = buildTemplates(s);
  const depCore = `${s.subject}（以及那些你以为跟它无关、实际上被它拖着走的一切）`;
  const direct = s.domains.map(d => `${d}直接相关系统`);
  const second = s.domains.map(d => `${d}的上下游暗网`);
  const long = [`「后${s.keyword}时代」人类行为学`, `不被${s.subject}定义的新社会契约`, `去中心化的真正含义：不是技术，是心态`];

  return {
    experiment: config,
    dependency_graph: {
      core: depCore,
      direct_nodes: direct.length >= 3 ? direct.slice(0,6) : [...direct, "表面上没关系的行业", "被忽略的基础设施层", "普通人的日常惯性"],
      secondary_nodes: second.length >= 3 ? second.slice(0,8) : [...second, "隐形依赖者联盟", "被逼出来的创新", "没人想承认的脆弱点"],
      long_term_nodes: long.length >= 3 ? long.slice(0,5) : [...long, "被重新定义的社会信任", "从废墟里捡起来的新常识"],
    },
    direct_effects: t.directEffects,
    second_order_effects: t.secondOrderEffects,
    unexpected_effects: t.unexpectedEffects,
    timeline: generateTimeline(s),
    worldlines: generateWorldlines(s),
    constraint_conflicts: [],
    biggest_winners: [
      `第一个想明白「${s.subject}没了以后应该干什么」的人——不一定是最聪明的，但一定是最快的`,
      `那些从来不上头条、但默默把所有准备都做好了的人`,
      `在混乱中找到新秩序的人——这种人不多，但每一个都值得被记住`,
    ],
    biggest_losers: [
      `把所有身家性命都押在${s.subject}不变量的人`,
      `在关键时刻犹豫不决的人——不是因为他们做错了选择，是因为他们没做选择`,
      `花最多时间分析${s.title}的专家们——世界不按剧本走的时候，专家是最痛苦的`,
    ],
    first_breaking_point: `${s.domains[0] || "关键系统"}的隐形断裂——不是最大的那一环，是最没人注意到但一旦断了就全崩的那一环`,
    hardest_to_replace: `不是${s.subject}本身——是围绕${s.subject}生长出来的那种「理所当然」。人类最怕的不是失去功能，是失去确定感。`,
    new_thing_created: `一种目前还不存在、但一年后回头看会觉得「这玩意怎么才出现」的物种——它之所以之前不存在，不是因为技术做不到，是因为${s.subject}的存在让它没有活下来的理由。`,
    final_insight: `${s.subject}的消失不是故事的终点，是故事的真正开始。因为只有在旧规则失效的时候，我们才能看到——原来决定世界走向的，从来不是那些我们以为不可替代的东西，而是那些在它们消失后才被发现的东西。所以问题不是「没有${s.keyword}该怎么活」，而是「你怎么知道自己只能那样活？」`,
    disclaimer: `本结果为 AI 辅助的结构化思维实验。以上分析基于「${s.subject}」的假设生成，可能含有令人不适的真相和令人舒适的谎言。请自行分辨。不建议作为人生决策依据。`,
  };
}