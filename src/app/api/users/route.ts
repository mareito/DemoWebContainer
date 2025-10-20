
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query('SELECT * FROM usuarios', []);
    return NextResponse.json(result.rows);
  } catch {
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
        const { nombre, apellido, email, fecha_registro } = await request.json();
        const result = await query(
            'INSERT INTO usuarios (nombre, apellido, email, fecha_registro) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, apellido, email, fecha_registro]
        );
        return NextResponse.json(result.rows[0]);
    } catch {
        return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
    }
}
