import * as cheerio from "cheerio";
import type { Pool } from "pg";

export const CSN_BASE_URL = "https://sismologia.cl";

export interface ScrapedEarthquake {
  id: number;
  localDatetime: string;
  utcDatetime: string;
  place: string;
  latitude: number;
  longitude: number;
  depthKm: number | null;
  magnitude: number;
  magnitudeType: string | null;
  felt: boolean;
  reportUrl: string;
}

function cleanText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function parseNumber(value: string) {
  const parsed = Number.parseFloat(value.replace(",", "."));

  return Number.isFinite(parsed) ? parsed : null;
}

export async function scrapeDay(
  date: string,
): Promise<ScrapedEarthquake[] | null> {
  const [year, month, day] = date.split("-");

  const url =
    `${CSN_BASE_URL}/sismicidad/catalogo/` +
    `${year}/${month}/${year}${month}${day}.html`;

  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "PulsoSismico/1.0 (earthquake data importer)",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });

  if (response.status === 404) {
    return null;
  }

  if (response.status === 403 || response.status === 429) {
    throw new Error(
      `CSN respondió HTTP ${response.status}. Se detiene la consulta para evitar insistir al servidor.`,
    );
  }

  if (!response.ok) {
    throw new Error(
      `CSN respondió HTTP ${response.status} para ${url}`,
    );
  }

  const html = await response.text();

  const $ = cheerio.load(html);

  const earthquakes: ScrapedEarthquake[] = [];

  $("table.sismologia.detalle tr").each((_, row) => {
    const cells = $(row).find("td");

    if (cells.length < 5) {
      return;
    }

    const firstCell = cells.eq(0);

    const reportHref = firstCell.find("a").attr("href");

    if (!reportHref) {
      return;
    }

    const idMatch = reportHref.match(/\/(\d+)\.html$/);

    if (!idMatch) {
      console.warn(
        `No se pudo obtener ID desde ${reportHref}`,
      );

      return;
    }

    const id = Number(idMatch[1]);

    const localDatetime = cleanText(
      firstCell.find("a").text(),
    );

    const placeCell = firstCell.clone();

    placeCell.find("a").remove();

    const place = cleanText(placeCell.text());

    const utcDatetime = cleanText(
      cells.eq(1).text(),
    );

    const coordinatesText = cleanText(
      cells.eq(2).text(),
    );

    const coordinateMatches = coordinatesText.match(
      /(-?\d+(?:[.,]\d+)?)\s+(-?\d+(?:[.,]\d+)?)/,
    );

    if (!coordinateMatches) {
      console.warn(
        `Coordenadas inválidas para sismo ${id}`,
      );

      return;
    }

    const latitude = parseNumber(
      coordinateMatches[1],
    );

    const longitude = parseNumber(
      coordinateMatches[2],
    );

    const depthText = cleanText(
      cells.eq(3).text(),
    );

    const depthKm = parseNumber(depthText);

    const magnitudeText = cleanText(
      cells.eq(4).text(),
    );

    const magnitudeMatch = magnitudeText.match(
      /^(-?\d+(?:[.,]\d+)?)\s*(.*)$/,
    );

    if (!magnitudeMatch) {
      console.warn(
        `Magnitud inválida para sismo ${id}`,
      );

      return;
    }

    const magnitude = parseNumber(
      magnitudeMatch[1],
    );

    const magnitudeType =
      cleanText(magnitudeMatch[2]) || null;

    if (
      latitude === null ||
      longitude === null ||
      magnitude === null
    ) {
      console.warn(
        `Datos numéricos inválidos para sismo ${id}`,
      );

      return;
    }

    earthquakes.push({
      id,
      localDatetime,
      utcDatetime,
      place,
      latitude,
      longitude,
      depthKm,
      magnitude,
      magnitudeType,
      felt: $(row).hasClass("percibido"),
      reportUrl: new URL(
        reportHref,
        CSN_BASE_URL,
      ).toString(),
    });
  });

  return earthquakes;
}

export async function saveEarthquakes(
  pool: Pool,
  earthquakes: ScrapedEarthquake[],
) {
  if (earthquakes.length === 0) {
    return;
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    for (const earthquake of earthquakes) {
      await client.query(
        `
          INSERT INTO earthquakes (
            id,
            local_datetime,
            utc_datetime,
            place,
            latitude,
            longitude,
            depth_km,
            magnitude,
            magnitude_type,
            felt,
            report_url,
            source
          )
          VALUES (
            $1, $2, $3, $4, $5, $6,
            $7, $8, $9, $10, $11, 'CSN'
          )

          ON CONFLICT (id)

          DO UPDATE SET
            local_datetime = EXCLUDED.local_datetime,
            utc_datetime = EXCLUDED.utc_datetime,
            place = EXCLUDED.place,
            latitude = EXCLUDED.latitude,
            longitude = EXCLUDED.longitude,
            depth_km = EXCLUDED.depth_km,
            magnitude = EXCLUDED.magnitude,
            magnitude_type = EXCLUDED.magnitude_type,
            felt = EXCLUDED.felt,
            report_url = EXCLUDED.report_url,
            source = EXCLUDED.source,
            updated_at = NOW()
        `,
        [
          earthquake.id,
          earthquake.localDatetime,
          earthquake.utcDatetime,
          earthquake.place,
          earthquake.latitude,
          earthquake.longitude,
          earthquake.depthKm,
          earthquake.magnitude,
          earthquake.magnitudeType,
          earthquake.felt,
          earthquake.reportUrl,
        ],
      );
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");

    throw error;
  } finally {
    client.release();
  }
}
