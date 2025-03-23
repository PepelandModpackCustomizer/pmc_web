import {NextRequest, NextResponse} from "next/server";
import {neon} from "@neondatabase/serverless";

export async function POST(req: NextRequest) {
    const reqBody = await req.json()
    const user_id = reqBody["user_id"]
    if (!reqBody || !user_id) {
        return NextResponse.json({}, {status: 500})
    }
    const sql = neon(`${process.env.DATABASE_URL}`);
    const user_revoked_tokens = await sql('SELECT token FROM RevokedTokens WHERE user_id = $1', [user_id])
    if (!user_revoked_tokens) {
        return NextResponse.json({}, {status: 500})
    }
    if (user_revoked_tokens.length == 0) {
        return NextResponse.json({"tokens": []}, {status: 200})
    }
    const user_revoked_tokens_parsed = user_revoked_tokens.map(row => row.token);
    return NextResponse.json({"tokens": user_revoked_tokens_parsed})
}