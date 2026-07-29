"use client";

import { RotateCcw, Settings2, Copy, Check } from "lucide-react";
import { useState } from "react";

interface Props { onRunAnother: () => void; onModifyVariables: () => void; conclusion: string; }

export default function ResultActions({ onRunAnother, onModifyVariables, conclusion }: Props) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(conclusion); } catch {
      const ta = document.createElement("textarea"); ta.value = conclusion; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
    }
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 pt-6 border-t border-lab-border animate-slide-up" style={{ animationDelay: "0.7s" }}>
      <button onClick={onRunAnother} className="flex items-center gap-2 px-5 py-2.5 bg-lab-accent text-lab-bg font-semibold text-sm rounded-lg hover:bg-lab-accent-dim hover:shadow-[0_0_20px_rgba(0,229,160,0.25)] transition-all duration-300"><RotateCcw className="w-4 h-4"/><span className="font-mono text-xs tracking-wider uppercase">🔄 再开一个脑洞</span></button>
      <button onClick={onModifyVariables} className="flex items-center gap-2 px-5 py-2.5 text-lab-text border border-lab-border rounded-lg hover:border-lab-accent/30 hover:text-lab-text-bright transition-all duration-300"><Settings2 className="w-4 h-4"/><span className="font-mono text-xs tracking-wider uppercase">🔧 调整参数</span></button>
      <button onClick={handleCopy} className="flex items-center gap-2 px-5 py-2.5 text-lab-text-dim border border-lab-border/50 rounded-lg hover:border-lab-accent/20 hover:text-lab-text transition-all duration-300">{copied?<Check className="w-4 h-4 text-lab-accent"/>:<Copy className="w-4 h-4"/>}<span className="font-mono text-xs tracking-wider uppercase">{copied?"已复制！去发朋友圈吧":"📋 抄结论"}</span></button>
    </div>
  );
}