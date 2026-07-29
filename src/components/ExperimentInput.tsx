"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import ParsingModal from "./ParsingModal";

interface ExperimentInputProps {
  hypothesis: string;
  setHypothesis: (val: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  error: string | null;
}

export default function ExperimentInput({ hypothesis, setHypothesis, onSubmit, isLoading, error }: ExperimentInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [charCount, setCharCount] = useState(hypothesis.length);

  useEffect(() => { setCharCount(hypothesis.length); }, [hypothesis]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSubmit(); }
  };

  return (
    <>
      {/* Full-screen parsing modal — replaces inline loading text */}
      <ParsingModal isOpen={isLoading} hypothesis={hypothesis} />

      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="w-full max-w-2xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl font-light text-center text-lab-text-bright tracking-tight animate-scale-in">
          如果世界按下 <span className="text-lab-accent font-normal">Ctrl+Z</span> 会怎样？
        </h1>
        <p className="text-center text-lab-text-dim text-sm animate-slide-up" style={{ animationDelay: "0.1s" }}>
          输入一个离谱的脑洞，剩下的交给 AI 来圆 🌀
        </p>
        <div className="relative group animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <textarea
            ref={textareaRef}
            value={hypothesis}
            onChange={(e) => { if (e.target.value.length <= 300) setHypothesis(e.target.value); }}
            onKeyDown={handleKeyDown}
            placeholder="比如：微信突然没了… 老板再也不能@我… 猫统治了地球…"
            rows={3} maxLength={300} disabled={isLoading}
            className="w-full bg-lab-surface border border-lab-border rounded-lg px-5 py-4
                       text-lab-text-bright placeholder:text-lab-text-dim/50 text-base
                       transition-all duration-300 resize-none font-sans
                       hover:border-lab-text-dim/40
                       focus:outline-none focus:border-lab-accent/60
                       focus:shadow-[0_0_0_3px_rgba(0,255,179,0.08),0_0_20px_rgba(0,255,179,0.05)]
                       disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <div className="absolute bottom-3 right-3">
            <span className={`text-xs font-mono transition-colors duration-300 ${charCount > 250 ? "text-lab-warn" : "text-lab-text-dim"}`}>
              {charCount}/300
            </span>
          </div>
        </div>
        {error && <p className="text-lab-error text-sm text-center animate-fade-in">{error}</p>}
        <div className="flex justify-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <button
            type="submit"
            disabled={isLoading || hypothesis.trim().length < 5}
            className="btn-glow scale-press ripple-effect group relative inline-flex items-center gap-2 px-8 py-3
                       bg-lab-accent/10 border border-lab-accent/30 rounded-lg
                       text-lab-accent font-medium text-sm tracking-wider
                       transition-all duration-300
                       hover:bg-lab-accent/20 hover:border-lab-accent/50
                       hover:shadow-[0_0_25px_rgba(0,255,179,0.25)]
                       disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            <span className="font-mono tracking-[0.1em]">🚀 来，搞个大的</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
        <p className="text-center text-[10px] text-lab-text-dim/40 font-mono animate-fade-in" style={{ animationDelay: "0.35s" }}>
          不会上传到外星服务器（大概吧）
        </p>
      </form>
    </>
  );
}