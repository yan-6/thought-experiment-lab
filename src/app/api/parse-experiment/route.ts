import { NextRequest, NextResponse } from "next/server";
import { callInfiniSynapse } from "@/lib/infinisynapse";
import { PARSE_EXPERIMENT_SYSTEM, buildParseExperimentPrompt } from "@/lib/prompts";
import { parseExperimentConfig } from "@/lib/parser";
import { FALLBACK_EXPERIMENT_CONFIG } from "@/lib/fallback";
import { ParseRequestSchema } from "@/lib/schemas";
import type { ExperimentConfig } from "@/types/experiment";

function generateConfigFromHypothesis(hypothesis: string): ExperimentConfig {
  const title = hypothesis.replace(/^(如果|假如|假设)\s*/i, "").replace(/[？?。.]$/, "").slice(0, 30);
  return {
    ...FALLBACK_EXPERIMENT_CONFIG,
    title,
    change: hypothesis.slice(0, 60),
    subject: title,
  };
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let usedFallback = false;

  try {
    const body = await request.json();
    const parsed = ParseRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_FAILED", message: "请输入一个完整的'如果……会怎样'实验假设。" } },
        { status: 400 }
      );
    }

    const { hypothesis } = parsed.data;

    const unsafePatterns = [/自[杀残]/, /暴力/, /犯罪/, /[制炸]药/, /诊断/, /政治[操操]/, /隐私攻击/];
    if (unsafePatterns.some((p) => p.test(hypothesis))) {
      return NextResponse.json(
        { success: false, error: { code: "CONTENT_REJECTED", message: "该假设涉及不允许的内容，系统已拒绝模拟。" } },
        { status: 422 }
      );
    }

    let config: ExperimentConfig;

    try {
      const rawResponse = await callInfiniSynapse([
        { role: "system", content: PARSE_EXPERIMENT_SYSTEM },
        { role: "user", content: buildParseExperimentPrompt(hypothesis) },
      ]);
      config = parseExperimentConfig(rawResponse);
    } catch {
      console.warn("InfiniSynapse unavailable, using fallback config");
      config = generateConfigFromHypothesis(hypothesis);
      usedFallback = true;
    }

    const durationMs = Date.now() - startTime;
    console.log({ experimentId: "parse", provider: usedFallback ? "Fallback" : "InfiniSynapse", durationMs, success: true, hypothesisLength: hypothesis.length });

    return NextResponse.json({ success: true, data: config });
  } catch (err) {
    const durationMs = Date.now() - startTime;
    console.error({ experimentId: "parse", durationMs, success: false, error: (err instanceof Error ? err.message : "unknown") });
    return NextResponse.json(
      { success: false, error: { code: "PARSE_FAILED", message: "实验假设解析失败，请重试。" } },
      { status: 500 }
    );
  }
}