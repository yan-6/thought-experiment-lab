"use client";

import { useState, useCallback, useRef } from "react";
import Header from "@/components/Header";
import ExperimentInput from "@/components/ExperimentInput";
import ExamplePrompts from "@/components/ExamplePrompts";
import ExperimentConfigPanel from "@/components/ExperimentConfigPanel";
import TerminalLoader from "@/components/TerminalLoader";
import ExperimentHeader from "@/components/ExperimentHeader";
import FinalInsightCard from "@/components/FinalInsightCard";
import DependencyMap from "@/components/DependencyMap";
import Timeline from "@/components/Timeline";
import WorldlineCard from "@/components/WorldlineCard";
import WinnersLosers from "@/components/WinnersLosers";
import UnexpectedOutcomes from "@/components/UnexpectedOutcomes";
import ConstraintConflicts from "@/components/ConstraintConflicts";
import ResultActions from "@/components/ResultActions";
import ErrorState from "@/components/ErrorState";
import { validateHypothesis } from "@/lib/parser";
import type { AppState, ExperimentConfig, ExperimentResult, ParseResponse, RunResponse } from "@/types/experiment";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("HOME");
  const [hypothesis, setHypothesis] = useState("");
  const [config, setConfig] = useState<ExperimentConfig | null>(null);
  const [result, setResult] = useState<ExperimentResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [experimentId, setExperimentId] = useState("");
  const [durationMs, setDurationMs] = useState(0);
  const [apiComplete, setApiComplete] = useState(false);
  const runningRef = useRef(false);

  const handleParse = useCallback(async () => {
    const v = validateHypothesis(hypothesis);
    if (!v.valid) { setError(v.error || null); return; }
    setError(null); setAppState("PARSING");
    try {
      const res = await fetch("/api/parse-experiment", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ hypothesis: hypothesis.trim() }) });
      const data: ParseResponse = await res.json();
      if (!res.ok || !data.success || !data.data) throw new Error(data.error?.message || "解析失败");
      setConfig(data.data); setAppState("CONFIG");
    } catch (err) { setError(err instanceof Error ? err.message : "实验假设解析失败，请重试。"); setAppState("ERROR"); }
  }, [hypothesis]);

  const handleRun = useCallback(async (updatedConfig: ExperimentConfig) => {
    if (runningRef.current) return;
    runningRef.current = true; setConfig(updatedConfig); setAppState("RUNNING"); setApiComplete(false); setResult(null);
    try {
      const res = await fetch("/api/run-experiment", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ hypothesis: hypothesis.trim(), experiment: updatedConfig }) });
      const data: RunResponse = await res.json();
      if (!res.ok || !data.success || !data.data) throw new Error(data.error?.message || "运行失败");
      setResult(data.data); setExperimentId(data.meta?.experiment_id || ""); setDurationMs(data.meta?.duration_ms || 0); setApiComplete(true);
      setTimeout(() => setAppState("RESULT"), 1500);
    } catch (err) { setError(err instanceof Error ? err.message : "世界模型启动失败，请重新运行实验。"); setAppState("ERROR"); }
    finally { runningRef.current = false; }
  }, [hypothesis]);

  const handleBack = () => setAppState("HOME");
  const handleBackToConfig = () => setAppState("CONFIG");
  const handleRunAnother = () => { setHypothesis(""); setConfig(null); setResult(null); setError(null); setExperimentId(""); setAppState("HOME"); };
  const handleModifyVariables = () => setAppState("CONFIG");
  const handleRetry = () => { if (config) handleRun(config); else handleParse(); };

  const renderState = () => {
    switch (appState) {
      case "HOME": case "PARSING":
        return (<div className="flex flex-col items-center justify-center min-h-[80vh] px-4"><ExperimentInput hypothesis={hypothesis} setHypothesis={setHypothesis} onSubmit={handleParse} isLoading={appState==="PARSING"} error={appState==="HOME"?error:null}/><ExamplePrompts onSelect={(p)=>{setHypothesis(p);setError(null);}} disabled={appState==="PARSING"}/></div>);
      case "CONFIG":
        return config ? (<div className="py-8"><ExperimentConfigPanel config={config} hypothesis={hypothesis} onRun={handleRun} onBack={handleBack}/></div>) : null;
      case "RUNNING":
        return (<div className="py-12"><TerminalLoader experimentTitle={config?.title||"Experiment"} isComplete={apiComplete}/></div>);
      case "RESULT":
        return result ? (<div className="py-6 px-4 max-w-4xl mx-auto space-y-8">
          <ExperimentHeader experimentId={experimentId} title={result.experiment.title} subject={result.experiment.subject} duration={result.experiment.duration} region={result.experiment.region} durationMs={durationMs}/>
          <FinalInsightCard insight={result.final_insight}/>
          <section className="animate-slide-up space-y-3" style={{animationDelay:"0.15s"}}><h3 className="text-sm font-mono text-lab-text-dim uppercase tracking-wider">Experiment Definition</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm"><Def l="Subject" v={result.experiment.subject}/><Def l="Change" v={result.experiment.change}/><Def l="Duration" v={result.experiment.duration}/><Def l="Scope" v={result.experiment.scope}/><Def l="Region" v={result.experiment.region}/><Def l="Adaptation" v={result.experiment.adaptation_speed}/></div></section>
          <DependencyMap graph={result.dependency_graph}/>
          <Timeline items={result.timeline}/>
          <UnexpectedOutcomes outcomes={result.unexpected_effects}/>
          <section className="animate-slide-up space-y-4" style={{animationDelay:"0.4s"}}><div className="flex items-center gap-2"><span className="text-sm font-mono text-lab-text-dim uppercase tracking-wider">Alternate Worlds</span></div><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{result.worldlines.map((wl,i)=><WorldlineCard key={i} worldline={wl} index={i}/>)}</div></section>
          <WinnersLosers winners={result.biggest_winners} losers={result.biggest_losers} firstBreakingPoint={result.first_breaking_point} hardestToReplace={result.hardest_to_replace} newThingCreated={result.new_thing_created}/>
          <ConstraintConflicts conflicts={result.constraint_conflicts}/>
          <p className="text-center text-[10px] text-lab-text-dim/40 font-mono tracking-wider pt-4">{result.disclaimer}</p>
          <ResultActions onRunAnother={handleRunAnother} onModifyVariables={handleModifyVariables} conclusion={result.final_insight}/>
        </div>) : null;
      case "ERROR":
        return (<div className="py-16"><ErrorState message={error||"发生未知错误。"} onRetry={handleRetry} onBackToConfig={handleBackToConfig} onBackToHome={handleBack} isConfig={!config}/></div>);
    }
  };

  return (<main className="min-h-screen">{appState!=="RUNNING"&&appState!=="RESULT"&&appState!=="ERROR"&&<Header/>}{renderState()}<footer className="w-full py-8 text-center"><p className="text-[10px] font-mono text-lab-text-dim/30 tracking-[0.2em] uppercase">Thought Experiment Lab • World Simulation Interface • v1.0 MVP</p></footer></main>);
}

function Def({l,v}:{l:string;v:string}){return (<div className="flex items-center gap-2 p-3 rounded-lg bg-lab-surface/30 border border-lab-border/50"><span className="text-[10px] font-mono text-lab-text-dim uppercase tracking-wider shrink-0">{l}:</span><span className="text-sm text-lab-text truncate">{v}</span></div>);}