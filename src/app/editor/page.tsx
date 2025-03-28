"use server"

import AppLayout from "@/modules/AppLayout/module";
import ModpackEditor from "@/modules/ModpackEditor/module";
import "./style.css";
import React from "react"

export default async function Page() {
    return <AppLayout>
        <ModpackEditor />
    </AppLayout>
}