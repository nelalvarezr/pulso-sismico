import { unstable_cache } from "next/cache";

import type { Earthquake, EarthquakeApiResponse, LatestEarthquakeApiResponse } from "@/lib/types/earthquake";
import { normalizeEarthquake, normalizeEarthquakes } from "@/lib/utils/earthquake-normalizer";

const API_TIMEOUT_MS = 8000;
const RECENT_EARTHQUAKES_URL = "https://api.boostr.cl/earthquakes/recent.json";
const LATEST_EARTHQUAKE_URL = "https://api.boostr.cl/earthquake.json";
export const EARTHQUAKE_REVALIDATE_SECONDS = 60;

async function fetchJson<T>(url: string, tag: string): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      cache: "force-cache",
      headers: { Accept: "application/json" },
      next: { revalidate: EARTHQUAKE_REVALIDATE_SECONDS, tags: [tag] },
      signal: controller.signal,
    });

    if (!response.ok) throw new Error(`La API respondió con ${response.status}`);
    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

const getCachedRecentApiResponse = unstable_cache(
  async () => fetchJson<EarthquakeApiResponse>(RECENT_EARTHQUAKES_URL, "boostr-recent-earthquakes"),
  ["boostr-recent-earthquakes"],
  { revalidate: EARTHQUAKE_REVALIDATE_SECONDS, tags: ["boostr-recent-earthquakes"] },
);

const getCachedLatestApiResponse = unstable_cache(
  async () => fetchJson<LatestEarthquakeApiResponse>(LATEST_EARTHQUAKE_URL, "boostr-latest-earthquake"),
  ["boostr-latest-earthquake"],
  { revalidate: EARTHQUAKE_REVALIDATE_SECONDS, tags: ["boostr-latest-earthquake"] },
);

function mergeUniqueEarthquakes(earthquakes: Earthquake[]) {
  const seen = new Map<string, Earthquake>();
  for (const earthquake of earthquakes) {
    if (!seen.has(earthquake.id)) seen.set(earthquake.id, earthquake);
  }
  return [...seen.values()].sort((left, right) => right.occurredAt.localeCompare(left.occurredAt));
}

export async function fetchRecentEarthquakes() {
  const [recentResult, latestResult] = await Promise.allSettled([getCachedRecentApiResponse(), getCachedLatestApiResponse()]);

  const recentEarthquakes =
    recentResult.status === "fulfilled" ? normalizeEarthquakes(recentResult.value.data ?? []) : [];

  const latestEarthquake =
    latestResult.status === "fulfilled" && latestResult.value.data ? normalizeEarthquake(latestResult.value.data) : null;

  return mergeUniqueEarthquakes(latestEarthquake ? [latestEarthquake, ...recentEarthquakes] : recentEarthquakes);
}

export async function fetchEarthquakeById(id: string) {
  const earthquakes = await fetchRecentEarthquakes();
  return earthquakes.find((earthquake) => earthquake.id === id) ?? null;
}
