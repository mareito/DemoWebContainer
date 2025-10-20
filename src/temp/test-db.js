import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "contenedores",
  user: "postgres",
  password: "admin",
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log("✅ Conexión exitosa a PostgreSQL");

    const result = await client.query("SELECT NOW()");
    console.log("⏰ Hora del servidor:", result.rows[0].now);

    const tables = await client.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
    `);
    console.log("📋 Tablas:", tables.rows);

    client.release();
    await pool.end();
  } catch (error) {
    console.error("❌ Error de conexión:", error.message);
    console.error("Detalles:", error);
  }
}

testConnection();
