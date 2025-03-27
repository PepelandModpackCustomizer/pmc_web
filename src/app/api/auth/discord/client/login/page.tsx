"use client"

import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState, Suspense} from "react";
import Link from "next/link";
import "./style.css"

function LoginApiWork() {
    const code = useSearchParams().get("code");
    const [loadingState, setLoadingState] = useState(0);
    const router = useRouter();
    // 0 - loading
    // 1 - success
    // 2 - error

    useEffect(() => {
        const login = async () => {
            try {
                const response = await fetch("/api/auth/discord/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({"code": code})
                })
                const responseBody = await response.json()
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText} ${responseBody["error"]}`);
                }
                setLoadingState(1)
                router.push("/")
            } catch (error) {
                setLoadingState(2)
                console.error(error)
            }

        }

        login()
    }, []);
    if (loadingState == 0) {
        return <div className={"pageContentContainer"}>Подождите...</div>

    } else if (loadingState == 1) {
        return <div className={"pageContentContainer"}>Успешно!</div>

    } else {
        return <div className={"pageContentContainer"}>
                <span>
                    Ошибка! Попробуйте еще раз. Если проблема сохранится - обратитесь в
                    <Link className={"accent"} href={"/support"}> поддержку.</Link>
                </span>
            </div>

    }
}

export default function Page() {
    // const [isLoading, setIsLoading] = useState(true);
    // const [isError, setIsError] = useState(false);
    // // const tokens = useRef<string[] | null>(null)
    // const [tokens, setTokens] = useState<string[] | null>(null)
    // // const discord_user_id = useRef<string | null>(null)
    // const [discordUserId, setDiscordUserId] = useState<string | null>(null)
    // const router = useRouter();
    //
    // useEffect(() => {
    //     const exchangeToken = async () => {
    //         try {
    //             const tokenResponse = await fetch(`/api/auth/discord/exchange_code`, {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 },
    //                 body: JSON.stringify({"code": code})
    //             })
    //             if (!tokenResponse.ok) {
    //                 throw new Error("Failed to fetch");
    //             }
    //             const tokenData = await tokenResponse.json()
    //             const token = tokenData?.["access_token"]
    //             const refreshToken = tokenData?.["refresh_token"]
    //             if (!token || !refreshToken) {
    //                 throw new Error("Failed to fetch: there is no token in response body");
    //             } else {
    //
    //                 setTokens([token, refreshToken])
    //                 console.debug(`Code exchanged successfully. ${token}`);
    //             }
    //         } catch (error) {
    //             console.error("Error in exchangeToken", error)
    //             setIsError(true);
    //         }
    //     }
    //     exchangeToken();
    // }, [])
    //
    // useEffect(() => {
    //     const getDiscordUserId = async () => {
    //         const accessToken = tokens?.[0]
    //         if (!accessToken) {
    //             return;
    //         }
    //         console.debug(`Getting discord user id with token: ${tokens[0]}...`);
    //         try {
    //             const userDataResponse = await fetch("/api/auth/discord/get_current_user", {
    //                 method: "GET",
    //                 headers: {
    //                     'Authorization': `Bearer ${accessToken}`
    //                 }
    //             })
    //             const userData = await userDataResponse.json()
    //             setDiscordUserId(userData["id"].toString())
    //             if (!userData["id"].toString()) {
    //                 throw new Error("Failed to fetch: there is no user id in response body");
    //             }
    //             console.debug(`Got userId: ${userData["id"].toString()}`)
    //         } catch (error) {
    //             console.error("Error in getDiscordUserId", error)
    //             setIsError(true)
    //         }
    //     }
    //     getDiscordUserId()
    // }, [tokens]);
    //
    // useEffect(() => {
    //     const getIsUserRegistered = async () => {
    //         if (!discordUserId) {
    //             return
    //         }
    //         console.debug(`Checking isUserRegistered with userId: ${discordUserId}...`)
    //         try {
    //             const isUserRegisteredResponse = await fetch("/api/auth/is_user_registered", {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 },
    //                 body: JSON.stringify({"user_id": discordUserId})
    //             })
    //             const isUserRegisteredBody = await isUserRegisteredResponse.json()
    //             const isUserRegistered = isUserRegisteredBody["is_registered"]
    //             console.debug(`User registered: ${isUserRegistered}`)
    //             setIsLoading(false)
    //             if (isUserRegisteredBody["is_registered"]) {
    //                 router.push("/")
    //             } else {
    //                 router.push(`/api/auth/client/register?access_token=${tokens?.[0]}&refresh_token=${tokens?.[1]}`)
    //             }
    //         } catch (error) {
    //             console.error("Error in isUserRegistered", error)
    //             setIsError(true)
    //         }
    //     }
    //     getIsUserRegistered()
    // }, [discordUserId]);
    // if (isError) {
    //     return <div className={"pageContentContainer"}>
    //         Произошла ошибка, попробуйте еще раз.
    //         Если проблема сохранится – обратитесь в <Link href={"/support"} className={"accent"}>поддержку.</Link>
    //     </div>
    // } else if (isLoading) return <div className={"pageContentContainer"}>Подождите, мы авторизуем вас...</div>;
    // else {
    //     return <div className={"pageContentContainer"}>Успешно! Сейчас переместим вас...</div>
    // }


    return <Suspense>
        <LoginApiWork />
    </Suspense>
}