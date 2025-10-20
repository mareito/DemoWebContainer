
import { NextResponse, NextRequest } from 'next/server';
import pool from '@/lib/db';

// Función DELETE existente
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  try {
    const client = await pool.connect();
    await client.query('DELETE FROM usuarios WHERE id_usuario = $1', [context.params.id]);
    client.release();
    return new NextResponse(null, { status: 204 }); // No Content
  } catch {
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
  }
}

// Nueva función PUT para actualizar
export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  try {
    const { nombre, apellido, email } = await request.json();
    const client = await pool.connect();
    const result = await client.query(
      'UPDATE usuarios SET nombre = $1, apellido = $2, email = $3 WHERE id_usuario = $4 RETURNING *',
      [nombre, apellido, email, context.params.id]
    );
    client.release();

    if (result.rows.length === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch {
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
  }
}
