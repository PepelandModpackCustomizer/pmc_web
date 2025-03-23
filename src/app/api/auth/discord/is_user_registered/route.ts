import {NextRequest, NextResponse} from "next/server";
import { neon } from '@neondatabase/serverless';

export async function POST(req: NextRequest) {
    const reqBody = await req.json()
    const user_id = reqBody["user_id"]
    if (!user_id) {
        return NextResponse.json({}, {status: 500})
    }
    const sql = neon(`${process.env.DATABASE_URL}`);
    const [user] = await sql("SELECT * FROM Users WHERE discord_id = $1", [user_id])

    return NextResponse.json({"is_registered": !!user}, { status: 200 })
}