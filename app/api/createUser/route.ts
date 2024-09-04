import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const response = await fetch('https://g74e5eh8u7.execute-api.us-east-1.amazonaws.com/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.ok) {
            return NextResponse.json(data, { status: 201 });
        } else {
            return NextResponse.json(data, { status: response.status });
        }
    } catch (error) {
        console.error('Error calling Lambda function:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}