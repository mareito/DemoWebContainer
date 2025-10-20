
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query('SELECT * FROM libros', []);
    return NextResponse.json(result.rows);
  } catch {
    return NextResponse.json({ error: 'Error fetching books' }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
        const { titulo, autor, genero, ano_publicacion } = await request.json();
        const result = await query(
            'INSERT INTO libros (titulo, autor, genero, anio_publicacion) VALUES ($1, $2, $3, $4) RETURNING *',
            [titulo, autor, genero, ano_publicacion]
        );
        return NextResponse.json(result.rows[0]);
    } catch {
        return NextResponse.json({ error: 'Error creating book' }, { status: 500 });
    }
}
