"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

interface ExperimentInputProps {
  hypothesis: string;
  setHypothesis: (val: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  error: string | null;
}

export default function ExperimentInput({
  hypothesis,
  setHypothesis,
  onSubmit,
  isLoading,
  error,
}: ExperimentInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [charCount, setCharCount] = useState(hypothesis.length);

  useEffect(() => { setCharCount(hypothesis.length); }, [hypothesis]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSubmit(); }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="w-full max-w-2xl mx-auto space-y-4">
      <h1 className="text-3xl sm:text-4xl font-light text-center text-lab-text-bright tracking-tight animate-slide-up">
        What if the world worked <span className="text-lab-accent font-normal">differently</span>?
      </h1>
      <p className="text-center text-lab-text-dim text-sm animate-slide-up" style={{ animationDelay: "0.1s" }}>
        改变一个变量，运行另一个世界。
      </p>
      <div className="relative group animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <textarea
          ref={textareaRef}
          value={hypothesis}
          onChange={(e) => { if (e.target.value.length <= 300) setHypothesis(e.target.value); }}
          onKeyDown={handleKeyDown}
          placeholder="如果微信消失一年，中国人的数字生活会发生什么？"
          rows={3} maxLength={300} disabled={isLoading}
          className="w-full bg-lab-surface border border-lab-border rounded-lg px-5 py-4
                     text-lab-text-bright placeholder:text-lab-text-dim/50 text-base
                     focus:outline-none focus:border-lab-accent/50 focus:ring-1 focus:ring-lab-accent/20
                     transition-all duration-300 resize-none font-sans
                     disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <div className="absolute bottom-3 right-3">
          <span className={`text-xs font-mono ${charCount > 250 ? "text-lab-warn" : "text-lab-text-dim"}`}>
            {charCount}/300
          </span>
        </div>
      </div>
      {error && <p className="text-lab-error text-sm text-center animate-fade-in">{error}</p>}
      <div className="flex justify-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
        <button
          type="submit"
          disabled={isLoading || hypothesis.trim().length < 5}
          className="group relative inline-flex items-center gap-2 px-8 py-3
                     bg-lab-accent/10 border border-lab-accent/30 rounded-lg
                     text-lab-accent font-medium text-sm tracking-wider
                     hover:bg-lab-accent/20 hover:border-lab-accent/50
                     hover:shadow-[0_0_20px_rgba(0,229,160,0.15)]
                     transition-all duration-300
                     disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <><Sparkles className="w-4 h-4 animate-pulse" /><span className="font-mono tracking-[0.2em] uppercase">Parsing...</span></>
          ) : (
            <><span className="font-mono tracking-[0.2em] uppercase">Parse Experiment</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" /></>
          )}
        </button>
      </div>
    </form>
  );
}