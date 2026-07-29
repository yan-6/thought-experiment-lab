"use client";

import { FlaskConical, Globe } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full py-6 px-4 flex items-center justify-center gap-3 animate-fade-in">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-md bg-lab-accent/10 border border-lab-accent/30 flex items-center justify-center">
          <FlaskConical className="w-5 h-5 text-lab-accent" />
        </div>
        <div className="flex flex-col items-start leading-tight">
          <span className="text-sm font-mono font-bold tracking-widest text-lab-accent uppercase">
            Thought Experiment Lab
          </span>
          <span className="text-[10px] font-mono text-lab-text-dim tracking-[0.15em] uppercase flex items-center gap-1">
            <Globe className="w-2.5 h-2.5" />
            World Simulation Interface
          </span>
        </div>
      </div>
    </header>
  );
}