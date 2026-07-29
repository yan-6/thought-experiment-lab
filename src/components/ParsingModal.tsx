"use client";

import { useState, useEffect } from "react";
import { Sparkles, Cpu, Brain } from "lucide-react";

interface Props {
  isOpen: boolean;
  hypothesis: string;
}

const PARSING_STEPS = [
  { emoji: "🔍", text: "扫描脑洞关键词…" },
  { emoji: "🧩", text: "拆解假设逻辑链…" },
  { emoji: "📐", text: "推算影响范围…" },
  { emoji: "🎯", text: "锁定核心变量…" },
  { emoji: "⏳", text: "匹配实验模板…" },
  { emoji: "✅", text: "脑洞解读完毕！" },
];

const TIPS = [
  "💡 你知道吗：人类历史上最著名的脑洞——「如果地球是圆的」——当时也被当作疯话",
  "🤔 爱因斯坦说过：如果一开始一个想法不荒谬，那它就毫无希望",
  "🌍 平行宇宙理论认为：你此刻想过的每一个可能性，都存在于某个宇宙中",
  "🧪 好的假设不应该太合理——太合理的假设通常对应太无聊的答案",
  "🔥 我们正在把你的疯狂想法翻译成科学的语言……虽然科学不一定同意",
];

export default function ParsingModal({ isOpen, hypothesis }: Props) {
  const [step, setStep] = useState(0);
  const [tipIdx, setTipIdx] = useState(0);

  useEffect(() => {
    if (!isOpen) { setStep(0); return; }

    const stepTimer = setInterval(() => {
      setStep((prev) => {
        if (prev >= PARSING_STEPS.length - 1) return PARSING_STEPS.length - 1;
        return prev + 1;
      });
    }, 400);

    const tipTimer = setInterval(() => {
      setTipIdx((prev) => (prev + 1) % TIPS.length);
    }, 3000);

    return () => {
      clearInterval(stepTimer);
      clearInterval(tipTimer);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-lab-bg/90 backdrop-blur-sm" />

      {/* Modal card */}
      <div className="relative z-10 w-full max-w-lg mx-4 animate-scale-in">
        <div className="rounded-2xl border border-lab-accent/30 bg-lab-surface/95 p-8 shadow-[0_0_60px_rgba(0,255,179,0.1)]">
          {/* CPU icon with spin */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-lab-accent/10 border-2 border-lab-accent/30 flex items-center justify-center animate-glow-pulse">
                <Brain className="w-10 h-10 text-lab-accent animate-float" />
              </div>
              <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-lab-surface border border-lab-accent/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-lab-warn animate-pulse" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-center text-lg font-semibold text-lab-text-bright mb-2">
            正在理解你的脑洞…
          </h2>

          {/* Hypothesis display */}
          <div className="text-center mb-6">
            <p className="text-sm text-lab-text-dim italic px-4 py-2 rounded-lg bg-lab-bg/50 border border-lab-border/30">
              「{hypothesis.length > 50 ? hypothesis.slice(0, 50) + "…" : hypothesis}」
            </p>
          </div>

          {/* Progress steps */}
          <div className="space-y-2 mb-6">
            {PARSING_STEPS.map((s, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${
                  i < step
                    ? "bg-lab-accent/5 text-lab-accent/60"
                    : i === step
                    ? "bg-lab-accent/10 text-lab-accent border border-lab-accent/20"
                    : "text-lab-text-dim/30"
                }`}
              >
                <span className="text-sm">{s.emoji}</span>
                <span className="text-xs font-mono tracking-wider">{s.text}</span>
                {i === step && (
                  <span className="ml-auto flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-lab-accent animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-lab-accent animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-lab-accent animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                )}
                {i < step && (
                  <span className="ml-auto text-lab-accent text-xs">✓</span>
                )}
              </div>
            ))}
          </div>

          {/* Random tips */}
          <div className="text-center animate-fade-in" key={tipIdx}>
            <p className="text-[11px] text-lab-text-dim/60 leading-relaxed italic">
              {TIPS[tipIdx]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}