import { NextRequest, NextResponse } from "next/server";
import { callInfiniSynapse } from "@/lib/infinisynapse";
import { RUN_EXPERIMENT_SYSTEM, buildRunExperimentPrompt } from "@/lib/prompts";
import { parseExperimentResult, generateExperimentId } from "@/lib/parser";
import { generateDynamicResult } from "@/lib/fallback";
import { RunRequestSchema } from "@/lib/schemas";
import { saveExperiment, extractKeywords, searchSimilarExperiments } from "@/lib/storage";
import { researchHypothesis, basicResearchContext } from "@/lib/webResearch";
import { fetchDataContext, formatDataContext } from "@/lib/dataBridge";

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const experimentId = generateExperimentId();
  let usedFallback = false;

  try {
    const body = await request.json();
    const parsed = RunRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_FAILED", message: "实验数据验证失败，请检查输入。" } },
        { status: 400 }
      );
    }

    const { hypothesis, experiment } = parsed.data;

    const unsafePatterns = [/自[杀残]/, /暴力/, /犯罪/, /[制炸]药/, /诊断/, /政治[操操]/, /隐私攻击/];
    if (unsafePatterns.some((p) => p.test(hypothesis))) {
      return NextResponse.json(
        { success: false, error: { code: "CONTENT_REJECTED", message: "该假设涉及不允许的内容，系统已拒绝模拟。" } },
        { status: 422 }
      );
    }

    // ─── Fetch database context from remote_preset + AI research ───
    let dbSnapshots = [];
    try {
      dbSnapshots = await fetchDataContext(experiment);
      console.log(`Database snapshots loaded: ${dbSnapshots.length} sources`);
    } catch {}

    let researchContext: string | null = null;
    try {
      const research = await researchHypothesis(hypothesis, {
        subject: experiment.subject,
        domains: experiment.affected_domains || [],
        scope: experiment.scope,
        region: experiment.region,
      });
      if (research && research.dataPoints.length > 0) {
        const dbBlock = dbSnapshots.length > 0
          ? formatDataContext(dbSnapshots, experiment) + "\n"
          : "";
        researchContext = dbBlock + research.dataPoints.join("\n");
        console.log(`Research + Database context ready (${researchContext.length} chars)`);
      }
    } catch {
      if (dbSnapshots.length > 0) {
        researchContext = formatDataContext(dbSnapshots, experiment);
      } else {
        const basic = basicResearchContext({
          subject: experiment.subject,
          domains: experiment.affected_domains || [],
          scope: experiment.scope,
          region: experiment.region,
        });
        researchContext = basic.dataPoints.join("\n");
      }
    }

    let result;

    try {
      const rawResponse = await callInfiniSynapse([
        { role: "system", content: RUN_EXPERIMENT_SYSTEM },
        {
          role: "user",
          content: buildRunExperimentPrompt(
            hypothesis,
            experiment as unknown as Record<string, unknown>,
            researchContext
          ),
        },
      ], { temperature: 0.8, maxTokens: 4096 });
      result = parseExperimentResult(rawResponse);
    } catch (apiErr) {
      console.warn("InfiniSynapse unavailable, using fallback:", (apiErr instanceof Error ? apiErr.message : "unknown"));
      usedFallback = true;
      result = generateDynamicResult(hypothesis, experiment);
      // Inject research context into result for frontend display
      if (researchContext) {
        result.unexpected_effects = [
          `💡 实验背景数据：${researchContext.split("\n")[0] || ""}`,
          ...result.unexpected_effects,
        ].slice(0, 5);
      }
    }

    const durationMs = Date.now() - startTime;
    const provider = usedFallback ? "Fallback" : "InfiniSynapse";

    // ─── Save to experiment history ───
    try {
      saveExperiment({
        id: experimentId,
        hypothesis: hypothesis.trim(),
        title: result.experiment.title,
        subject: result.experiment.subject,
        duration: result.experiment.duration,
        scope: result.experiment.scope,
        timestamp: new Date().toISOString(),
        provider,
        finalInsight: result.final_insight,
        keywords: extractKeywords(hypothesis),
      });
    } catch (storageErr) {
      console.warn("Failed to save experiment:", storageErr);
    }

    // ─── Find similar past experiments ───
    let similarExperiments: unknown[] = [];
    try {
      similarExperiments = searchSimilarExperiments(hypothesis, 3);
    } catch {}

    console.log({
      experimentId, provider, durationMs,
      hasResearch: !!researchContext,
      similarCount: similarExperiments.length,
      success: true, parseSuccess: true,
      hypothesisLength: hypothesis.length,
    });

    return NextResponse.json({
      success: true,
      data: result,
      meta: {
        experiment_id: experimentId,
        duration_ms: durationMs,
        provider,
        research_context: researchContext,
        similar_experiments: similarExperiments.slice(0, 3),
      },
    });
  } catch (err) {
    const durationMs = Date.now() - startTime;
    console.error({ experimentId, durationMs, success: false, error: (err instanceof Error ? err.message : "unknown") });
    return NextResponse.json(
      { success: false, error: { code: "RUN_FAILED", message: "世界模型启动失败，请重新运行实验。" } },
      { status: 500 }
    );
  }
}