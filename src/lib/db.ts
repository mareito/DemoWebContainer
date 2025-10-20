
import { Pool } from 'pg';

let pool: Pool;

if (process.env.POSTGRES_URL) {
  pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  });
} else {
  // Manejo para entorno local o de desarrollo sin URL de conexión
  pool = new Pool({
    // Configuración para entorno local
  });
}

export const query = (text: string, params: (string | number | boolean | Date | null)[]) => pool.query(text, params);
