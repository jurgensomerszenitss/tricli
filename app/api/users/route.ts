// import type { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "@/app/lib/commands";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== "POST") {
//         return res.status(405).end("Method Not Allowed");
//     }

//     if (!req.body.name || !req.body.email || !req.body.passwsord) {
//         return res.status(400).json({ error: 'Name, email and password are required' });
//     }

//     try {
//         const { email, name, password } = req.body
//         await createUser(email, name, password)
//         return res.status(201)
//     }
//     catch (err) {
//         console.error(err)
//     }

//     return res.status(500)
// }

// app/api/your-endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {

    const body = await request.json();
    // You can then process the JSON body, e.g., save to a database
    console.log(body);

    if (!body.name || !body.email || !body.password) {
        return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 });
    }

    try {
        const { email, name, password } = body
        await createUser(email, name, password)
        return NextResponse.json({}, { status: 201 });
    }
    catch (err) {
        console.error(err)
    }
    return NextResponse.json({}, { status: 500 });

}
