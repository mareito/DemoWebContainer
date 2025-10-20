
import { NextResponse, NextRequest } from 'next/server';
import { query } from '@/lib/db';

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await query('DELETE FROM usuarios WHERE id_usuario = $1', [id]);
    return new NextResponse(null, { status: 204 }); // No Content
  } catch {
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { nombre, apellido, email } = await request.json();
    const result = await query(
      'UPDATE usuarios SET nombre = $1, apellido = $2, email = $3 WHERE id_usuario = $4 RETURNING *',
      [nombre, apellido, email, id]
    );

    if (result.rows.length === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch {
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
  }
}
