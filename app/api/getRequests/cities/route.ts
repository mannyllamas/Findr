import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/db'; // Adjust the path to your Prisma instance

// Named export for the GET method
export async function GET() {
  try {
    // Fetch all cities from the database, including related data
    const cities = await prisma.cities.findMany({
      include: {
        address: true,           // Include related address data
        company_cities: true,    // Include related company_cities data
        interns: true,           // Include related interns data
        persons: true,           // Include related persons data
        postal_codes: true,      // Include related postal_codes data
      },
    });

    // Return the cities as a JSON response
    return NextResponse.json(cities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    return NextResponse.json({ error: 'Failed to fetch cities' }, { status: 500 });
  }
}