"use client";

import { Clock } from "lucide-react";
import type { TimelineItem } from "@/types/experiment";

interface Props { items: TimelineItem[]; }

const CC: Record<string, string> = { critical: "border-lab-error text-lab-error bg-lab-error/5", high: "border-lab-warn text-lab-warn bg-lab-warn/5", medium: "border-lab-accent/50 text-lab-accent bg-lab-accent/5", low: "border-lab-text-dim/30 text-lab-text-dim bg-lab-surface" };
const CL: Record<string, string> = { critical: "💀 大崩", high: "🔥 严重", medium: "⚡ 中等", low: "🫧 轻微" };

export default function Timeline({ items }: Props) {
  if (!items || items.length === 0) return null;
  return (
    <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
      <div className="flex items-center gap-2 mb-4"><Clock className="w-4 h-4 text-lab-accent"/><h3 className="text-sm font-mono text-lab-text-dim uppercase tracking-wider">⏱️ 事情会怎么一步步崩</h3></div>
      <div className="relative pl-8">
        <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-lab-border"/>
        <div className="space-y-6">
          {items.map((item, i) => (
            <div key={i} className="relative">
              <div className={`absolute -left-[29px] top-2 w-3 h-3 rounded-full border-2 ${CC[item.impact_level]?.split(" ")[0] || "border-lab-border"}`}><div className={`absolute inset-0.5 rounded-full ${CC[item.impact_level]?.split(" ")[1] || "bg-lab-border"}`}/></div>
              <div className={`p-4 rounded-lg border ${CC[item.impact_level] || "border-lab-border bg-lab-surface"}`}>
                <div className="flex items-center justify-between mb-2"><span className="text-sm font-bold font-mono text-lab-text-bright">{item.time}</span><span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${CC[item.impact_level]}`}>{CL[item.impact_level] || item.impact_level}</span></div>
                <h4 className="text-base font-semibold text-lab-text mb-1.5">{item.headline}</h4>
                <p className="text-sm text-lab-text-dim leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}