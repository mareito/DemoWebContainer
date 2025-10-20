
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM usuarios');
    client.release();
    return NextResponse.json(result.rows);
  } catch {
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
        const { nombre, apellido, email, fecha_registro } = await request.json();
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO usuarios (nombre, apellido, email, fecha_registro) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, apellido, email, fecha_registro]
        );
        client.release();
        return NextResponse.json(result.rows[0]);
    } catch {
        return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
    }
}
