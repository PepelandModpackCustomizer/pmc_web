"use server";

import Header from "@/components/Header/index";
import React from "react";

export default async function AppLayout(props: { children?: React.ReactNode }) {
    const MAIN_HOSTNAME = process.env.MAIN_HOSTNAME;
    return (
        <>
            <Header links={[
                {
                    text: "Главная",
                    href: `/`
                },
                {
                    text: "Мастерская",
                    href: `/workshop`
                },
                {
                    text: "Поддержка",
                    href: `/support`
                }
            ]} />
            <main className={"root-container"}>{props.children}</main>
        </>
    );
}
