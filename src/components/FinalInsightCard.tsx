"use client";

import { Quote } from "lucide-react";

interface Props { insight: string; }

export default function FinalInsightCard({ insight }: Props) {
  return (
    <div className="w-full animate-slide-up" style={{ animationDelay: "0.1s" }}>
      <div className="relative rounded-xl border border-lab-accent/20 bg-lab-accent/5 overflow-hidden p-6 sm:p-8">
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-lab-accent/30 rounded-tl-xl"/>
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-lab-accent/30 rounded-br-xl"/>
        <div className="flex items-start gap-4">
          <Quote className="w-6 h-6 text-lab-accent/60 shrink-0 mt-1"/>
          <div><p className="text-xs font-mono text-lab-text-dim uppercase tracking-wider mb-3">💡 说人话就是</p><p className="text-lg sm:text-xl leading-relaxed text-lab-text-bright font-light">{insight}</p></div>
        </div>
      </div>
    </div>
  );
}