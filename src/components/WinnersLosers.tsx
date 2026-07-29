"use client";

import { Trophy, AlertTriangle, Lock, Sparkles } from "lucide-react";

interface Props { winners: string[]; losers: string[]; firstBreakingPoint: string; hardestToReplace: string; newThingCreated: string; }

export default function WinnersLosers({ winners, losers, firstBreakingPoint, hardestToReplace, newThingCreated }: Props) {
  return (
    <div className="animate-slide-up space-y-6" style={{ animationDelay: "0.5s" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-lab-accent/20 bg-lab-accent/5 p-5">
          <div className="flex items-center gap-2 mb-3"><Trophy className="w-4 h-4 text-lab-accent"/><h3 className="text-sm font-mono text-lab-accent uppercase tracking-wider">Biggest Winners</h3></div>
          <div className="flex flex-wrap gap-2">{winners.slice(0,5).map((w,i)=><span key={i} className="px-3 py-1.5 text-xs rounded-full bg-lab-accent/10 border border-lab-accent/20 text-lab-accent/90 font-medium">{w}</span>)}{winners.length===0&&<span className="text-xs text-lab-text-dim italic">Not identified</span>}</div>
        </div>
        <div className="rounded-xl border border-lab-error/20 bg-lab-error/5 p-5">
          <div className="flex items-center gap-2 mb-3"><AlertTriangle className="w-4 h-4 text-lab-error"/><h3 className="text-sm font-mono text-lab-error uppercase tracking-wider">Biggest Losers</h3></div>
          <div className="flex flex-wrap gap-2">{losers.slice(0,5).map((l,i)=><span key={i} className="px-3 py-1.5 text-xs rounded-full bg-lab-error/10 border border-lab-error/20 text-lab-error/80 font-medium">{l}</span>)}{losers.length===0&&<span className="text-xs text-lab-text-dim italic">Not identified</span>}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FC icon={<AlertTriangle className="w-4 h-4"/>} label="First Breaking Point" value={firstBreakingPoint}/>
        <FC icon={<Lock className="w-4 h-4"/>} label="Hardest to Replace" value={hardestToReplace}/>
        <FC icon={<Sparkles className="w-4 h-4"/>} label="Most Likely New Creation" value={newThingCreated}/>
      </div>
    </div>
  );
}
function FC({icon,label,value}:{icon:React.ReactNode;label:string;value:string}) {
  return <div className="rounded-lg bg-lab-surface/50 border border-lab-border/50 p-4"><div className="flex items-center gap-1.5 mb-2">{icon}<span className="text-[10px] font-mono uppercase tracking-wider text-lab-text-dim">{label}</span></div><p className="text-sm text-lab-text leading-relaxed">{value||"Not identified"}</p></div>;
}