import {NextRequest, NextResponse} from "next/server";
import DiscordOAuth from "@rashingpro/ultimate-discord-oauth";
import {cookies} from "next/headers";

export async function POST(req: NextRequest) {
    const reqData = await req.json();
    const code = reqData["code"]
    try {
        if (
            !process.env.DISCORD_APP_REDIRECT_URI ||
            !process.env.DISCORD_APP_CLIENT_ID ||
            !process.env.DISCORD_APP_CLIENT_SECRET
        ) {
            throw new Error("Can't find required .env data")
        }
        const tokenResponse = await DiscordOAuth.exchangeCode(
            code,
            process.env.DISCORD_APP_REDIRECT_URI,
            process.env.DISCORD_APP_CLIENT_ID,
            process.env.DISCORD_APP_CLIENT_SECRET
        );
        if (tokenResponse.status == "error") {
            throw new Error(tokenResponse.data?.["error"])
        }
        const cookie = await cookies();
        cookie.set("access_token", tokenResponse.data?.["access_token"], {maxAge: 604800})
        cookie.set("refresh_token", tokenResponse.data?.["refresh_token"], {maxAge: 604800})
        return NextResponse.json(
            tokenResponse.data,
            {status: 200, headers: {'Set-Cookie': cookie.toString()}}
        )
    } catch (error) {
        console.error(`Error while exchanging discord code: ${error}`)
        return NextResponse.json({"error": error}, {status: 500, statusText: "Internal Server Error"})
    }
}