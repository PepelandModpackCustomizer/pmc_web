import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function GET() {
    const cookieStore = await cookies()
    const retData = cookieStore.has("access_token")
    return NextResponse.json({ "is_auth": retData }, {status: 200})
    // TODO: make token validation instead of just checking of exists
}
