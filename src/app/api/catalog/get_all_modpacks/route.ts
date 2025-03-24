import {NextRequest} from "next/server";
import {cookies} from "next/headers";
import RequestFetchAuth from "@/app/api/auth/req_fetch_auth";

export async function GET(req: NextRequest) {
    const token = await RequestFetchAuth(req, await cookies())
    if (typeof token != "string") {
        return token;
    }
}