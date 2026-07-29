export interface ExperimentConfig {
  title: string;
  subject: string;
  change: string;
  duration: string;
  scope: "个人" | "城市" | "国家" | "全球";
  adaptation_speed: "慢" | "中等" | "快";
  replacement_level: string;
  intervention_level: string;
  affected_domains: string[];
  assumptions: string[];
}

export interface DependencyGraph {
  core: string;
  direct_nodes: string[];
  secondary_nodes: string[];
  long_term_nodes: string[];
}

export interface TimelineItem {
  time: string;
  headline: string;
  description: string;
  impact_level: "low" | "medium" | "high" | "critical";
}

export interface Worldline {
  name: string;
  likelihood: "More Likely" | "Plausible" | "Edge Case";
  summary: string;
  turning_point: string;
  winners: string[];
  losers: string[];
  trigger_conditions: string[];
}

export interface ConstraintConflict {
  conflict: string;
  reason: string;
  suggested_fix: string;
}

export interface ExperimentResult {
  experiment: ExperimentConfig;
  dependency_graph: DependencyGraph;
  direct_effects: string[];
  second_order_effects: string[];
  unexpected_effects: string[];
  timeline: TimelineItem[];
  worldlines: Worldline[];
  constraint_conflicts: ConstraintConflict[];
  biggest_winners: string[];
  biggest_losers: string[];
  first_breaking_point: string;
  hardest_to_replace: string;
  new_thing_created: string;
  final_insight: string;
  disclaimer: string;
}

export interface ParseResponse {
  success: boolean;
  data?: ExperimentConfig;
  error?: { code: string; message: string };
}

export interface RunResponse {
  success: boolean;
  data?: ExperimentResult;
  meta?: { experiment_id: string; duration_ms: number; provider: string };
  error?: { code: string; message: string };
}

export type AppState = "HOME" | "PARSING" | "CONFIG" | "RUNNING" | "RESULT" | "ERROR";

export interface LogLine { id: number; text: string }