"use client";

import { useState } from "react";
import { X, Play, ArrowLeft, Settings2, Globe, Clock, Zap, Info } from "lucide-react";
import type { ExperimentConfig } from "@/types/experiment";

interface Props { config: ExperimentConfig; hypothesis: string; onRun: (c: ExperimentConfig) => void; onBack: () => void; }

const DUR = ["一周","一个月","一年","五年","十年"];
const DUR_HINT: Record<string, string> = {
  "一周": "刚刚开始，大家还在一脸懵逼 😳",
  "一个月": "已经开始慌了，到处找替代方案 🏃",
  "一年": "新秩序差不多稳了，旧伤口还在痒 🩹",
  "五年": "已经没人记得原来长啥样了 🤷",
  "十年": "小朋友：你说的那个东西是啥？👶",
};
const SCP = ["个人","城市","国家","全球"] as const;
const SCP_HINT: Record<string, string> = {
  "个人": "就祸害一个人（比如你）",
  "城市": "一座城市陪你一起崩",
  "国家": "全国上下一起体验过山车",
  "全球": "谁都别想跑 🌍",
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
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-scale-in px-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-lab-border">
        <div><p className="text-xs font-mono text-lab-text-dim tracking-wider uppercase">🔧 微调一下你的脑洞</p><h2 className="text-xl font-semibold text-lab-text-bright">{cfg.title}</h2></div>
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="scale-press flex items-center gap-1.5 px-4 py-2 text-sm text-lab-text-dim hover:text-lab-text border border-lab-border rounded-lg hover:border-lab-text-dim/40 transition-all duration-300">
            <ArrowLeft className="w-4 h-4"/><span className="font-mono text-xs tracking-wider">算了</span>
          </button>
          <button onClick={()=>onRun(cfg)} className="btn-glow scale-press ripple-effect flex items-center gap-2 px-6 py-2.5 bg-lab-accent text-lab-bg font-semibold text-sm rounded-lg transition-all duration-300">
            <Play className="w-4 h-4"/><span className="font-mono tracking-wider text-xs uppercase">🚀 搞起</span>
          </button>
        </div>
      </div>

      {/* Hypothesis display */}
      <div className="card-lift bg-lab-surface/50 border border-lab-border/50 rounded-lg p-4">
        <div className="flex items-center gap-1.5 mb-1"><Info className="w-3 h-3 text-lab-text-dim"/><p className="text-xs font-mono text-lab-text-dim uppercase tracking-wider">你说的</p></div>
        <p className="text-sm text-lab-text leading-relaxed">{hypothesis}</p>
      </div>

      {/* ───── 核心配置 ───── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger">
        <Fld l="主角是谁" hint="谁被盯上了？" i={<Settings2 className="w-3.5 h-3.5"/>}>
          <input type="text" value={cfg.subject} onChange={e=>upd("subject",e.target.value)} className="config-input"/>
        </Fld>
        <Fld l="到底发生了啥" hint="一句话，简单粗暴" i={<Zap className="w-3.5 h-3.5"/>}>
          <input type="text" value={cfg.change} onChange={e=>upd("change",e.target.value)} className="config-input"/>
        </Fld>
        <Fld l="搞多久" hint={DUR_HINT[cfg.duration] || ""} i={<Clock className="w-3.5 h-3.5"/>}>
          <select value={cfg.duration} onChange={e=>upd("duration",e.target.value)} className="config-input">
            {DUR.map(o=><option key={o} value={o}>{o}</option>)}
          </select>
        </Fld>
        <Fld l="影响多大" hint={SCP_HINT[cfg.scope] || ""} i={<Globe className="w-3.5 h-3.5"/>}>
          <select value={cfg.scope} onChange={e=>upd("scope",e.target.value as typeof cfg.scope)} className="config-input">
            {SCP.map(o=><option key={o} value={o}>{o}</option>)}
          </select>
        </Fld>
        <Fld l="大家多快接受现实" hint="慢：死扛到底 → 快：秒怂" i={<Clock className="w-3.5 h-3.5"/>}>
          <select value={cfg.adaptation_speed} onChange={e=>upd("adaptation_speed",e.target.value as typeof cfg.adaptation_speed)} className="config-input">
            {SPD.map(o=><option key={o} value={o}>{o}</option>)}
          </select>
        </Fld>
      </div>

      {/* ───── 可自定义的开放字段 ───── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Fld l="能有替代品吗" hint="Plan B 能不能用？" i={<Settings2 className="w-3.5 h-3.5"/>}>
          <input type="text" value={cfg.replacement_level} onChange={e=>upd("replacement_level",e.target.value)} placeholder="随便写，比如：做梦" className="config-input"/>
        </Fld>
        <Fld l="有人管这事吗" hint="政府/大佬/救世主会插手吗？" i={<Zap className="w-3.5 h-3.5"/>}>
          <input type="text" value={cfg.intervention_level} onChange={e=>upd("intervention_level",e.target.value)} placeholder="随便写，比如：没人管" className="config-input"/>
        </Fld>
      </div>

      {/* ───── Affected Domains ───── */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5"><Info className="w-3 h-3 text-lab-text-dim"/><p className="text-xs font-mono text-lab-text-dim uppercase tracking-wider">哪些地方会遭殃 💥</p></div>
        <div className="flex flex-wrap gap-2 mb-2">
          {cfg.affected_domains.map((d,i)=><span key={i} className="tag-hover inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-lab-accent/10 border border-lab-accent/20 text-lab-accent font-mono">{d}<button onClick={()=>rmDomain(i)} className="hover:text-lab-error transition-colors"><X className="w-2.5 h-2.5"/></button></span>)}
        </div>
        <div className="flex gap-2">
          <input type="text" value={newDomain} onChange={e=>setNewDomain(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();addDomain();}}} placeholder="再加一个，比如：外卖、追星……" className="config-input text-sm flex-1"/>
          <button onClick={addDomain} className="btn-glow scale-press px-3 py-2 text-xs font-mono bg-lab-accent/10 border border-lab-accent/20 text-lab-accent rounded-lg transition-colors">+</button>
        </div>
      </div>

      {/* ───── Assumptions ───── */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5"><Info className="w-3 h-3 text-lab-text-dim"/><p className="text-xs font-mono text-lab-text-dim uppercase tracking-wider">有啥前提条件 🤔</p></div>
        <div className="flex flex-wrap gap-2 mb-2">
          {cfg.assumptions.map((a,i)=><span key={i} className="tag-hover inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-lab-surface border border-lab-border rounded-full text-lab-text group">{a}<button onClick={()=>rmAssumption(i)} className="text-lab-text-dim hover:text-lab-error transition-colors"><X className="w-3 h-3"/></button></span>)}
          {cfg.assumptions.length===0&&<span className="text-xs text-lab-text-dim/60 italic">没前提？那全世界一起崩</span>}
        </div>
        <div className="flex gap-2">
          <input type="text" value={newAssumption} onChange={e=>setNewAssumption(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();addAssumption();}}} placeholder="比如：Wi-Fi 没断、快递还在……" className="config-input text-sm flex-1"/>
          <button onClick={addAssumption} className="scale-press px-3 py-2 text-xs font-mono bg-lab-surface border border-lab-border text-lab-text-dim rounded-lg hover:border-lab-accent/30 hover:text-lab-text transition-all duration-300">+</button>
        </div>
      </div>
    </div>
  );
}

function Fld({l, hint, i, children}:{l:string;hint:string;i:React.ReactNode;children:React.ReactNode}) {
  return <div className="space-y-1.5"><label className="flex items-center gap-1.5 text-xs font-mono text-lab-text-dim uppercase tracking-wider">{i}{l}</label><p className="text-[10px] text-lab-text-dim/50 -mt-1 mb-1">{hint}</p>{children}</div>;
}