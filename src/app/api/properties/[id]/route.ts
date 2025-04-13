// app/api/properties/[id]/route.ts
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Implemente a lógica para buscar o imóvel do seu banco de dados
  const property = await db.property.findUnique({
    where: { id: params.id },
  });

  if (!property) {
    return NextResponse.json({ error: 'Property not found' }, { status: 404 });
  }

  return NextResponse.json(property);
}