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
  felt: boolean | null;
  report_url: string | null;
  image_url: string | null;
}

export interface RecentEarthquakeFilters {
  minMagnitude?: number;
  feltOnly?: boolean;
  limit?: number;
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
    felt: row.felt === true,
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
          felt,
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

const getCachedFilteredRecentEarthquakes = unstable_cache(
  async (
    minMagnitude: number | null,
    feltOnly: boolean,
    limit: number,
  ) => {
    const conditions: string[] = [];
    const values: number[] = [];

    if (minMagnitude !== null) {
      values.push(minMagnitude);
      conditions.push(`magnitude >= $${values.length}`);
    }

    if (feltOnly) {
      conditions.push("felt IS TRUE");
    }

    values.push(limit);

    const whereClause =
      conditions.length > 0
        ? `WHERE ${conditions.join(" AND ")}`
        : "";

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
          felt,
          report_url,
          image_url
        FROM earthquakes
        ${whereClause}
        ORDER BY local_datetime DESC
        LIMIT $${values.length}
      `,
      values,
    );

    return result.rows.map(rowToEarthquake);
  },
  ["postgres-filtered-recent-earthquakes"],
  {
    revalidate: EARTHQUAKE_REVALIDATE_SECONDS,
    tags: ["postgres-recent-earthquakes"],
  },
);

export async function fetchRecentEarthquakes() {
  return getCachedRecentEarthquakes();
}

export async function fetchFilteredRecentEarthquakes({
  minMagnitude,
  feltOnly = false,
  limit = 15,
}: RecentEarthquakeFilters = {}) {
  const safeLimit = Math.min(Math.max(limit, 1), 50);

  return getCachedFilteredRecentEarthquakes(
    typeof minMagnitude === "number" ? minMagnitude : null,
    feltOnly,
    safeLimit,
  );
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
        felt,
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


interface Earthquake24HourStatsRow {
  total: number;
  max_magnitude: string | null;
  max_magnitude_id: string | null;
  felt_count: number;
}

export interface Earthquake24HourStats {
  total: number;
  maxMagnitude: number | null;
  maxMagnitudeId: string | null;
  feltCount: number;
}

export async function fetchEarthquake24HourStats(): Promise<Earthquake24HourStats> {
  const result =
    await postgresPool.query<Earthquake24HourStatsRow>(
      `
        WITH recent AS (
          SELECT
            id,
            local_datetime,
            magnitude,
            felt
          FROM earthquakes
          WHERE local_datetime >=
            (CURRENT_TIMESTAMP AT TIME ZONE 'America/Santiago')
            - INTERVAL '24 hours'
        ),
        highest AS (
          SELECT
            id,
            magnitude
          FROM recent
          ORDER BY magnitude DESC, local_datetime DESC
          LIMIT 1
        )
        SELECT
          (SELECT COUNT(*)::int FROM recent) AS total,
          (SELECT magnitude::text FROM highest) AS max_magnitude,
          (SELECT id::text FROM highest) AS max_magnitude_id,
          (
            SELECT COUNT(*)::int
            FROM recent
            WHERE felt IS TRUE
          ) AS felt_count
      `,
    );

  const row = result.rows[0];

  return {
    total: row?.total ?? 0,
    maxMagnitude:
      row?.max_magnitude !== null &&
      row?.max_magnitude !== undefined
        ? Number(row.max_magnitude)
        : null,
    maxMagnitudeId: row?.max_magnitude_id ?? null,
    feltCount: row?.felt_count ?? 0,
  };
}


interface EarthquakeHourlyActivityRow {
  bucket: number;
  label: string;
  total: number;
}

export interface EarthquakeHourlyActivity {
  bucket: number;
  label: string;
  total: number;
}

export async function fetchEarthquakeHourlyActivity(): Promise<
  EarthquakeHourlyActivity[]
> {
  const result =
    await postgresPool.query<EarthquakeHourlyActivityRow>(
      `
        WITH params AS (
          SELECT
            CURRENT_TIMESTAMP AT TIME ZONE 'America/Santiago' AS end_time,
            (CURRENT_TIMESTAMP AT TIME ZONE 'America/Santiago')
              - INTERVAL '24 hours' AS start_time
        ),
        buckets AS (
          SELECT generate_series(0, 23) AS bucket
        ),
        counts AS (
          SELECT
            LEAST(
              23,
              FLOOR(
                EXTRACT(
                  EPOCH FROM (
                    e.local_datetime - p.start_time
                  )
                ) / 3600
              )::int
            ) AS bucket,
            COUNT(*)::int AS total
          FROM earthquakes e
          CROSS JOIN params p
          WHERE e.local_datetime >= p.start_time
            AND e.local_datetime <= p.end_time
          GROUP BY 1
        )
        SELECT
          b.bucket,
          TO_CHAR(
            p.start_time + (b.bucket * INTERVAL '1 hour'),
            'HH24:MI'
          ) AS label,
          COALESCE(c.total, 0)::int AS total
        FROM buckets b
        CROSS JOIN params p
        LEFT JOIN counts c
          ON c.bucket = b.bucket
        ORDER BY b.bucket ASC
      `,
    );

  return result.rows;
}
