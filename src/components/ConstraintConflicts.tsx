"use client";

import { AlertTriangle, CheckCircle2 } from "lucide-react";
import type { ConstraintConflict } from "@/types/experiment";

interface Props { conflicts: ConstraintConflict[]; }

export default function ConstraintConflicts({ conflicts }: Props) {
  if (!conflicts || conflicts.length === 0) {
    return (
      <div className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
        <div className="flex items-center gap-2 mb-4"><AlertTriangle className="w-4 h-4 text-lab-text-dim"/><h3 className="text-sm font-mono text-lab-text-dim uppercase tracking-wider">Constraint Conflicts</h3></div>
        <div className="rounded-lg border border-lab-border bg-lab-surface/30 p-4 flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-lab-accent/60"/><p className="text-sm text-lab-text-dim font-mono tracking-wider">NO CRITICAL CONSTRAINT CONFLICTS DETECTED</p></div>
      </div>
    );
  }
  return (
    <div className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
      <div className="flex items-center gap-2 mb-4"><AlertTriangle className="w-4 h-4 text-lab-warn"/><h3 className="text-sm font-mono text-lab-text-dim uppercase tracking-wider">Constraint Conflicts</h3></div>
      <div className="space-y-3">
        {conflicts.map((c,i)=><div key={i} className="rounded-lg border border-lab-warn/20 bg-lab-warn/5 p-4"><p className="text-sm font-semibold text-lab-warn mb-2">{c.conflict}</p><div className="space-y-2"><div><span className="text-[10px] font-mono text-lab-text-dim uppercase">Why:</span><p className="text-xs text-lab-text-dim mt-0.5">{c.reason}</p></div><div><span className="text-[10px] font-mono text-lab-accent uppercase">Suggested Fix:</span><p className="text-xs text-lab-accent/80 mt-0.5">{c.suggested_fix}</p></div></div></div>)}
      </div>
    </div>
  );
}