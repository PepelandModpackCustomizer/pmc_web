import {NextRequest, NextResponse} from "next/server";

import jwt from "jsonwebtoken"
import {cookies} from "next/headers";
import hash from "hash.js"

export async function POST(req: NextRequest) {
    let reqBody;
    try {
        reqBody = await req.json()
    } catch (error) {
        reqBody = undefined
    }

    let token;
    if (!reqBody) {
        const cookieStore = await cookies();
        if (cookieStore.has("access_token")) {
            token = cookieStore.get("access_token")?.value
        } else {
            return NextResponse.json({}, {status: 401})
        }
    } else {
        token = reqBody["token"]
    }

    // console.log(`In api, ${token}`)

    try {
        console.log("validating without jwtid...")
        let _data = jwt.verify(token, `${process.env.JWT_SECRET}`)
        let data: {[key: string]: any}
        if (typeof _data == "string") {
            data = JSON.parse(_data);
        } else {
            data = _data
        }
        console.log("passed!")

        const revokedTokensRes = await fetch(`${process.env.MAIN_HOSTNAME}/api/auth/get_revoked_tokens`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"user_id": data.user["user_id"]})
        })
        const revokedTokensBody = await revokedTokensRes.json()
        const revokedTokens = revokedTokensBody["tokens"]

        const jwtId = hash.sha256().update(`${data.user["user_id"]};${revokedTokens.length}`).digest("hex")
        console.log(`Testing with jwtId ${jwtId}`)
        _data = jwt.verify(token, `${process.env.JWT_SECRET}`, {jwtid: jwtId})
        return NextResponse.json(data, {status: 200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({}, {status: 500})
    }
}