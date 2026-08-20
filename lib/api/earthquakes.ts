import { unstable_cache } from "next/cache";

import { postgresPool } from "@/lib/db/postgres";
import type { Earthquake } from "@/lib/types/earthquake";
import { normalizePlaceDirection } from "@/lib/utils/place-normalizer";

export const EARTHQUAKE_REVALIDATE_SECONDS = 60;

interface EarthquakeRow {
  id: string;
  local_datetime: Date;
  place: string;
  magnitude: string;
  depth_km: string | null;
  latitude: string;
  longitude: string;
  report_url: string | null;
  image_url: string | null;
}

function formatDatePart(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "America/Santiago",
  }).format(date);
}

function formatHourPart(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "America/Santiago",
  }).format(date);
}

function rowToEarthquake(row: EarthquakeRow): Earthquake {
  const localDate = new Date(row.local_datetime);

  const date = formatDatePart(localDate);
  const hour = formatHourPart(localDate);

  return {
    id: String(row.id),
    occurredAt: `${date}T${hour}`,
    date,
    hour,
    place: normalizePlaceDirection(row.place),
    magnitude: Number(row.magnitude),
    depthKm: Number(row.depth_km ?? 0),
    latitude: Number(row.latitude),
    longitude: Number(row.longitude),
    imageUrl: row.image_url ?? "",
    reportUrl: row.report_url ?? "",
  };
}

const RECENT_LIMIT = 16;
const getCachedRecentEarthquakes = unstable_cache(
  async () => {
    const result = await postgresPool.query<EarthquakeRow>(
      `
        SELECT
          id,
          local_datetime,
          place,
          magnitude,
          depth_km,
          latitude,
          longitude,
          report_url,
          image_url
        FROM earthquakes
        ORDER BY local_datetime DESC
        LIMIT $1
      `,
      [RECENT_LIMIT],
    );

    return result.rows.map(rowToEarthquake);
  },
  ["postgres-recent-earthquakes"],
  {
    revalidate: EARTHQUAKE_REVALIDATE_SECONDS,
    tags: ["postgres-recent-earthquakes"],
  },
);

export async function fetchRecentEarthquakes() {
  return getCachedRecentEarthquakes();
}

export async function fetchEarthquakeById(id: string) {
  const result = await postgresPool.query<EarthquakeRow>(
    `
      SELECT
        id,
        local_datetime,
        place,
        magnitude,
        depth_km,
        latitude,
        longitude,
        report_url,
        image_url
      FROM earthquakes
      WHERE id = $1
      LIMIT 1
    `,
    [id],
  );

  const row = result.rows[0];

  return row ? rowToEarthquake(row) : null;
}

interface EarthquakeSitemapRow {
  id: string;
  local_datetime: Date;
}

interface EarthquakeSitemapYearRow {
  year: number;
}

export async function fetchEarthquakeSitemapYears() {
  const result =
    await postgresPool.query<EarthquakeSitemapYearRow>(
      `
        SELECT DISTINCT
          EXTRACT(YEAR FROM local_datetime)::int AS year
        FROM earthquakes
        ORDER BY year ASC
      `,
    );

  return result.rows.map((row) => row.year);
}

export async function fetchEarthquakesForSitemapByYear(
  year: number,
) {
  const result =
    await postgresPool.query<EarthquakeSitemapRow>(
      `
        SELECT
          id,
          local_datetime
        FROM earthquakes
        WHERE local_datetime >= $1
          AND local_datetime < $2
        ORDER BY local_datetime DESC
      `,
      [
        `${year}-01-01 00:00:00`,
        `${year + 1}-01-01 00:00:00`,
      ],
    );

  return result.rows.map((row) => ({
    id: String(row.id),
    occurredAt: row.local_datetime,
  }));
}
