// pages/api/materials/summary.ts
import path from 'path';
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import { Material } from '../../../types/material'; // Import the Material type (adjust path as necessary)

export async function GET(req: Request) {
  try {
    // Load the materials.json file
    const filePath = path.join(process.cwd(), 'public', 'data', 'materials.json');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const materials: Material[] = JSON.parse(fileContents);

    // Create a summary object containing material ids and titles
    const materialsSummary = materials.map((material) => ({
      id: material.id,
      title: material.title,
    }));

    // Calculate the total number of materials
    const totalMaterials = materials.length;

    // Return total count and list of materials (id and title)
    return NextResponse.json({
      total_materials: totalMaterials,
      materials: materialsSummary,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch materials summary' }, { status: 500 });
  }
}
