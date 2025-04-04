import {NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function GET() {
    const cookieStore = await cookies();
    cookieStore.delete("access_token")
    cookieStore.delete("refresh_token")
    return NextResponse.json({}, {status: 200, headers: {
            "Set-Cookie": cookieStore.toString()
        }})
}