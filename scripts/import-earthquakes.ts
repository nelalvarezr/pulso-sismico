import dotenv from "dotenv";

dotenv.config({ path: ".env.scraper" });

import { Pool } from "pg";

import {
  saveEarthquakes,
  scrapeDay,
} from "./lib/csn-earthquakes";

const REQUEST_DELAY_MS = 1000;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

function sleep(milliseconds: number) {
  return new Promise((resolve) =>
    setTimeout(resolve, milliseconds),
  );
}

function isValidDateString(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value
    .split("-")
    .map(Number);

  const date = new Date(
    Date.UTC(year, month - 1, day),
  );

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function parseDate(value: string) {
  const [year, month, day] = value
    .split("-")
    .map(Number);

  return new Date(
    Date.UTC(year, month - 1, day),
  );
}

function formatDate(date: Date) {
  const year = date.getUTCFullYear();

  const month = String(
    date.getUTCMonth() + 1,
  ).padStart(2, "0");

  const day = String(
    date.getUTCDate(),
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getDateRange(
  from: string,
  to: string,
) {
  const startDate = parseDate(from);
  const endDate = parseDate(to);

  const dates: string[] = [];

  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(formatDate(currentDate));

    currentDate.setUTCDate(
      currentDate.getUTCDate() + 1,
    );
  }

  return dates;
}

async function main() {
  const [, , fromArgument, toArgument] =
    process.argv;

  if (!fromArgument || !toArgument) {
    console.error("");
    console.error(
      "Debes indicar fecha desde y fecha hasta.",
    );
    console.error("");
    console.error("Ejemplo:");
    console.error(
      "npm run scrape:earthquakes -- 2020-01-01 2020-12-31",
    );

    process.exitCode = 1;

    return;
  }

  if (
    !isValidDateString(fromArgument) ||
    !isValidDateString(toArgument)
  ) {
    console.error(
      "Las fechas deben tener formato YYYY-MM-DD y ser válidas.",
    );

    process.exitCode = 1;

    return;
  }

  const fromDate = parseDate(fromArgument);
  const toDate = parseDate(toArgument);

  if (fromDate > toDate) {
    console.error(
      "La fecha inicial no puede ser posterior a la fecha final.",
    );

    process.exitCode = 1;

    return;
  }

  const dates = getDateRange(
    fromArgument,
    toArgument,
  );

  let events = 0;
  let felt = 0;
  let errors = 0;

  console.log("");
  console.log(
    "==========================================",
  );
  console.log(
    " Pulso Sísmico - Importador histórico CSN",
  );
  console.log(
    "==========================================",
  );
  console.log("");

  console.log(`Desde: ${fromArgument}`);
  console.log(`Hasta: ${toArgument}`);
  console.log(`Días: ${dates.length}`);
  console.log("");

  try {
    for (
      let index = 0;
      index < dates.length;
      index++
    ) {
      const date = dates[index];

      console.log(
        `[${index + 1}/${dates.length}] ${date}`,
      );

      try {
        const earthquakes =
          await scrapeDay(date);

        if (earthquakes === null) {
          console.log(
            "   Catálogo no disponible.",
          );

          continue;
        }

        await saveEarthquakes(
          pool,
          earthquakes,
        );

        const feltCount =
          earthquakes.filter(
            (earthquake) =>
              earthquake.felt,
          ).length;

        events += earthquakes.length;
        felt += feltCount;

        console.log(
          `   ${earthquakes.length} eventos | ${feltCount} percibidos`,
        );
      } catch (error) {
        errors++;

        console.error(
          `   Error procesando ${date}:`,
        );

        console.error(error);

        if (
          error instanceof Error &&
          (error.message.includes("HTTP 403") ||
            error.message.includes("HTTP 429"))
        ) {
          console.error(
            "Importación detenida.",
          );

          break;
        }
      }

      if (index < dates.length - 1) {
        await sleep(REQUEST_DELAY_MS);
      }
    }

    const result = await pool.query<{
      total: string;
    }>(
      "SELECT COUNT(*) AS total FROM earthquakes",
    );

    console.log("");
    console.log(
      "==========================================",
    );
    console.log(" Importación terminada");
    console.log(
      "==========================================",
    );
    console.log("");

    console.log(
      `Eventos encontrados:  ${events}`,
    );

    console.log(
      `Eventos percibidos:   ${felt}`,
    );

    console.log(
      `Errores:              ${errors}`,
    );

    console.log(
      `Registros totales BD: ${result.rows[0].total}`,
    );

    console.log("");
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(
    "Error general importando sismos:",
  );

  console.error(error);

  process.exitCode = 1;
});
