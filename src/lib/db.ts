
import { Pool } from 'pg';

let pool: Pool;

if (process.env.POSTGRES_URL) {
  pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
  });
} else {
  // Configuración para entorno local o de desarrollo sin URL de conexión
  pool = new Pool({
    user: 'postgres', // Usuario por defecto de postgres
    host: 'localhost',
    database: 'postgres', // Base de datos por defecto de postgres
    password: 'postgres', // Contraseña común para instalaciones locales
    port: 5432, // Puerto por defecto de postgres
  });
}

export const query = (text: string, params: (string | number | boolean | Date | null)[]) => pool.query(text, params);
