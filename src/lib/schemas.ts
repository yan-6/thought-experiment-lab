import { z } from "zod";

export const ExperimentConfigSchema = z.object({
  title: z.string().min(1),
  subject: z.string().min(1),
  change: z.string().min(1),
  duration: z.string().min(1),
  scope: z.enum(["个人", "城市", "国家", "全球"]),
  region: z.string().min(1),
  adaptation_speed: z.enum(["慢", "中等", "快"]),
  replacement_level: z.enum(["不允许", "有限允许", "完全允许"]),
  intervention_level: z.enum(["无", "有限", "强"]),
  affected_domains: z.array(z.string()),
  assumptions: z.array(z.string()),
});

export const DependencyGraphSchema = z.object({
  core: z.string(),
  direct_nodes: z.array(z.string()),
  secondary_nodes: z.array(z.string()),
  long_term_nodes: z.array(z.string()),
});

export const TimelineItemSchema = z.object({
  time: z.string(),
  headline: z.string(),
  description: z.string(),
  impact_level: z.enum(["low", "medium", "high", "critical"]),
});

export const WorldlineSchema = z.object({
  name: z.string(),
  likelihood: z.enum(["More Likely", "Plausible", "Edge Case"]),
  summary: z.string(),
  turning_point: z.string(),
  winners: z.array(z.string()),
  losers: z.array(z.string()),
  trigger_conditions: z.array(z.string()),
});

export const ConstraintConflictSchema = z.object({
  conflict: z.string(),
  reason: z.string(),
  suggested_fix: z.string(),
});

export const ExperimentResultSchema = z.object({
  experiment: ExperimentConfigSchema,
  dependency_graph: DependencyGraphSchema,
  direct_effects: z.array(z.string()),
  second_order_effects: z.array(z.string()),
  unexpected_effects: z.array(z.string()),
  timeline: z.array(TimelineItemSchema),
  worldlines: z.array(WorldlineSchema),
  constraint_conflicts: z.array(ConstraintConflictSchema),
  biggest_winners: z.array(z.string()),
  biggest_losers: z.array(z.string()),
  first_breaking_point: z.string(),
  hardest_to_replace: z.string(),
  new_thing_created: z.string(),
  final_insight: z.string(),
  disclaimer: z.string(),
});

export const ParseRequestSchema = z.object({
  hypothesis: z.string().min(5).max(300),
});

export const RunRequestSchema = z.object({
  hypothesis: z.string().min(5).max(300),
  experiment: ExperimentConfigSchema,
});