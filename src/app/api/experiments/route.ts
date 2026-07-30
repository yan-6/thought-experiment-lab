import { NextRequest, NextResponse } from "next/server";
import { loadRecentExperiments, searchSimilarExperiments } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  try {
    let records;

    if (q) {
      records = searchSimilarExperiments(q, limit);
    } else {
      records = loadRecentExperiments(limit);
    }

    return NextResponse.json({ success: true, data: records });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: { code: "LOAD_FAILED", message: "无法加载实验历史。" } },
      { status: 500 }
    );
  }
}
