"use client"

import "./module.css"
import Link from "next/link";

interface ModuleProps {

}

export default function Module({}: ModuleProps) {
    return <footer className={"footerContainer"}>
        <span>Сайт не является частью сети серверов </span>
        <Link href={"https://pepeland.net/"} className={"accent"}>Pepeland</Link>
        <br />
        <span className={"text-zinc-500"}>
            Not an official Minecraft product. We are in no way affiliated with or endorsed by Mojang Synergies AB, Microsoft Corporation or other rightsholders.
        </span>
    </footer>
}