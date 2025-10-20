
import { NextResponse, NextRequest } from 'next/server';
import pool from '@/lib/db';

// GET para un solo libro (si es necesario)
export async function GET(request: NextRequest, context: { params: { id: string } }) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM libros WHERE id_libro = $1', [context.params.id]);
    client.release();
    if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch {
    return NextResponse.json({ error: 'Error fetching book' }, { status: 500 });
  }
}

// PUT para actualizar un libro
export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  try {
    const { titulo, autor, genero, anio_publicacion } = await request.json();
    const client = await pool.connect();
    const result = await client.query(
      'UPDATE libros SET titulo = $1, autor = $2, genero = $3, anio_publicacion = $4 WHERE id_libro = $5 RETURNING *',
      [titulo, autor, genero, anio_publicacion, context.params.id]
    );
    client.release();

    if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch {
    return NextResponse.json({ error: 'Error updating book' }, { status: 500 });
  }
}

// DELETE para eliminar un libro
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  try {
    const client = await pool.connect();
    await client.query('DELETE FROM libros WHERE id_libro = $1', [context.params.id]);
    client.release();
    return new NextResponse(null, { status: 204 }); // No Content
  } catch {
    return NextResponse.json({ error: 'Error deleting book' }, { status: 500 });
  }
}
