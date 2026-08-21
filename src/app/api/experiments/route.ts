import { NextRequest, NextResponse } from "next/server";
import { loadRecentExperiments, searchSimilarExperiments } from "@/lib/storage";

export const dynamic = "force-dynamic";

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

function parseLimit(value: string | null): number {
  if (value === null) return DEFAULT_LIMIT;

  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 1) return DEFAULT_LIMIT;

  return Math.min(parsed, MAX_LIMIT);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const limit = parseLimit(searchParams.get("limit"));

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

