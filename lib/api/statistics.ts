import { postgresPool } from "@/lib/db/postgres";
import { normalizePlaceDirection } from "@/lib/utils/place-normalizer";

export type StatisticsPeriod =
  | "7d"
  | "30d"
  | "1y"
  | "historico";

export interface StatisticsSummary {
  total: number;
  maxMagnitude: number | null;
  maxMagnitudeId: string | null;
  feltCount: number;
  averageDepth: number | null;
}

interface StatisticsSummaryRow {
  total: number;
  max_magnitude: string | null;
  max_magnitude_id: string | null;
  felt_count: number;
  average_depth: string | null;
}

export const statisticsPeriods = [
  {
    label: "7 días",
    value: "7d",
  },
  {
    label: "30 días",
    value: "30d",
  },
  {
    label: "1 año",
    value: "1y",
  },
  {
    label: "Histórico",
    value: "historico",
  },
] as const;

export function parseStatisticsPeriod(
  value: string | undefined,
): StatisticsPeriod {
  if (
    value === "7d" ||
    value === "30d" ||
    value === "1y" ||
    value === "historico"
  ) {
    return value;
  }

  return "30d";
}

function getPeriodWhereClause(
  period: StatisticsPeriod,
) {
  switch (period) {
    case "7d":
      return `
        WHERE local_datetime >=
          (CURRENT_TIMESTAMP AT TIME ZONE 'America/Santiago')
          - INTERVAL '7 days'
      `;

    case "1y":
      return `
        WHERE local_datetime >=
          (CURRENT_TIMESTAMP AT TIME ZONE 'America/Santiago')
          - INTERVAL '1 year'
      `;

    case "historico":
      return "";

    case "30d":
    default:
      return `
        WHERE local_datetime >=
          (CURRENT_TIMESTAMP AT TIME ZONE 'America/Santiago')
          - INTERVAL '30 days'
      `;
  }
}

export async function fetchStatisticsSummary(
  period: StatisticsPeriod,
): Promise<StatisticsSummary> {
  const whereClause = getPeriodWhereClause(period);

  const result =
    await postgresPool.query<StatisticsSummaryRow>(
      `
        WITH filtered AS (
          SELECT
            id,
            local_datetime,
            magnitude,
            depth_km,
            felt
          FROM earthquakes
          ${whereClause}
        ),
        highest AS (
          SELECT
            id,
            magnitude
          FROM filtered
          ORDER BY magnitude DESC, local_datetime DESC
          LIMIT 1
        )
        SELECT
          (
            SELECT COUNT(*)::int
            FROM filtered
          ) AS total,

          (
            SELECT magnitude::text
            FROM highest
          ) AS max_magnitude,

          (
            SELECT id::text
            FROM highest
          ) AS max_magnitude_id,

          (
            SELECT COUNT(*)::int
            FROM filtered
            WHERE felt IS TRUE
          ) AS felt_count,

          (
            SELECT
              ROUND(AVG(depth_km)::numeric, 1)::text
            FROM filtered
            WHERE depth_km IS NOT NULL
          ) AS average_depth
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

    maxMagnitudeId:
      row?.max_magnitude_id ?? null,

    feltCount:
      row?.felt_count ?? 0,

    averageDepth:
      row?.average_depth !== null &&
      row?.average_depth !== undefined
        ? Number(row.average_depth)
        : null,
  };
}

interface StatisticsActivityRow {
  bucket_index: number;
  bucket_start: Date;
  total: number;
}

export interface StatisticsActivityPoint {
  index: number;
  label: string;
  total: number;
}

function formatActivityLabel(
  date: Date,
  period: StatisticsPeriod,
) {
  if (period === "historico") {
    return new Intl.DateTimeFormat("es-CL", {
      year: "numeric",
      timeZone: "America/Santiago",
    }).format(date);
  }

  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "short",
    timeZone: "America/Santiago",
  })
    .format(date)
    .replace(".", "");
}

async function fetchHistoricalActivity(): Promise<
  StatisticsActivityPoint[]
> {
  const result =
    await postgresPool.query<StatisticsActivityRow>(
      `
        WITH bounds AS (
          SELECT
            DATE_TRUNC('year', MIN(local_datetime)) AS start_time,
            DATE_TRUNC('year', MAX(local_datetime)) AS end_time
          FROM earthquakes
        ),
        buckets AS (
          SELECT
            ROW_NUMBER() OVER (ORDER BY bucket_start) - 1 AS bucket_index,
            bucket_start
          FROM bounds
          CROSS JOIN LATERAL GENERATE_SERIES(
            start_time,
            end_time,
            INTERVAL '1 year'
          ) AS bucket_start
        )
        SELECT
          b.bucket_index::int,
          b.bucket_start,
          COUNT(e.id)::int AS total
        FROM buckets b
        LEFT JOIN earthquakes e
          ON e.local_datetime >= b.bucket_start
          AND e.local_datetime <
            b.bucket_start + INTERVAL '1 year'
        GROUP BY
          b.bucket_index,
          b.bucket_start
        ORDER BY b.bucket_start ASC
      `,
    );

  return result.rows.map((row) => ({
    index: row.bucket_index,
    label: formatActivityLabel(
      row.bucket_start,
      "historico",
    ),
    total: row.total,
  }));
}

export async function fetchStatisticsActivity(
  period: StatisticsPeriod,
): Promise<StatisticsActivityPoint[]> {
  if (period === "historico") {
    return fetchHistoricalActivity();
  }

  const config =
    period === "7d"
      ? {
          bucketCount: 7,
          bucketInterval: "INTERVAL '1 day'",
          startInterval: "INTERVAL '7 days'",
        }
      : period === "30d"
        ? {
            bucketCount: 30,
            bucketInterval: "INTERVAL '1 day'",
            startInterval: "INTERVAL '30 days'",
          }
        : {
            bucketCount: 53,
            bucketInterval: "INTERVAL '7 days'",
            startInterval: "INTERVAL '1 year'",
          };

  const result =
    await postgresPool.query<StatisticsActivityRow>(
      `
        WITH params AS (
          SELECT
            CURRENT_TIMESTAMP AT TIME ZONE 'America/Santiago'
              AS end_time,
            (
              CURRENT_TIMESTAMP AT TIME ZONE 'America/Santiago'
            ) - ${config.startInterval}
              AS start_time
        ),
        buckets AS (
          SELECT
            bucket_index,
            p.start_time
              + (
                  bucket_index
                  * ${config.bucketInterval}
                ) AS bucket_start,
            p.start_time
              + (
                  (bucket_index + 1)
                  * ${config.bucketInterval}
                ) AS bucket_end
          FROM params p
          CROSS JOIN GENERATE_SERIES(
            0,
            ${config.bucketCount - 1}
          ) AS bucket_index
        )
        SELECT
          b.bucket_index::int,
          b.bucket_start,
          COUNT(e.id)::int AS total
        FROM buckets b
        CROSS JOIN params p
        LEFT JOIN earthquakes e
          ON e.local_datetime >= b.bucket_start
          AND e.local_datetime <
            LEAST(
              b.bucket_end,
              p.end_time
            )
        GROUP BY
          b.bucket_index,
          b.bucket_start
        ORDER BY b.bucket_index ASC
      `,
    );

  return result.rows.map((row) => ({
    index: row.bucket_index,
    label: formatActivityLabel(
      row.bucket_start,
      period,
    ),
    total: row.total,
  }));
}

interface StatisticsDistributionsRow {
  magnitude_total: number;
  magnitude_lt_3: number;
  magnitude_3_4: number;
  magnitude_4_5: number;
  magnitude_5_plus: number;

  depth_total: number;
  depth_0_30: number;
  depth_30_70: number;
  depth_70_150: number;
  depth_150_plus: number;
}

export interface StatisticsDistributionItem {
  label: string;
  count: number;
  percentage: number;
}

export interface StatisticsDistributionsData {
  magnitude: StatisticsDistributionItem[];
  depth: StatisticsDistributionItem[];
}

function calculatePercentage(
  count: number,
  total: number,
) {
  if (total === 0) {
    return 0;
  }

  return (count / total) * 100;
}

export async function fetchStatisticsDistributions(
  period: StatisticsPeriod,
): Promise<StatisticsDistributionsData> {
  const whereClause = getPeriodWhereClause(period);

  const result =
    await postgresPool.query<StatisticsDistributionsRow>(
      `
        WITH filtered AS (
          SELECT
            magnitude,
            depth_km
          FROM earthquakes
          ${whereClause}
        )
        SELECT
          COUNT(*) FILTER (
            WHERE magnitude IS NOT NULL
          )::int AS magnitude_total,

          COUNT(*) FILTER (
            WHERE magnitude < 3
          )::int AS magnitude_lt_3,

          COUNT(*) FILTER (
            WHERE magnitude >= 3
              AND magnitude < 4
          )::int AS magnitude_3_4,

          COUNT(*) FILTER (
            WHERE magnitude >= 4
              AND magnitude < 5
          )::int AS magnitude_4_5,

          COUNT(*) FILTER (
            WHERE magnitude >= 5
          )::int AS magnitude_5_plus,

          COUNT(*) FILTER (
            WHERE depth_km IS NOT NULL
          )::int AS depth_total,

          COUNT(*) FILTER (
            WHERE depth_km IS NOT NULL
              AND depth_km < 30
          )::int AS depth_0_30,

          COUNT(*) FILTER (
            WHERE depth_km >= 30
              AND depth_km < 70
          )::int AS depth_30_70,

          COUNT(*) FILTER (
            WHERE depth_km >= 70
              AND depth_km < 150
          )::int AS depth_70_150,

          COUNT(*) FILTER (
            WHERE depth_km >= 150
          )::int AS depth_150_plus

        FROM filtered
      `,
    );

  const row = result.rows[0];

  const magnitudeTotal =
    row?.magnitude_total ?? 0;

  const depthTotal =
    row?.depth_total ?? 0;

  const magnitudeCounts = [
    {
      label: "Menor a 3,0",
      count: row?.magnitude_lt_3 ?? 0,
    },
    {
      label: "3,0 – 3,9",
      count: row?.magnitude_3_4 ?? 0,
    },
    {
      label: "4,0 – 4,9",
      count: row?.magnitude_4_5 ?? 0,
    },
    {
      label: "5,0 o más",
      count: row?.magnitude_5_plus ?? 0,
    },
  ];

  const depthCounts = [
    {
      label: "0 – 29 km",
      count: row?.depth_0_30 ?? 0,
    },
    {
      label: "30 – 69 km",
      count: row?.depth_30_70 ?? 0,
    },
    {
      label: "70 – 149 km",
      count: row?.depth_70_150 ?? 0,
    },
    {
      label: "150 km o más",
      count: row?.depth_150_plus ?? 0,
    },
  ];

  return {
    magnitude: magnitudeCounts.map(
      (item) => ({
        ...item,
        percentage: calculatePercentage(
          item.count,
          magnitudeTotal,
        ),
      }),
    ),

    depth: depthCounts.map((item) => ({
      ...item,
      percentage: calculatePercentage(
        item.count,
        depthTotal,
      ),
    })),
  };
}

interface StatisticsTopEventRow {
  id: string;
  local_datetime: Date;
  place: string;
  magnitude: string;
  depth_km: string | null;
  felt: boolean | null;
}

export interface StatisticsTopEvent {
  id: string;
  occurredAt: Date;
  place: string;
  magnitude: number;
  depthKm: number | null;
  felt: boolean;
}

export async function fetchStatisticsTopEvents(
  period: StatisticsPeriod,
  limit = 5,
): Promise<StatisticsTopEvent[]> {
  const whereClause = getPeriodWhereClause(period);

  const safeLimit = Math.min(
    Math.max(limit, 1),
    10,
  );

  const result =
    await postgresPool.query<StatisticsTopEventRow>(
      `
        SELECT
          id,
          local_datetime,
          place,
          magnitude,
          depth_km,
          felt
        FROM earthquakes
        ${whereClause}
        ORDER BY
          magnitude DESC,
          local_datetime DESC
        LIMIT $1
      `,
      [safeLimit],
    );

  return result.rows.map((row) => ({
    id: String(row.id),
    occurredAt: row.local_datetime,
    place: normalizePlaceDirection(row.place),
    magnitude: Number(row.magnitude),
    depthKm:
      row.depth_km !== null
        ? Number(row.depth_km)
        : null,
    felt: row.felt === true,
  }));
}
