import path from 'path';
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import { Material } from '../../types/material'; // Adjust the import path for Material type

// GET handler for fetching material data
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Invalid or missing id' }, { status: 400 });
  }

  try {
    // Load the materials.json file
    const filePath = path.join(process.cwd(), 'public', 'data', 'materials.json');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const materials: Material[] = JSON.parse(fileContents);

    // Find the requested material
    const material = materials.find((item) => item.id === parseInt(id, 10));

    if (!material) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 });
    }

    return NextResponse.json(material);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch material' }, { status: 500 });
  }
}
