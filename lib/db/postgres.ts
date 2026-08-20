import { Pool } from "pg";

const globalForPostgres = globalThis as unknown as {
  postgresPool?: Pool;
};

export const postgresPool =
  globalForPostgres.postgresPool ??
  new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 5432),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 10,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPostgres.postgresPool = postgresPool;
}
