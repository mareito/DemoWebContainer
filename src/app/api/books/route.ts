
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM libros');
    client.release();
    return NextResponse.json(result.rows);
  } catch {
    return NextResponse.json({ error: 'Error fetching books' }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
        const { titulo, autor, genero, ano_publicacion } = await request.json();
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO libros (titulo, autor, genero, ano_publicacion) VALUES ($1, $2, $3, $4) RETURNING *',
            [titulo, autor, genero, ano_publicacion]
        );
        client.release();
        return NextResponse.json(result.rows[0]);
    } catch {
        return NextResponse.json({ error: 'Error creating book' }, { status: 500 });
    }
}
