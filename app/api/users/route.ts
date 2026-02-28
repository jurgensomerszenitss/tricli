import { createUser } from "@/app/lib/commands";
 
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {

    const body = await request.json(); 

    if (!body.name || !body.email || !body.password) {
        return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 });
    }

    try {
        const { email, name, password } = body
        await createUser(email, name, password)
        console.log(`User ${name} - ${email} created`)
        return NextResponse.json({}, { status: 201 });
    }
    catch (err) {
        console.error(err)
    }
    return NextResponse.json({}, { status: 500 });

}
