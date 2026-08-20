import dotenv from "dotenv";

dotenv.config({ path: ".env.scraper" });

import { Pool } from "pg";

import {
  saveEarthquakes,
  scrapeDay,
} from "./lib/csn-earthquakes";

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

function getChileDate(
  offsetDays = 0,
) {
  const now = new Date();

  const chileDate = new Intl.DateTimeFormat(
    "en-CA",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "America/Santiago",
    },
  ).format(now);

  const [year, month, day] = chileDate
    .split("-")
    .map(Number);

  const date = new Date(
    Date.UTC(year, month - 1, day),
  );

  date.setUTCDate(
    date.getUTCDate() + offsetDays,
  );

  const resultYear = date.getUTCFullYear();

  const resultMonth = String(
    date.getUTCMonth() + 1,
  ).padStart(2, "0");

  const resultDay = String(
    date.getUTCDate(),
  ).padStart(2, "0");

  return `${resultYear}-${resultMonth}-${resultDay}`;
}

async function updateDay(date: string) {
  console.log(`Consultando ${date}...`);

  const earthquakes =
    await scrapeDay(date);

  if (earthquakes === null) {
    console.log(
      `   Catálogo ${date} no disponible.`,
    );

    return {
      events: 0,
      felt: 0,
    };
  }

  await saveEarthquakes(
    pool,
    earthquakes,
  );

  const felt =
    earthquakes.filter(
      (earthquake) =>
        earthquake.felt,
    ).length;

  console.log(
    `   ${earthquakes.length} eventos | ${felt} percibidos`,
  );

  return {
    events: earthquakes.length,
    felt,
  };
}

async function main() {
  const today = getChileDate();
  const yesterday = getChileDate(-1);

  console.log("");
  console.log(
    "==========================================",
  );
  console.log(
    " Pulso Sísmico - Actualización CSN",
  );
  console.log(
    "==========================================",
  );
  console.log("");

  console.log(`Hoy: ${today}`);
  console.log(`Ayer: ${yesterday}`);
  console.log("");

  try {
    /*
     * Consultamos ayer primero.
     *
     * Así capturamos posibles correcciones
     * realizadas por el CSN.
     */
    const yesterdayResult =
      await updateDay(yesterday);

    /*
     * Luego actualizamos el catálogo actual.
     */
    const todayResult =
      await updateDay(today);

    const result = await pool.query<{
      total: string;
    }>(
      "SELECT COUNT(*) AS total FROM earthquakes",
    );

    console.log("");
    console.log(
      "==========================================",
    );
    console.log(
      " Actualización terminada",
    );
    console.log(
      "==========================================",
    );
    console.log("");

    console.log(
      `Eventos procesados: ${
        yesterdayResult.events +
        todayResult.events
      }`,
    );

    console.log(
      `Percibidos encontrados: ${
        yesterdayResult.felt +
        todayResult.felt
      }`,
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
  console.error("");
  console.error(
    "Error actualizando sismos:",
  );

  console.error(error);

  process.exitCode = 1;
});
