/**
 * Lightweight experiment history storage backed by a local JSON file.
 * Each experiment is saved with its hypothesis, config snapshot,
 * key results summary, and timestamp.
 */
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const HISTORY_FILE = path.join(DATA_DIR, "experiments.json");

export interface ExperimentRecord {
  id: string;
  hypothesis: string;
  title: string;
  subject: string;
  duration: string;
  scope: string;
  timestamp: string;
  provider: string;
  finalInsight: string;
  keywords: string[];
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadHistory(): ExperimentRecord[] {
  ensureDataDir();
  if (!fs.existsSync(HISTORY_FILE)) return [];
  try {
    const raw = fs.readFileSync(HISTORY_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveHistory(records: ExperimentRecord[]) {
  ensureDataDir();
  // Keep at most 100 records
  const trimmed = records.slice(-100);
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(trimmed, null, 2), "utf-8");
}

/** Save a new experiment record after a successful run */
export function saveExperiment(record: ExperimentRecord) {
  const history = loadHistory();
  // Avoid exact duplicates
  const exists = history.find((r) => r.id === record.id);
  if (!exists) {
    history.push(record);
    saveHistory(history);
  }
}

/** Load the most recent experiments */
export function loadRecentExperiments(limit = 10): ExperimentRecord[] {
  const history = loadHistory();
  return history.slice(-limit).reverse();
}

/** Search history for experiments similar to the given hypothesis */
export function searchSimilarExperiments(
  hypothesis: string,
  limit = 5
): ExperimentRecord[] {
  const history = loadHistory();
  const terms = hypothesis
    .replace(/[如果假如假设要是会发生什么会怎样如何怎么办？?。.！!~～]/g, "")
    .split(/\s+/)
    .filter((t) => t.length >= 2);

  const scored = history.map((r) => {
    let score = 0;
    const haystack = `${r.hypothesis} ${r.title} ${r.subject} ${r.keywords.join(" ")}`;
    for (const term of terms) {
      if (haystack.includes(term)) score += 1;
    }
    return { record: r, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.record);
}

/** Extract keywords from hypothesis for indexing */
export function extractKeywords(hypothesis: string): string[] {
  return hypothesis
    .replace(/[如果假如假设要是会发生什么会怎样如何怎么办？?。.！!~～,，\s]+/g, " ")
    .split(" ")
    .filter((w) => w.length >= 2 && w.length <= 10)
    .slice(0, 8);
}