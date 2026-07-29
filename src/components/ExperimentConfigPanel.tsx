"use client";

import { useState } from "react";
import { X, Play, ArrowLeft, Settings2, Globe, Clock, Zap } from "lucide-react";
import type { ExperimentConfig } from "@/types/experiment";

interface Props { config: ExperimentConfig; hypothesis: string; onRun: (c: ExperimentConfig) => void; onBack: () => void; }

const DUR = ["一周","一个月","一年","五年","十年"];
const SCP = ["个人","城市","国家","全球"] as const;
const SPD = ["慢","中等","快"] as const;
const RPL = ["不允许","有限允许","完全允许"] as const;
const INT = ["无","有限","强"] as const;

export default function ExperimentConfigPanel({ config: initial, hypothesis, onRun, onBack }: Props) {
  const [cfg, setCfg] = useState<ExperimentConfig>(initial);
  const upd = <K extends keyof ExperimentConfig>(k: K, v: ExperimentConfig[K]) => setCfg(p => ({...p,[k]:v}));
  const rm = (i: number) => setCfg(p => ({...p,assumptions:p.assumptions.filter((_,j)=>j!==i)}));

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-fade-in px-4">
      <div className="flex items-center justify-between pb-4 border-b border-lab-border">
        <div><p className="text-xs font-mono text-lab-text-dim tracking-wider uppercase mb-1">Experiment Configuration</p><h2 className="text-xl font-semibold text-lab-text-bright">{cfg.title}</h2></div>
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex items-center gap-1.5 px-4 py-2 text-sm text-lab-text-dim hover:text-lab-text border border-lab-border rounded-lg"><ArrowLeft className="w-4 h-4"/><span className="font-mono text-xs tracking-wider">Back</span></button>
          <button onClick={()=>onRun(cfg)} className="flex items-center gap-2 px-6 py-2.5 bg-lab-accent text-lab-bg font-semibold text-sm rounded-lg hover:bg-lab-accent-dim hover:shadow-[0_0_25px_rgba(0,229,160,0.3)] transition-all duration-300"><Play className="w-4 h-4"/><span className="font-mono tracking-wider text-xs uppercase">Run This World</span></button>
        </div>
      </div>
      <div className="bg-lab-surface/50 border border-lab-border/50 rounded-lg p-4"><p className="text-xs font-mono text-lab-text-dim uppercase tracking-wider mb-1">Hypothesis</p><p className="text-sm text-lab-text leading-relaxed">{hypothesis}</p></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Fld l="Experiment Subject" i={<Settings2 className="w-3.5 h-3.5"/>}><input type="text" value={cfg.subject} onChange={e=>upd("subject",e.target.value)} className="config-input"/></Fld>
        <Fld l="Change Condition" i={<Zap className="w-3.5 h-3.5"/>}><input type="text" value={cfg.change} onChange={e=>upd("change",e.target.value)} className="config-input"/></Fld>
        <Fld l="Duration" i={<Clock className="w-3.5 h-3.5"/>}><select value={cfg.duration} onChange={e=>upd("duration",e.target.value)} className="config-input">{DUR.map(o=><option key={o} value={o}>{o}</option>)}</select></Fld>
        <Fld l="Scope" i={<Globe className="w-3.5 h-3.5"/>}><select value={cfg.scope} onChange={e=>upd("scope",e.target.value as typeof cfg.scope)} className="config-input">{SCP.map(o=><option key={o} value={o}>{o}</option>)}</select></Fld>
        <Fld l="Region" i={<Globe className="w-3.5 h-3.5"/>}><input type="text" value={cfg.region} onChange={e=>upd("region",e.target.value)} className="config-input"/></Fld>
        <Fld l="Adaptation Speed" i={<Clock className="w-3.5 h-3.5"/>}><select value={cfg.adaptation_speed} onChange={e=>upd("adaptation_speed",e.target.value as typeof cfg.adaptation_speed)} className="config-input">{SPD.map(o=><option key={o} value={o}>{o}</option>)}</select></Fld>
        <Fld l="Replacement Level" i={<Settings2 className="w-3.5 h-3.5"/>}><select value={cfg.replacement_level} onChange={e=>upd("replacement_level",e.target.value as typeof cfg.replacement_level)} className="config-input">{RPL.map(o=><option key={o} value={o}>{o}</option>)}</select></Fld>
        <Fld l="External Intervention" i={<Zap className="w-3.5 h-3.5"/>}><select value={cfg.intervention_level} onChange={e=>upd("intervention_level",e.target.value as typeof cfg.intervention_level)} className="config-input">{INT.map(o=><option key={o} value={o}>{o}</option>)}</select></Fld>
      </div>
      <div className="space-y-2"><p className="text-xs font-mono text-lab-text-dim uppercase tracking-wider">Affected Domains</p><div className="flex flex-wrap gap-2">{cfg.affected_domains.map((d,i)=><span key={i} className="px-3 py-1 text-xs rounded-full bg-lab-accent/10 border border-lab-accent/20 text-lab-accent font-mono">{d}</span>)}</div></div>
      <div className="space-y-3"><p className="text-xs font-mono text-lab-text-dim uppercase tracking-wider">Default Assumptions</p><div className="flex flex-wrap gap-2">{cfg.assumptions.map((a,i)=><span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-lab-surface border border-lab-border rounded-full text-lab-text group">{a}<button onClick={()=>rm(i)} className="text-lab-text-dim hover:text-lab-error transition-colors"><X className="w-3 h-3"/></button></span>)}{cfg.assumptions.length===0&&<span className="text-xs text-lab-text-dim/60 italic">No assumptions defined</span>}</div></div>
    </div>
  );
}

function Fld({l,i,children}:{l:string;i:React.ReactNode;children:React.ReactNode}) {
  return <div className="space-y-1.5"><label className="flex items-center gap-1.5 text-xs font-mono text-lab-text-dim uppercase tracking-wider">{i}{l}</label>{children}</div>;
}