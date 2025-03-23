import {NextRequest, NextResponse} from "next/server";

export default async function RequestFetchAuth(req: NextRequest, cookieStore: any): Promise<NextResponse | string> {
    const reqAuth = req.headers.get("Authorization");

    let token;
    if (!reqAuth || !reqAuth.startsWith("Bearer ")) {
        if (cookieStore.has("access_token")) {
            token = cookieStore.get("access_token")?.value
        } else {
            return NextResponse.json({}, {status: 401})
        }
    } else {
        reqAuth.replace("Bearer ", "")
        token = reqAuth
    }
    return token;
}