import { NextRequest, NextResponse } from "next/server";
import { callInfiniSynapse } from "@/lib/infinisynapse";
import { PARSE_EXPERIMENT_SYSTEM, buildParseExperimentPrompt } from "@/lib/prompts";
import { parseExperimentConfig } from "@/lib/parser";
import { ParseRequestSchema } from "@/lib/schemas";

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await request.json();
    const parsed = ParseRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_FAILED",
            message: "请输入一个完整的'如果……会怎样'实验假设。",
          },
        },
        { status: 400 }
      );
    }

    const { hypothesis } = parsed.data;

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
      { role: "system", content: PARSE_EXPERIMENT_SYSTEM },
      { role: "user", content: buildParseExperimentPrompt(hypothesis) },
    ]);

    const config = parseExperimentConfig(rawResponse);
    const durationMs = Date.now() - startTime;

    console.log({
      experimentId: "parse",
      provider: "InfiniSynapse",
      durationMs,
      success: true,
      parseSuccess: true,
      hypothesisLength: hypothesis.length,
    });

    return NextResponse.json({
      success: true,
      data: config,
    });
  } catch (err) {
    const durationMs = Date.now() - startTime;
    const errorMessage = err instanceof Error ? err.message : "未知错误";

    console.error({
      experimentId: "parse",
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
          code: "PARSE_FAILED",
          message: "实验假设解析失败，请重试。",
        },
      },
      { status: 500 }
    );
  }
}