"use client"

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export interface NavLinkProps {
    href: string,
    text: string
}

export function NavLink({href, text}: NavLinkProps) {
    const pathname = usePathname();
    console.log(pathname)
    return <NextLink href={href} className={"header__nav__link" + (pathname == href ? " accent" : "")}>{text}</NextLink>
}
