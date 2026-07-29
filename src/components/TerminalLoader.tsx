"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal, Cpu } from "lucide-react";

interface Props { experimentTitle: string; isComplete: boolean; }

const LOG = [
  "INITIALIZING WORLD MODEL...","PARSING EXPERIMENT VARIABLES...","IDENTIFYING CRITICAL DEPENDENCIES...",
  "CHECKING CONSTRAINT BOUNDARIES...","SIMULATING DIRECT EFFECTS...","SIMULATING SECOND-ORDER EFFECTS...",
  "GENERATING ALTERNATE WORLDLINES...","EVALUATING UNEXPECTED OUTCOMES...","COMPILING FINAL OBSERVATION...",
];

export default function TerminalLoader({ experimentTitle, isComplete }: Props) {
  const [lines, setLines] = useState<string[]>([]);
  const [cursor, setCursor] = useState(true);
  const [waiting, setWaiting] = useState(false);
  const idx = useRef(0);
  const tmr = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (lines.length === 0) { setLines([LOG[0]]); idx.current = 1; }
    const next = () => {
      if (idx.current < LOG.length && !isComplete) {
        setLines(p => [...p, LOG[idx.current]]); idx.current++;
        tmr.current = setTimeout(next, 600 + Math.random() * 400);
      } else if (idx.current >= LOG.length && !isComplete) {
        setWaiting(true); setLines(p => [...p, ""]);
        tmr.current = setTimeout(() => setLines(p => [...p.slice(0,-1), "WORLD MODEL STILL RUNNING..."]), 300);
      }
    };
    if (isComplete) {
      if (lines.length < 4) { setLines(LOG.slice(0,4)); idx.current = 4; }
      setWaiting(false); return;
    }
    if (idx.current < LOG.length) { tmr.current = setTimeout(next, 700 + Math.random() * 300); }
    else setWaiting(true);
    return () => { if (tmr.current) clearTimeout(tmr.current); };
  }, [isComplete]);

  useEffect(() => { const b = setInterval(() => setCursor(p => !p), 530); return () => clearInterval(b); }, []);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in px-4">
      <div className="flex items-center justify-center gap-3 py-4">
        <div className="w-10 h-10 rounded-lg bg-lab-accent/10 border border-lab-accent/30 flex items-center justify-center animate-pulse-glow"><Cpu className="w-5 h-5 text-lab-accent"/></div>
        <div><p className="text-xs font-mono text-lab-text-dim tracking-wider uppercase">Experiment Running</p><p className="text-sm font-semibold text-lab-text-bright">{experimentTitle}</p></div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <span className="relative flex h-3 w-3"><span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isComplete?"bg-lab-accent":"bg-lab-warn"}`}/><span className={`relative inline-flex rounded-full h-3 w-3 ${isComplete?"bg-lab-accent":"bg-lab-warn"}`}/></span>
        <span className={`text-xs font-mono tracking-[0.2em] ${isComplete?"text-lab-accent":"text-lab-warn"}`}>{isComplete?"COMPLETE":"RUNNING"}</span>
      </div>
      <div className="relative rounded-lg border border-lab-border bg-[#0a0a0f] overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-lab-surface/80 border-b border-lab-border">
          <Terminal className="w-3.5 h-3.5 text-lab-text-dim"/><span className="text-[10px] font-mono text-lab-text-dim tracking-wider">world-model.sys</span>
          <div className="flex-1"/><div className="flex gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-lab-border"/><span className="w-2.5 h-2.5 rounded-full bg-lab-warn/50"/><span className="w-2.5 h-2.5 rounded-full bg-lab-accent/50"/></div>
        </div>
        <div className="p-5 font-mono text-xs leading-relaxed min-h-[280px] max-h-[400px] overflow-y-auto">
          <div className="text-lab-text-dim/60 mb-4 select-none">╔══════════════════════════════════════════╗<br/>║&nbsp;&nbsp; THOUGHT EXPERIMENT LAB v1.0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;║<br/>║&nbsp;&nbsp; World Model Simulation Engine&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;║<br/>╚══════════════════════════════════════════╝<br/></div>
          {lines.map((l,i) => <div key={i} className={`flex items-start gap-2 animate-fade-in ${l==="WORLD MODEL STILL RUNNING..."?"text-lab-warn":"text-lab-accent/80"}`}><span className="text-lab-text-dim/40 shrink-0">$</span><span>{l}</span></div>)}
          {!isComplete && <div className="flex items-start gap-2 mt-0.5"><span className="text-lab-text-dim/40 shrink-0">$</span><span className={`text-lab-accent ${cursor?"opacity-100":"opacity-0"} transition-opacity duration-75`}>_</span></div>}
          {isComplete && <div className="mt-4 pt-3 border-t border-lab-border/50 animate-fade-in"><div className="flex items-start gap-2 text-lab-accent"><span className="text-lab-text-dim/40 shrink-0">$</span><span>SIMULATION COMPLETE. LOADING RESULTS...</span></div></div>}
        </div>
        <div className="flex items-center gap-4 px-4 py-1.5 bg-lab-surface/80 border-t border-lab-border text-[10px] font-mono text-lab-text-dim/60"><span>PID: {Math.floor(Math.random()*90000+10000)}</span><span>MEM: {(Math.random()*400+200).toFixed(0)}MB</span><span className="ml-auto">{isComplete?"EXIT_CODE: 0":"STATUS: RUNNING"}</span></div>
      </div>
      {waiting && !isComplete && <p className="text-center text-xs text-lab-text-dim/70 animate-fade-in font-mono tracking-wider">Building world model • This may take up to 60 seconds</p>}
    </div>
  );
}