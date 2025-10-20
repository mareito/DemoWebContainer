/*
import { Pool } from "pg";

let pool: Pool | null = null;

if (process.env.POSTGRES_URL) {
  pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  });
} else {
  // Configuración para entorno local o de desarrollo sin URL de conexión
  pool = new Pool({
    user: "postgres", // Usuario por defecto de postgres
    host: "localhost",
    database: "contenedores", // Base de datos especificada por el usuario
    password: "admin", // Contraseña común para instalaciones locales
    port: 5432, // Puerto por defecto de postgres
  });
}

export const query = (
  text: string,
  params: (string | number | boolean | Date | null)[]
) => pool.query(text, params);
*/

import { Pool, PoolClient, QueryResult, QueryResultRow } from "pg";

let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432"),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    pool.on("error", (err: Error) => {
      console.error("Unexpected error on idle client", err);
    });
  }

  return pool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[]
): Promise<QueryResult<T>> {
  const pool = getPool();
  const start = Date.now();

  try {
    const res = await pool.query<T>(text, params);
    const duration = Date.now() - start;
    console.log("Executed query", { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function getClient(): Promise<PoolClient> {
  const pool = getPool();
  const client = await pool.connect();
  return client;
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
