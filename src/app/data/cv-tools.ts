import { experiences } from "./experience";

function parseToolsCsv(csv: string): string[] {
  return csv
    .split(",")
    .map((tool) => tool.trim())
    .filter(Boolean);
}

function incrementToolCounts(counts: Map<string, number>, tools: Iterable<string>) {
  for (const tool of tools) {
    counts.set(tool, (counts.get(tool) ?? 0) + 1);
  }
}

/** Technologies from work experience only (not portfolio domain tags), sorted by usage. */
export function getCvToolsByFrequency(): string[] {
  const counts = new Map<string, number>();

  for (const experience of experiences) {
    incrementToolCounts(counts, parseToolsCsv(experience.tools));
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], undefined, { sensitivity: "base" }))
    .map(([tool]) => tool);
}

export const cvToolsByFrequency = getCvToolsByFrequency();
