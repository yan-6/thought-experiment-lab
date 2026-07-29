"use client";

import { useState } from "react";
import { X, Play, ArrowLeft, Settings2, Globe, Clock, Zap, Info } from "lucide-react";
import type { ExperimentConfig } from "@/types/experiment";

interface Props { config: ExperimentConfig; hypothesis: string; onRun: (c: ExperimentConfig) => void; onBack: () => void; }

const DUR = ["一周","一个月","一年","五年","十年"];
const DUR_HINT: Record<string, string> = {
  "一周": "冲击刚发生，系统还在慌乱",
  "一个月": "短期混乱，替代方案开始出现",
  "一年": "新秩序初步建立，旧伤还在愈合",
  "五年": "结构性变化已经固化",
  "十年": "一代人都快忘了原来长啥样",
};
const SCP = ["个人","城市","国家","全球"] as const;
const SCP_HINT: Record<string, string> = {
  "个人": "只影响一个人的生活",
  "城市": "影响一座城市的运转",
  "国家": "影响整个国家的各个层面",
  "全球": "波及全世界，谁也跑不掉",
};
const SPD = ["慢","中等","快"] as const;

export default function ExperimentConfigPanel({ config: initial, hypothesis, onRun, onBack }: Props) {
  const [cfg, setCfg] = useState<ExperimentConfig>(initial);
  const [newAssumption, setNewAssumption] = useState("");
  const [newDomain, setNewDomain] = useState("");
  const upd = <K extends keyof ExperimentConfig>(k: K, v: ExperimentConfig[K]) => setCfg(p => ({...p,[k]:v}));
  const rmAssumption = (i: number) => setCfg(p => ({...p,assumptions:p.assumptions.filter((_,j)=>j!==i)}));
  const rmDomain = (i: number) => setCfg(p => ({...p,affected_domains:p.affected_domains.filter((_,j)=>j!==i)}));
  const addAssumption = () => {
    const v = newAssumption.trim();
    if (v && !cfg.assumptions.includes(v)) { setCfg(p => ({...p,assumptions:[...p.assumptions,v]})); setNewAssumption(""); }
  };
  const addDomain = () => {
    const v = newDomain.trim();
    if (v && !cfg.affected_domains.includes(v)) { setCfg(p => ({...p,affected_domains:[...p.affected_domains,v]})); setNewDomain(""); }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-fade-in px-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-lab-border">
        <div><p className="text-xs font-mono text-lab-text-dim tracking-wider uppercase mb-1">Experiment Configuration</p><h2 className="text-xl font-semibold text-lab-text-bright">{cfg.title}</h2></div>
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex items-center gap-1.5 px-4 py-2 text-sm text-lab-text-dim hover:text-lab-text border border-lab-border rounded-lg"><ArrowLeft className="w-4 h-4"/><span className="font-mono text-xs tracking-wider">Back</span></button>
          <button onClick={()=>onRun(cfg)} className="flex items-center gap-2 px-6 py-2.5 bg-lab-accent text-lab-bg font-semibold text-sm rounded-lg hover:bg-lab-accent-dim hover:shadow-[0_0_25px_rgba(0,229,160,0.3)] transition-all duration-300"><Play className="w-4 h-4"/><span className="font-mono tracking-wider text-xs uppercase">Run This World</span></button>
        </div>
      </div>

      {/* Hypothesis display */}
      <div className="bg-lab-surface/50 border border-lab-border/50 rounded-lg p-4">
        <div className="flex items-center gap-1.5 mb-1"><Info className="w-3 h-3 text-lab-text-dim"/><p className="text-xs font-mono text-lab-text-dim uppercase tracking-wider">Hypothesis · 你的原始假设</p></div>
        <p className="text-sm text-lab-text leading-relaxed">{hypothesis}</p>
      </div>

      {/* ───── 核心配置 ───── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Fld l="实验对象" hint="这个实验的主角是谁？" i={<Settings2 className="w-3.5 h-3.5"/>}>
          <input type="text" value={cfg.subject} onChange={e=>upd("subject",e.target.value)} className="config-input"/>
        </Fld>
        <Fld l="发生了什么变化" hint="一句话说清楚：什么变了？" i={<Zap className="w-3.5 h-3.5"/>}>
          <input type="text" value={cfg.change} onChange={e=>upd("change",e.target.value)} className="config-input"/>
        </Fld>
        <Fld l="时间跨度" hint={DUR_HINT[cfg.duration] || "选择实验的时间范围"} i={<Clock className="w-3.5 h-3.5"/>}>
          <select value={cfg.duration} onChange={e=>upd("duration",e.target.value)} className="config-input">
            {DUR.map(o=><option key={o} value={o}>{o}</option>)}
          </select>
        </Fld>
        <Fld l="影响范围" hint={SCP_HINT[cfg.scope] || "这个变化影响多大？"} i={<Globe className="w-3.5 h-3.5"/>}>
          <select value={cfg.scope} onChange={e=>upd("scope",e.target.value as typeof cfg.scope)} className="config-input">
            {SCP.map(o=><option key={o} value={o}>{o}</option>)}
          </select>
        </Fld>
        <Fld l="适应速度" hint="人们/系统多快能适应这个变化？" i={<Clock className="w-3.5 h-3.5"/>}>
          <select value={cfg.adaptation_speed} onChange={e=>upd("adaptation_speed",e.target.value as typeof cfg.adaptation_speed)} className="config-input">
            {SPD.map(o=><option key={o} value={o}>{o}</option>)}
          </select>
        </Fld>
      </div>

      {/* ───── 可自定义的开放字段 ───── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Fld l="替代方案程度" hint="可以出现替代品吗？随便写" i={<Settings2 className="w-3.5 h-3.5"/>}>
          <input type="text" value={cfg.replacement_level} onChange={e=>upd("replacement_level",e.target.value)} placeholder="例如：允许、禁止、部分允许……" className="config-input"/>
        </Fld>
        <Fld l="外部干预程度" hint="政府/外力会介入吗？随便写" i={<Zap className="w-3.5 h-3.5"/>}>
          <input type="text" value={cfg.intervention_level} onChange={e=>upd("intervention_level",e.target.value)} placeholder="例如：无、轻度、强力干预……" className="config-input"/>
        </Fld>
      </div>

      {/* ───── Affected Domains (新增按钮) ───── */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5"><Info className="w-3 h-3 text-lab-text-dim"/><p className="text-xs font-mono text-lab-text-dim uppercase tracking-wider">影响领域 · 哪些方面会被波及？</p></div>
        <div className="flex flex-wrap gap-2 mb-2">
          {cfg.affected_domains.map((d,i)=><span key={i} className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-lab-accent/10 border border-lab-accent/20 text-lab-accent font-mono">{d}<button onClick={()=>rmDomain(i)} className="hover:text-lab-error transition-colors"><X className="w-2.5 h-2.5"/></button></span>)}
        </div>
        <div className="flex gap-2">
          <input type="text" value={newDomain} onChange={e=>setNewDomain(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();addDomain();}}} placeholder="添加领域，如：交通、教育……" className="config-input text-sm flex-1"/>
          <button onClick={addDomain} className="px-3 py-2 text-xs font-mono bg-lab-accent/10 border border-lab-accent/20 text-lab-accent rounded-lg hover:bg-lab-accent/20 transition-colors">+ 添加</button>
        </div>
      </div>

      {/* ───── Assumptions (新增按钮) ───── */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5"><Info className="w-3 h-3 text-lab-text-dim"/><p className="text-xs font-mono text-lab-text-dim uppercase tracking-wider">默认前提 · 实验的基础条件假设</p></div>
        <div className="flex flex-wrap gap-2 mb-2">
          {cfg.assumptions.map((a,i)=><span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-lab-surface border border-lab-border rounded-full text-lab-text group">{a}<button onClick={()=>rmAssumption(i)} className="text-lab-text-dim hover:text-lab-error transition-colors"><X className="w-3 h-3"/></button></span>)}
          {cfg.assumptions.length===0&&<span className="text-xs text-lab-text-dim/60 italic">暂无前提，试试添加一个？</span>}
        </div>
        <div className="flex gap-2">
          <input type="text" value={newAssumption} onChange={e=>setNewAssumption(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();addAssumption();}}} placeholder="添加前提，如：互联网正常运行……" className="config-input text-sm flex-1"/>
          <button onClick={addAssumption} className="px-3 py-2 text-xs font-mono bg-lab-surface border border-lab-border text-lab-text-dim rounded-lg hover:border-lab-accent/30 hover:text-lab-text transition-colors">+ 添加</button>
        </div>
      </div>
    </div>
  );
}

function Fld({l, hint, i, children}:{l:string;hint:string;i:React.ReactNode;children:React.ReactNode}) {
  return <div className="space-y-1.5"><label className="flex items-center gap-1.5 text-xs font-mono text-lab-text-dim uppercase tracking-wider">{i}{l}</label><p className="text-[10px] text-lab-text-dim/50 -mt-1 mb-1">{hint}</p>{children}</div>;
}