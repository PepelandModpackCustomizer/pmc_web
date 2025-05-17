"use server"

import "./style.css";
import {Suspense} from "react";
import {wait} from "next/dist/lib/wait";
// import {HeaderAccountLoaded} from "@/components/Header/client";

async function HeaderLogo() {
    return <div className={"header__logo"}>

    </div>
}

async function HeaderNavigation() {
    return <div className={"header__nav"}>

    </div>
}

async function HeaderAccount() {
    return <div className={"header__account"}>
        <Suspense fallback={<HeaderAccountFallback />}>
            <HeaderAccountLoaded />
        </Suspense>
    </div>
}

async function HeaderAccountLoaded() {
    await fetch("")
    return <>
        Loaded!
    </>
}

async function HeaderAccountFallback() {
    return <>

    </>
}

export default async function Header() {
    return <header className={"header bg-red-600"}>
        <HeaderLogo />
        <HeaderNavigation />
        <HeaderAccount />
    </header>
}
