import prisma from '../../../../prisma/db'; // Adjust the path to your Prisma instance
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    const { first_name, last_name, email, phone_number, current_city, iso_housing, iso_roommate, person_type } = body;

    // Validate input
    if (!first_name || !last_name || !email || !person_type) {
      return NextResponse.json(
        { error: "Missing required fields: first_name, last_name, email, person_type" },
        { status: 400 }
      );
    }

    // Create a new person in the database
    const newPerson = await prisma.persons.create({
      data: {
        first_name,
        last_name,
        email,
        phone_number,
        current_city: current_city ? parseInt(current_city) : null,
        iso_housing: iso_housing ?? false,
        iso_roommate: iso_roommate ?? false,
        person_type,
      },
    });

    // Respond with the created person
    return NextResponse.json(newPerson, { status: 201 });
  } catch (error) {
    console.error("Error creating person:", error);
    return NextResponse.json(
      { error: "Failed to create person. Check the input data." },
      { status: 500 }
    );
  }
}
