"use client";

import { CheckCircle2, Hash, Clock, MapPin } from "lucide-react";

interface Props { experimentId: string; title: string; subject: string; duration: string; region: string; durationMs: number; }

export default function ExperimentHeader({ experimentId, title, subject, duration, region, durationMs }: Props) {
  return (
    <div className="w-full border-b border-lab-border pb-6 animate-slide-up">
      <div className="flex items-center gap-3 mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-lab-accent/10 border border-lab-accent/20"><Hash className="w-3.5 h-3.5 text-lab-accent"/><span className="text-sm font-mono text-lab-accent tracking-wider">{experimentId}</span></div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-lab-accent/5 border border-lab-accent/10"><CheckCircle2 className="w-3.5 h-3.5 text-lab-accent"/><span className="text-xs font-mono text-lab-accent tracking-wider uppercase">Completed</span></div>
      </div>
      <h1 className="text-2xl sm:text-3xl font-light text-lab-text-bright mb-4">{title}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Badge icon={<Hash className="w-3 h-3"/>} label="Subject" value={subject}/>
        <Badge icon={<Clock className="w-3 h-3"/>} label="Duration" value={duration}/>
        <Badge icon={<MapPin className="w-3 h-3"/>} label="Region" value={region}/>
        <Badge icon={<Clock className="w-3 h-3"/>} label="Run Time" value={`${(durationMs/1000).toFixed(1)}s`}/>
      </div>
    </div>
  );
}
function Badge({icon,label,value}:{icon:React.ReactNode;label:string;value:string}) {
  return <div className="flex flex-col gap-1 p-3 rounded-lg bg-lab-surface/50 border border-lab-border/50"><span className="flex items-center gap-1 text-[10px] font-mono text-lab-text-dim uppercase tracking-wider">{icon}{label}</span><span className="text-sm text-lab-text-bright font-medium truncate">{value}</span></div>;
}