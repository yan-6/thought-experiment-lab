import { ExperimentConfigSchema, ExperimentResultSchema } from "./schemas";
import { FALLBACK_EXPERIMENT_CONFIG, FALLBACK_RESULT } from "./fallback";
import type { ExperimentConfig, ExperimentResult } from "@/types/experiment";

export function extractJson(raw: string): string {
  let cleaned = raw;
  cleaned = cleaned.replace(/```json\s*/gi, "");
  cleaned = cleaned.replace(/```\s*/g, "");
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("No valid JSON object found in response");
  }
  return cleaned.slice(firstBrace, lastBrace + 1);
}

export function parseExperimentConfig(raw: string): ExperimentConfig {
  try {
    const jsonStr = extractJson(raw);
    const parsed = JSON.parse(jsonStr);
    const result = ExperimentConfigSchema.safeParse(parsed);
    if (result.success) return result.data;
    console.warn("Config parse warnings:", result.error.issues);
    return { ...FALLBACK_EXPERIMENT_CONFIG, ...parsed };
  } catch (err) {
    console.error("Failed to parse experiment config:", err);
    return FALLBACK_EXPERIMENT_CONFIG;
  }
}

export function parseExperimentResult(raw: string): ExperimentResult {
  try {
    const jsonStr = extractJson(raw);
    const parsed = JSON.parse(jsonStr);
    const result = ExperimentResultSchema.safeParse(parsed);
    if (result.success) return result.data;
    console.warn("Result parse warnings:", result.error.issues);
    return deepMerge(FALLBACK_RESULT, parsed);
  } catch (err) {
    console.error("Failed to parse experiment result:", err);
    return FALLBACK_RESULT;
  }
}

function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): ExperimentResult {
  const merged = { ...target };
  for (const key of Object.keys(source)) {
    const sv = source[key];
    const tv = target[key];
    if (Array.isArray(sv) && Array.isArray(tv) && sv.length > 0) {
      merged[key] = sv;
    } else if (
      sv !== null && typeof sv === "object" && !Array.isArray(sv) &&
      tv !== null && typeof tv === "object" && !Array.isArray(tv)
    ) {
      merged[key] = deepMerge(tv as Record<string, unknown>, sv as Record<string, unknown>);
    } else if (sv !== undefined && sv !== null && sv !== "") {
      merged[key] = sv;
    }
  }
  return merged as ExperimentResult;
}

export function validateHypothesis(hypothesis: string): { valid: boolean; error?: string } {
  if (!hypothesis || hypothesis.trim().length === 0) {
    return { valid: false, error: "请输入一个实验假设。" };
  }
  const trimmed = hypothesis.trim();
  if (trimmed.length < 5) {
    return { valid: false, error: "请输入一个完整的「如果……会怎样」实验假设。" };
  }
  if (trimmed.length > 300) {
    return { valid: false, error: "实验假设不能超过 300 个字符。" };
  }
  return { valid: true };
}

export function generateExperimentId(): string {
  const seq = String(Math.floor(Math.random() * 1000)).padStart(3, "0");
  return `TEL-2026-${seq}`;
}