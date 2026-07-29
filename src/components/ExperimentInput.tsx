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

export default function ExperimentInput({ hypothesis, setHypothesis, onSubmit, isLoading, error }: ExperimentInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [charCount, setCharCount] = useState(hypothesis.length);

  useEffect(() => { setCharCount(hypothesis.length); }, [hypothesis]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSubmit(); }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="w-full max-w-2xl mx-auto space-y-4">
      <h1 className="text-3xl sm:text-4xl font-light text-center text-lab-text-bright tracking-tight animate-slide-up">
        如果世界按下 <span className="text-lab-accent font-normal">Ctrl+Z</span> 会怎样？
      </h1>
      <p className="text-center text-lab-text-dim text-sm animate-slide-up" style={{ animationDelay: "0.1s" }}>
        输入一个疯狂的假设，我们帮你把它变成一份看起来很科学的报告 🧪
      </p>
      <div className="relative group animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <textarea
          ref={textareaRef}
          value={hypothesis}
          onChange={(e) => { if (e.target.value.length <= 300) setHypothesis(e.target.value); }}
          onKeyDown={handleKeyDown}
          placeholder="例如：如果微信突然消失…… 如果老板再也不能@我…… 如果猫统治了世界……"
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
            <><Sparkles className="w-4 h-4 animate-pulse" /><span className="font-mono tracking-[0.2em] uppercase">AI 正在理解你的脑洞……</span></>
          ) : (
            <><span className="font-mono tracking-[0.15em] uppercase">🚀 开始脑洞实验</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" /></>
          )}
        </button>
      </div>
      <p className="text-center text-[10px] text-lab-text-dim/40 font-mono animate-fade-in" style={{ animationDelay: "0.35s" }}>
        别担心，不会把你的假设上传到外星服务器（大概吧）
      </p>
    </form>
  );
}