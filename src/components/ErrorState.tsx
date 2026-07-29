"use client";

import { AlertTriangle, RotateCcw, ArrowLeft } from "lucide-react";

interface Props { message: string; onRetry: () => void; onBackToConfig: () => void; onBackToHome: () => void; isConfig?: boolean; }

export default function ErrorState({ message, onRetry, onBackToConfig, onBackToHome, isConfig = false }: Props) {
  return (
    <div className="w-full max-w-md mx-auto animate-fade-in px-4">
      <div className="rounded-xl border border-lab-error/20 bg-lab-error/5 p-8 text-center space-y-6">
        <div className="flex justify-center"><div className="w-16 h-16 rounded-full bg-lab-error/10 border border-lab-error/20 flex items-center justify-center"><AlertTriangle className="w-8 h-8 text-lab-error"/></div></div>
        <div><h3 className="text-lg font-semibold text-lab-text-bright mb-2">实验炸了 💥</h3><p className="text-sm text-lab-text-dim leading-relaxed">{message}</p></div>
        <div className="inline-block px-4 py-2 rounded-md bg-lab-bg border border-lab-border/50 font-mono text-xs text-lab-text-dim"><span className="text-lab-error">ERROR:</span> 脑洞太大，服务器一时承受不住</div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onClick={onRetry} className="flex items-center gap-2 w-full sm:w-auto justify-center px-5 py-2.5 bg-lab-accent/10 border border-lab-accent/30 rounded-lg text-lab-accent font-medium text-sm hover:bg-lab-accent/20 hover:shadow-[0_0_15px_rgba(0,229,160,0.15)] transition-all duration-300"><RotateCcw className="w-4 h-4"/><span className="font-mono text-xs tracking-wider uppercase">🔄 再试一次</span></button>
          <button onClick={isConfig?onBackToHome:onBackToConfig} className="flex items-center gap-2 w-full sm:w-auto justify-center px-5 py-2.5 text-lab-text-dim border border-lab-border/50 rounded-lg hover:text-lab-text hover:border-lab-border transition-all duration-300"><ArrowLeft className="w-4 h-4"/><span className="font-mono text-xs tracking-wider uppercase">{isConfig?"🏠 回首页":"⚙️ 回配置"}</span></button>
        </div>
      </div>
      <p className="text-center text-[10px] text-lab-text-dim/40 mt-6 font-mono">💀 世界模型已放弃思考 · 内存已还给宇宙</p>
    </div>
  );
}