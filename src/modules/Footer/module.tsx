"use client"

import "./module.css"
import Link from "next/link";

interface ModuleProps {

}

export default function Module({}: ModuleProps) {
    return <footer className={"footerContainer"}>
        <span>Сайт не является частью сети серверов </span>
        <Link href={"https://pepeland.net/"} className={"accent"}>Pepeland</Link>
    </footer>
}