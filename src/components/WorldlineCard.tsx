"use client";

import { Globe, TrendingUp, TrendingDown } from "lucide-react";
import type { Worldline } from "@/types/experiment";

interface Props { worldline: Worldline; index: number; }

const LS: Record<string, {bar:string;bg:string;text:string}> = {
  "More Likely": {bar:"bg-lab-accent",bg:"bg-lab-accent/5 border-lab-accent/20",text:"text-lab-accent"},
  "Plausible": {bar:"bg-lab-warn",bg:"bg-lab-warn/5 border-lab-warn/20",text:"text-lab-warn"},
  "Edge Case": {bar:"bg-lab-text-dim",bg:"bg-lab-surface border-lab-border",text:"text-lab-text-dim"},
};
const WL = ["Worldline A","Worldline B","Worldline C"];

export default function WorldlineCard({ worldline, index }: Props) {
  const s = LS[worldline.likelihood] || LS["Plausible"];
  return (
    <div className={`rounded-xl border ${s.bg} p-5 flex flex-col h-full`}>
      <div className="flex items-center justify-between mb-4"><div className="flex items-center gap-2"><Globe className={`w-4 h-4 ${s.text}`}/><h4 className="text-sm font-bold font-mono text-lab-text-bright">{WL[index]||worldline.name}</h4></div><span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${s.bg} ${s.text}`}>{worldline.likelihood}</span></div>
      <div className="w-full h-1 bg-lab-border rounded-full mb-4 overflow-hidden"><div className={`h-full rounded-full ${s.bar} ${worldline.likelihood==="More Likely"?"w-3/4":worldline.likelihood==="Plausible"?"w-1/2":"w-1/4"}`}/></div>
      <p className="text-sm text-lab-text leading-relaxed mb-4 flex-1">{worldline.summary}</p>
      <div className="mb-4 p-3 rounded-lg bg-lab-bg/50 border border-lab-border/30"><p className="text-[10px] font-mono text-lab-text-dim uppercase tracking-wider mb-1">Turning Point</p><p className="text-xs text-lab-text leading-relaxed">{worldline.turning_point}</p></div>
      <div className="mb-3"><p className="flex items-center gap-1.5 text-[10px] font-mono text-lab-accent uppercase tracking-wider mb-2"><TrendingUp className="w-3 h-3"/>Winners</p><div className="flex flex-wrap gap-1.5">{worldline.winners.map((w,i)=><span key={i} className="px-2 py-0.5 text-[10px] rounded-full bg-lab-accent/10 border border-lab-accent/20 text-lab-accent">{w}</span>)}</div></div>
      <div className="mb-3"><p className="flex items-center gap-1.5 text-[10px] font-mono text-lab-error uppercase tracking-wider mb-2"><TrendingDown className="w-3 h-3"/>Losers</p><div className="flex flex-wrap gap-1.5">{worldline.losers.map((l,i)=><span key={i} className="px-2 py-0.5 text-[10px] rounded-full bg-lab-error/10 border border-lab-error/20 text-lab-error/80">{l}</span>)}</div></div>
      <div className="pt-3 border-t border-lab-border/50"><p className="text-[10px] font-mono text-lab-text-dim uppercase tracking-wider mb-2">Trigger Conditions</p><ul className="space-y-1">{worldline.trigger_conditions.map((t,i)=><li key={i} className="text-xs text-lab-text-dim flex items-start gap-1.5"><span className="text-lab-accent/60 mt-0.5">•</span>{t}</li>)}</ul></div>
    </div>
  );
}