import {IApiResponse} from "@/utils/apiResponses";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_HOSTNAME ??
    process.env.NEXT_PUBLIC_MAIN_HOSTNAME + "/api" ??
    "http://localhost:3000/api"

namespace Core {
    export async function makeRequest (
        endpoint: string,
        method: "GET" | "POST" = "GET",
        data?: {},
        auth?: string | string[],
        authType: "Basic" | "Bearer" = "Bearer",
        credentials: "omit" | "include" | "same-origin" = "include",
        contentType: string = "application/json"
    ): Promise<IApiResponse | undefined> {
        try {
            const headers = new Headers()
            if (auth) {
                if (authType === "Basic" && typeof auth === "string") {
                    headers.append("Authorization", `Basic ${auth}`);
                } else if (authType === "Bearer" && typeof auth === "object") {
                    headers.append("Authorization", `Bearer ${btoa(auth.join(":"))}`);
                }
            }
            let body;
            switch (contentType) {
                case "application/json": {
                    body = JSON.stringify(data);
                    break;
                }
                case "application/x-www-form-urlencoded": {
                    body = new URLSearchParams(data).toString()
                }
            }
            while (endpoint.startsWith("/")) {
                endpoint = endpoint.slice(1)
            }
            const response = await fetch(
                apiBaseUrl + "/" + endpoint, {
                    method: method,
                    headers: headers,
                    credentials: credentials,
                    body: body
                }
            )
            if (!response.ok) {
                throw new Error(`Status ${response.status} was received from api endpoint ${endpoint}`)
            }
            const jsonResponse = await response.json();
            return jsonResponse as IApiResponse;
        } catch (err) {
            console.error(err)
        }

    }
}

export {}
