"use server";

import "./style.css";
import NextLink from "next/link"
import {NavLink, NavLinkProps} from "./client";
import React, { Suspense } from "react";

// interface NavLinkProps {
//     href: string,
//     text: string
// }
//
// async function NavLink({href, text}: NavLinkProps) {
//     return <NextLink href={href} className={"header__nav__link"}>{text}</NextLink>
// }

async function HeaderLogo() {
    return <div className={"header__logo"}></div>;
}

async function HeaderNavigation({links}: {links: NavLinkProps[]}) {
    return <div className={"header__nav"}>
        {links.map((val, i) => <NavLink {...val} key={i} />)}
    </div>;
}

async function HeaderAccount() {
    return (
        <div className={"header__account"}>
            <Suspense fallback={<HeaderAccountFallback />}>
                <HeaderAccountLoaded />
            </Suspense>
        </div>
    );
}

async function HeaderAccountLoaded() {
    return <>Loaded!</>;
}

async function HeaderAccountFallback() {
    return <></>;
}

interface HeaderProps {
    links: NavLinkProps[]
}

export default async function Header({links}: HeaderProps) {
    return (
        <header>
            <HeaderLogo />
            <HeaderNavigation links={links} />
            <HeaderAccount />
        </header>
    );
}
