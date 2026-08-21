import type { Earthquake, EarthquakeApiItem } from "@/lib/types/earthquake";

export function extractEarthquakeId(reportUrl?: string) {
  if (!reportUrl) return null;
  const match = reportUrl.match(/\/(\d+)\.html(?:\?.*)?$/);
  return match?.[1] ?? null;
}

export function normalizeMagnitude(value: string) {
  const normalized = Number.parseFloat(value.trim().replace(",", "."));
  return Number.isFinite(normalized) ? normalized : null;
}

export function normalizeDepthKm(value: string) {
  const cleaned = value.replace(/[^\d.,-]/g, "").replace(",", ".");
  const normalized = Number.parseFloat(cleaned);
  return Number.isFinite(normalized) ? normalized : null;
}

export function normalizeCoordinate(value: string) {
  const normalized = Number.parseFloat(value.trim().replace(",", "."));
  return Number.isFinite(normalized) ? normalized : null;
}

export function combineDateAndHour(date: string, hour: string) {
  const trimmedDate = date.trim();
  const trimmedHour = hour.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmedDate)) return null;
  if (!/^\d{2}:\d{2}(:\d{2})?$/.test(trimmedHour)) return null;
  return `${trimmedDate}T${trimmedHour.length === 5 ? `${trimmedHour}:00` : trimmedHour}`;
}

function buildFallbackId(date: string, hour: string, latitude: number, longitude: number) {
  return `${date}-${hour}-${latitude.toFixed(2)}-${longitude.toFixed(2)}`;
}

export function normalizeEarthquake(item: EarthquakeApiItem): Earthquake | null {
  const occurredAt = combineDateAndHour(item.date, item.hour);
  const magnitude = normalizeMagnitude(item.magnitude);
  const latitude = normalizeCoordinate(item.latitude);
  const longitude = normalizeCoordinate(item.longitude);
  const depthKm = normalizeDepthKm(item.depth) ?? 0;

  if (!occurredAt || magnitude === null || latitude === null || longitude === null) return null;

  const reportUrl = item.info?.trim() ?? "";
  const imageUrl = item.image?.trim() ?? "";
  const id = extractEarthquakeId(reportUrl) ?? buildFallbackId(item.date, item.hour, latitude, longitude);

  return {
    id,
    occurredAt,
    date: item.date.trim(),
    hour: item.hour.trim().slice(0, 8),
    place: item.place.trim() || "Ubicación no informada",
    magnitude,
    depthKm,
    latitude,
    longitude,
    felt: false,
    imageUrl,
    reportUrl,
  };
}

export function sortEarthquakesNewestFirst(earthquakes: Earthquake[]) {
  return [...earthquakes].sort((left, right) => right.occurredAt.localeCompare(left.occurredAt));
}

export function normalizeEarthquakes(items: EarthquakeApiItem[]) {
  return sortEarthquakesNewestFirst(items.map(normalizeEarthquake).filter((item): item is Earthquake => item !== null));
}
