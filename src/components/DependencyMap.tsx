"use client";

import { GitBranch, ArrowDown } from "lucide-react";
import type { DependencyGraph } from "@/types/experiment";

interface Props { graph: DependencyGraph; }

export default function DependencyMap({ graph }: Props) {
  return (
    <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
      <div className="flex items-center gap-2 mb-4"><GitBranch className="w-4 h-4 text-lab-accent"/><h3 className="text-sm font-mono text-lab-text-dim uppercase tracking-wider">🧬 谁离不开谁</h3></div>
      <div className="space-y-6">
        <div className="flex flex-col items-center"><div className="px-4 py-3 rounded-lg bg-lab-accent/10 border-2 border-lab-accent/30 text-center"><p className="text-[10px] font-mono text-lab-text-dim uppercase tracking-wider mb-0.5">🎯 核心</p><p className="text-sm font-semibold text-lab-accent">{graph.core}</p></div></div>
        <div className="flex justify-center"><ArrowDown className="w-5 h-5 text-lab-border"/></div>
        <div><p className="text-[10px] font-mono text-lab-text-dim uppercase tracking-wider text-center mb-3">⚡ 先崩为敬</p><div className="flex flex-wrap justify-center gap-2">{graph.direct_nodes.slice(0,6).map((n,i)=><span key={i} className="px-3 py-1.5 text-xs rounded-lg bg-lab-surface border border-lab-border text-lab-text font-mono">{n}</span>)}</div></div>
        <div className="flex justify-center"><ArrowDown className="w-5 h-5 text-lab-border"/></div>
        <div><p className="text-[10px] font-mono text-lab-text-dim uppercase tracking-wider text-center mb-3">🦋 跟着倒霉的</p><div className="flex flex-wrap justify-center gap-2">{graph.secondary_nodes.slice(0,8).map((n,i)=><span key={i} className="px-3 py-1.5 text-xs rounded-lg bg-lab-surface/50 border border-lab-border/50 text-lab-text-dim font-mono">{n}</span>)}</div></div>
        <div className="flex justify-center"><ArrowDown className="w-5 h-5 text-lab-border"/></div>
        <div><p className="text-[10px] font-mono text-lab-text-dim uppercase tracking-wider text-center mb-3">🏗️ 改天换地</p><div className="flex flex-wrap justify-center gap-2">{graph.long_term_nodes.slice(0,5).map((n,i)=><span key={i} className="px-3 py-1.5 text-xs rounded-lg bg-lab-accent/5 border border-lab-accent/10 text-lab-accent/70 font-mono">{n}</span>)}</div></div>
      </div>
    </div>
  );
}