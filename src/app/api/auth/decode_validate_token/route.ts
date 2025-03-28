import {NextRequest, NextResponse} from "next/server";

import jwt from "jsonwebtoken"
import {cookies} from "next/headers";
import hash from "hash.js"
import RequestFetchAuth from "@/app/api/auth/req_fetch_auth";

export async function POST(req: NextRequest) {
    const token = await RequestFetchAuth(req, await cookies())
    if (typeof token != "string") {
        return token;
    }

    // console.log(`In api, ${token}`)

    try {
        // console.log("validating without jwtid...")
        let _data = jwt.verify(token, `${process.env.JWT_SECRET}`)
        let data: {[key: string]: any}
        if (typeof _data == "string") {
            data = JSON.parse(_data);
        } else {
            data = _data
        }
        // console.log("passed!")
        // console.log(data)

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
        // console.log(`Testing with jwtId ${jwtId}`)
        _data = jwt.verify(token, `${process.env.JWT_SECRET}`, {jwtid: jwtId})
        return NextResponse.json(data, {status: 200})
    } catch (error) {
        return NextResponse.json({}, {status: 401})
    }
}