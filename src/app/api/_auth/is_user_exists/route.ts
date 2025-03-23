import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function GET() {
    const cookieStore = await cookies()
    if (!cookieStore.has("access_token") || !cookieStore.has("refresh_token")) {
        return NextResponse.json({}, {status: 401})
    }
    const userDataResponse = await fetch("/api/auth/via/discord/get_current_user")
    const userData = await userDataResponse.json()
    const userId = userData?.["id"]
    if (!userId) {
        return NextResponse.json({}, {status: 401})
    }
    
}