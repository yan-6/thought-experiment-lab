import { NextRequest, NextResponse } from "next/server";
import { callInfiniSynapse } from "@/lib/infinisynapse";
import { RUN_EXPERIMENT_SYSTEM, buildRunExperimentPrompt } from "@/lib/prompts";
import { parseExperimentResult, generateExperimentId } from "@/lib/parser";
import { RunRequestSchema } from "@/lib/schemas";

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const experimentId = generateExperimentId();

  try {
    const body = await request.json();
    const parsed = RunRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_FAILED",
            message: "实验数据验证失败，请检查输入。",
          },
        },
        { status: 400 }
      );
    }

    const { hypothesis, experiment } = parsed.data;

    const unsafePatterns = [
      /自[杀残]/, /暴力/, /犯罪/, /[制炸]药/,
      /诊断/, /政治[操操]/, /隐私攻击/,
    ];
    const hasUnsafe = unsafePatterns.some((p) => p.test(hypothesis));
    if (hasUnsafe) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "CONTENT_REJECTED",
            message: "该假设涉及不允许的内容，系统已拒绝模拟。",
          },
        },
        { status: 422 }
      );
    }

    const rawResponse = await callInfiniSynapse([
      { role: "system", content: RUN_EXPERIMENT_SYSTEM },
      { role: "user", content: buildRunExperimentPrompt(hypothesis, experiment as unknown as Record<string, unknown>) },
    ], {
      temperature: 0.8,
      maxTokens: 4096,
    });

    const result = parseExperimentResult(rawResponse);
    const durationMs = Date.now() - startTime;

    console.log({
      experimentId,
      provider: "InfiniSynapse",
      durationMs,
      success: true,
      parseSuccess: true,
      hypothesisLength: hypothesis.length,
    });

    return NextResponse.json({
      success: true,
      data: result,
      meta: {
        experiment_id: experimentId,
        duration_ms: durationMs,
        provider: "InfiniSynapse",
      },
    });
  } catch (err) {
    const durationMs = Date.now() - startTime;
    const errorMessage = err instanceof Error ? err.message : "未知错误";

    console.error({
      experimentId,
      provider: "InfiniSynapse",
      durationMs,
      success: false,
      parseSuccess: false,
      error: errorMessage,
    });

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "RUN_FAILED",
          message: "世界模型启动失败，请重新运行实验。",
        },
      },
      { status: 500 }
    );
  }
}