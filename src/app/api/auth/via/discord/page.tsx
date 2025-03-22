"use client"

import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

export default function Page() {
    const code = useSearchParams().get("code");
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const exchangeToken = async () => {
            try {
                const response = await fetch(`/api/auth/via/discord/exchange_code`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({"code": code})
                })
                if (!response.ok) {
                    throw new Error("Failed to fetch");
                }
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        exchangeToken()
    }, [])
    if (isLoading) return <>Подождите, мы авторизуем вас...</>;
    else {
        router.push("/")
        return <>Успешно! Токен получен</>
    }

}