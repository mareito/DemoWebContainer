
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM prestamos');
    client.release();
    return NextResponse.json(result.rows);
  } catch {
    return NextResponse.json({ error: 'Error fetching loans' }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
        const { id_usuario, id_libro, fecha_prestamo, fecha_devolucion_esperada, estado } = await request.json();
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO prestamos (id_usuario, id_libro, fecha_prestamo, fecha_devolucion_esperada, estado) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [id_usuario, id_libro, fecha_prestamo, fecha_devolucion_esperada, estado]
        );
        client.release();
        return NextResponse.json(result.rows[0]);
    } catch {
        return NextResponse.json({ error: 'Error creating loan' }, { status: 500 });
    }
}
