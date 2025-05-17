"use client"

import {useEffect, useState} from "react";


export function HeaderAccountLoaded() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleInit = async () => {
            const res = await fetch("https://www.youtube.com/");
            setIsLoading(false);
        }
        handleInit()
    }, []);

    return <>
        Loaded!
    </>
}
