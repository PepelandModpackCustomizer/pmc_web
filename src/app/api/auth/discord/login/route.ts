import {NextRequest, NextResponse} from "next/server";
import DiscordOAuth from "@rashingpro/ultimate-discord-oauth";

import jwt from 'jsonwebtoken';
import hash from "hash.js"
import {cookies} from "next/headers";
import {neon} from "@neondatabase/serverless";

export async function POST(req: NextRequest) {
    const reqBody = await req.json()
    if (!reqBody || !reqBody["code"]) {
        return NextResponse.json({}, {status: 401})
    }
    if (
        !process.env.DISCORD_APP_REDIRECT_URI ||
        !process.env.DISCORD_APP_CLIENT_ID ||
        !process.env.DISCORD_APP_CLIENT_SECRET
    ) {
        return NextResponse.json({}, {status: 500})
    }

    const tokenResponse = await DiscordOAuth.exchangeCode(
        reqBody["code"],
        process.env.DISCORD_APP_REDIRECT_URI,
        process.env.DISCORD_APP_CLIENT_ID,
        process.env.DISCORD_APP_CLIENT_SECRET
    )
    if (!tokenResponse || tokenResponse.status == "error" || !tokenResponse.data) {
        return NextResponse.json({"error": "exchange code"}, {status: 500})
    }
    const accessToken = tokenResponse.data["access_token"]
    // const refreshToken = tokenResponse.data["refresh_token"]

    const userDataRes = await DiscordOAuth.getCurrentUser(accessToken)
    if (!userDataRes || userDataRes.status == "error" || !userDataRes.data || !userDataRes.data["id"].toString()) {
        return NextResponse.json({}, {status: 500})
    }

    const discord_user_id = userDataRes.data["id"].toString()

    const isUserRegisteredRes = await fetch(`${process.env.MAIN_HOSTNAME}/api/auth/discord/is_user_registered`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"user_id": discord_user_id})
    })
    if (!isUserRegisteredRes.ok) {
        return NextResponse.json({"error": "is_user_registered"}, {status: 500})
    }
    const isUserRegisteredBody = await isUserRegisteredRes.json()
    const isUserRegistered = isUserRegisteredBody["is_registered"]
    if (isUserRegistered) {
        const sql = neon(`${process.env.DATABASE_URL}`);
        const [user_id_res] = await sql(`SELECT id FROM Users WHERE discord_id = '${discord_user_id}'`)
        const user_id = user_id_res["id"]
        const revokedTokensRes = await fetch(`${process.env.MAIN_HOSTNAME}/api/auth/get_revoked_tokens/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"user_id": user_id})
        })
        const revokedTokensBody = await revokedTokensRes.json()

        if (!revokedTokensRes.ok || !revokedTokensBody) {
            return NextResponse.json({}, {status: 500})
        }

        const revokedTokens = revokedTokensBody["tokens"]

        if (!revokedTokens) {
            return NextResponse.json({}, {status: 500})
        }

        const userDataRes = await DiscordOAuth.getCurrentUser(accessToken)

        if (!userDataRes || userDataRes.status == "error" || !userDataRes.data) {
            return NextResponse.json({}, {status: 500})
        }

        const userData = userDataRes.data

        // const sql = neon(`${process.env.DATABASE_URL}`);
        const [userScopesRes] = await sql(`SELECT permissions FROM Users WHERE id = ${user_id}`)
        const userScopes = userScopesRes["permissions"]
        // console.log(`userId: ${user_id}; userScope: ${JSON.stringify(userScopes)}`)
        if (!userScopes) {
            return NextResponse.json({}, {status: 500})
        }

        const accessSessionToken = jwt.sign({
            "type": "access",
            "scopes": userScopes,
            "auth_methods": {
                "discord": {
                    "user_id": discord_user_id
                }
            },
            "user": {
                "user_id": user_id,
                "username": userData["global_name"],
                "email": userData["email"]
            }
        }, `${process.env.JWT_SECRET}`, {
            expiresIn: "2 days",
            jwtid: hash.sha256().update(`${user_id};${revokedTokens.length}`).digest("hex")
        })
        // const refreshSessionToken = jwt.sign(JSON.stringify({
        //     "type": "refresh"
        // }), `${process.env.JWT_SECRET}`, {
        //     expiresIn: "2d",
        //     jwtid: hash.sha256().update(`${user_id};${revokedTokens.length}`).digest("hex")
        // })
        const cookieStore = await cookies();
        cookieStore.set("access_token", accessSessionToken, {maxAge: 60 * 60 * 24 * 2})
        return NextResponse.json({}, {status: 200, headers: {
                "Set-Cookie": cookieStore.toString()
        }})
    }

}