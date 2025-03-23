import {NextRequest, NextResponse} from "next/server";
import DiscordOAuth from "@rashingpro/ultimate-discord-oauth";
import {cookies} from "next/headers";

export async function GET(req: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value
    if (!token) {
        return NextResponse.json({}, {status: 401, statusText: "Unauthorized"})
    }
    try {
        const userRes = await DiscordOAuth.getCurrentUser(token);
        if (userRes.status == "error") {
            throw new Error(userRes.data?.["error"]);
        }
        return NextResponse.json(userRes.data, {status: 200})
    } catch (error) {
        return NextResponse.json({ "error": error }, {status: 500})
    }
}