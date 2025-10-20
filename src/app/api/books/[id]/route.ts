
import { NextResponse, NextRequest } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const result = await query('SELECT * FROM libros WHERE id_libro = $1', [id]);
    if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch {
    return NextResponse.json({ error: 'Error fetching book' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { titulo, autor, genero, ano_publicacion } = await request.json();
    const result = await query(
      'UPDATE libros SET titulo = $1, autor = $2, genero = $3, anio_publicacion = $4 WHERE id_libro = $5 RETURNING *',
      [titulo, autor, genero, ano_publicacion, id]
    );

    if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch {
    return NextResponse.json({ error: 'Error updating book' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await query('DELETE FROM libros WHERE id_libro = $1', [id]);
    return new NextResponse(null, { status: 204 }); // No Content
  } catch {
    return NextResponse.json({ error: 'Error deleting book' }, { status: 500 });
  }
}
