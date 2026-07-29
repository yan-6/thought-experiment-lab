"use client";

import { Lightbulb } from "lucide-react";

interface Props { outcomes: string[]; }

export default function UnexpectedOutcomes({ outcomes }: Props) {
  if (!outcomes || outcomes.length === 0) return null;
  return (
    <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
      <div className="flex items-center gap-2 mb-4"><Lightbulb className="w-4 h-4 text-lab-warn"/><h3 className="text-sm font-mono text-lab-text-dim uppercase tracking-wider">🤯 没人料到会这样</h3></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {outcomes.slice(0,4).map((o,i)=><div key={i} className="p-4 rounded-lg bg-lab-surface border border-lab-border hover:border-lab-warn/20 transition-colors duration-300"><div className="flex items-start gap-3"><span className="text-lab-warn font-mono text-sm mt-0.5">0{i+1}</span><p className="text-sm text-lab-text leading-relaxed">{o}</p></div></div>)}
      </div>
    </div>
  );
}