"use client";

import { Lightbulb, ChevronRight } from "lucide-react";

const EXAMPLES = [
  { text: "😱 微信突然消失一年？", sub: "全国人民怎么活" },
  { text: "😴 人类不用睡觉了？", sub: "996 变 24/7" },
  { text: "🪞 所有商品价格完全透明？", sub: "中间商集体转行" },
  { text: "📵 公司取消所有会议？", sub: "爽死还是乱成一锅粥" },
  { text: "🐱 猫统治了世界？", sub: "人类沦为全职铲屎官" },
  { text: "💸 每人每月白拿一万块？", sub: "乌托邦还是大通胀" },
];

interface ExamplePromptsProps { onSelect: (p: string) => void; disabled: boolean; }

export default function ExamplePrompts({ onSelect, disabled }: ExamplePromptsProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-10 animate-slide-up" style={{ animationDelay: "0.4s" }}>
      <div className="flex items-center gap-2 mb-3 text-lab-text-dim">
        <Lightbulb className="w-3.5 h-3.5 text-lab-warn" />
        <span className="text-xs font-mono tracking-wider uppercase">👇 没灵感？点一个试试</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {EXAMPLES.map((ex, i) => (
          <button key={i} onClick={() => onSelect(ex.text)} disabled={disabled}
            className="card-lift scale-press text-left group flex items-start gap-2 px-4 py-3 rounded-lg
                       bg-lab-surface/50 border border-lab-border/50
                       transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed">
            <ChevronRight className="w-4 h-4 mt-0.5 text-lab-accent/0 group-hover:text-lab-accent/60 group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />
            <div>
              <span className="text-sm text-lab-text group-hover:text-lab-text-bright transition-colors duration-300 leading-relaxed block">
                {ex.text}
              </span>
              <span className="text-[10px] text-lab-text-dim/50 group-hover:text-lab-text-dim/80 transition-colors">{ex.sub}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}