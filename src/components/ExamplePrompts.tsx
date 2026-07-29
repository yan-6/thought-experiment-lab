"use client";

import { Lightbulb, ChevronRight } from "lucide-react";

const EXAMPLES = [
  "如果微信消失一年，中国人的数字生活会发生什么？",
  "如果人类不再需要睡眠，会发生什么？",
  "如果所有商品价格完全透明，市场会如何变化？",
  "如果一家公司取消所有会议，会发生什么？",
];

interface ExamplePromptsProps { onSelect: (p: string) => void; disabled: boolean; }

export default function ExamplePrompts({ onSelect, disabled }: ExamplePromptsProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-10 animate-slide-up" style={{ animationDelay: "0.4s" }}>
      <div className="flex items-center gap-2 mb-3 text-lab-text-dim">
        <Lightbulb className="w-3.5 h-3.5 text-lab-warn" />
        <span className="text-xs font-mono tracking-wider uppercase">Example Experiments</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {EXAMPLES.map((ex, i) => (
          <button key={i} onClick={() => onSelect(ex)} disabled={disabled}
            className="text-left group flex items-start gap-2 px-4 py-3 rounded-lg
                       bg-lab-surface/50 border border-lab-border/50
                       hover:border-lab-accent/20 hover:bg-lab-surface
                       transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed">
            <ChevronRight className="w-4 h-4 mt-0.5 text-lab-accent/0 group-hover:text-lab-accent/60 transition-all duration-300 shrink-0" />
            <span className="text-sm text-lab-text-dim group-hover:text-lab-text transition-colors duration-300 leading-relaxed">{ex}</span>
          </button>
        ))}
      </div>
    </div>
  );
}