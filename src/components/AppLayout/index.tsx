"use server";

import Header from "@/components/Header/index";
import React from "react";

export default async function AppLayout(props: { children?: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className={"root-container"}>{props.children}</main>
        </>
    );
}
