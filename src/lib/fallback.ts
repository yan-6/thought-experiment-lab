import { ExperimentResult } from "@/types/experiment";

export const FALLBACK_EXPERIMENT_CONFIG = {
  title: "微信消失一年",
  subject: "微信及其数字生态",
  change: "微信在中国大陆停止运行一年",
  duration: "一年",
  scope: "国家" as const,
  region: "中国大陆",
  adaptation_speed: "中等" as const,
  replacement_level: "有限允许" as const,
  intervention_level: "有限" as const,
  affected_domains: ["社交", "支付", "商业", "办公", "公共服务"],
  assumptions: [
    "互联网基础设施正常运行",
    "其他应用可以继续使用",
    "市场允许替代产品出现",
  ],
};

export const FALLBACK_RESULT: ExperimentResult = {
  experiment: FALLBACK_EXPERIMENT_CONFIG,
  dependency_graph: {
    core: "微信生态系统",
    direct_nodes: [
      "即时通讯服务",
      "移动支付系统",
      "小程序平台",
      "公众号内容生态",
      "企业微信办公",
      "朋友圈社交网络",
    ],
    secondary_nodes: [
      "电商运营体系",
      "私域流量商业",
      "广告投放渠道",
      "客户关系管理",
      "社区团购网络",
      "政务服务入口",
      "健康码系统",
      "社交游戏平台",
    ],
    long_term_nodes: [
      "数字身份认证体系",
      "超级应用竞争格局",
      "去中心化社交协议",
      "跨平台支付互联互通",
      "新型数字公共服务平台",
    ],
  },
  direct_effects: [
    "即时通讯与日常社交出现真空期",
    "移动支付场景被迫向其他平台迁移",
    "小程序生态全部停摆，数百万商家失去线上入口",
    "企业微信用户被迫寻找替代协同工具",
    "朋友圈信息流完全消失，内容创作者失去核心渠道",
  ],
  second_order_effects: [
    "支付宝、抖音等平台用户量和交易量短期激增",
    "私域商业模型被迫重构，商家转向多渠道布局",
    "内容创作者加速向其他平台迁移和适应",
    "政务服务临时回归网页端和线下渠道",
    "社交关系链重建加速",
    "即时通讯市场竞争格局永久改变",
  ],
  unexpected_effects: [
    "部分老年人因微信依赖度过高而短暂出现数字社交隔离",
    "线下社区活动和面对面社交出现短期回暖",
    "企业开始重新评估单一平台依赖风险，推动工具多样化",
    "部分基于微信的灰产和诈骗模式自然消亡",
  ],
  timeline: [
    {
      time: "T + 1 天",
      headline: "即时通信和支付系统出现混乱",
      description:
        "微信突然停止运行，数亿用户无法使用即时通讯和微信支付。大量日常交易中断，社交媒体上出现广泛讨论和焦虑情绪。",
      impact_level: "critical",
    },
    {
      time: "T + 7 天",
      headline: "替代应用迅速吸收用户",
      description:
        "用户大规模涌入 QQ、支付宝、抖音等替代平台。各平台紧急扩容服务器，发布迁移工具帮助用户导入社交关系。",
      impact_level: "high",
    },
    {
      time: "T + 1 月",
      headline: "商业生态开始重构",
      description:
        "商家和内容创作者完成初步迁移，私域运营体系重新建立在多平台上。企业重新评估即时通讯和协作工具策略。",
      impact_level: "high",
    },
    {
      time: "T + 3 月",
      headline: "新数字生态雏形出现",
      description:
        "跨平台互联互通需求推动行业标准建立。多个超级应用并存的新格局逐步稳定，用户形成新的使用习惯。",
      impact_level: "medium",
    },
    {
      time: "T + 1 年",
      headline: "中国数字生活完成重构",
      description:
        "多平台并存成为新常态，不再存在单一超级应用垄断。数字生活方式更加多元化，行业竞争格局发生根本变化。",
      impact_level: "medium",
    },
  ],
  worldlines: [
    {
      name: "Worldline A — 快速适应",
      likelihood: "More Likely",
      summary:
        "市场机制快速填补微信留下的空白，现有平台在 1-3 个月内完成用户和商业生态的承接，中国数字生态变得更加多元化和有弹性。",
      turning_point: "支付宝和抖音在首周内推出完整社交功能",
      winners: ["字节跳动（抖音社交）", "阿里巴巴（支付宝社交）", "电信运营商（5G 消息）"],
      losers: ["腾讯控股", "依赖微信的中小商家", "微信生态开发者"],
      trigger_conditions: [
        "替代平台拥有足够的基础设施储备",
        "用户对替代平台已有一定熟悉度",
        "监管允许快速的市场响应",
      ],
    },
    {
      name: "Worldline B — 缓慢重建",
      likelihood: "Plausible",
      summary:
        "没有单一平台能够完全替代微信的复合功能，数字生活碎片化。用户需要在多个应用之间切换完成原本一体化的工作流，效率和体验下降。",
      turning_point: "用户在多个平台间反复迁移，未能形成稳定习惯",
      winners: ["工具型垂直应用", "线下服务商", "传统通信方式"],
      losers: ["超级应用模式", "一站式服务平台", "依赖微信支付的小商户"],
      trigger_conditions: [
        "各平台互不联通形成信息孤岛",
        "用户对多平台管理感到疲劳",
        "监管对数据互通持谨慎态度",
      ],
    },
    {
      name: "Worldline C — 系统不稳定",
      likelihood: "Edge Case",
      summary:
        "微信突然消失引发数字服务信任危机，用户和企业开始重新评估对单一平台的依赖。出现一波去平台化运动，分布式和自托管方案受到关注。",
      turning_point: "大型企业开始自建内部通信和支付系统",
      winners: ["开源通信协议", "自托管解决方案提供商", "区块链身份项目"],
      losers: ["所有中心化超级应用", "依赖平台流量的商业模式", "广告驱动的免费服务"],
      trigger_conditions: [
        "发生数据丢失或隐私泄露事件",
        "用户对平台信任度持续下降",
        "监管推动数据可移植性标准",
      ],
    },
  ],
  constraint_conflicts: [],
  biggest_winners: ["字节跳动", "阿里巴巴", "电信运营商", "工具型垂直应用", "线下商业"],
  biggest_losers: ["腾讯控股", "微信生态开发者", "私域运营公司", "社区团购平台", "单一渠道商家"],
  first_breaking_point: "微信支付和即时通讯功能的同时失效",
  hardest_to_replace: "基于微信的社交关系链和信任网络",
  new_thing_created: "跨平台互联互通的统一数字身份和消息协议",
  final_insight:
    "微信消失不会让数字生活回到过去，只会迫使互联网寻找新的入口，而这一次入口可能不再只有一个。",
  disclaimer: "本结果为 AI 辅助的结构化思维实验，不代表真实预测。",
};