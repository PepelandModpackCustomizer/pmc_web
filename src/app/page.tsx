"use client"

import Header from "@/modules/Header/module";
import Footer from "@/modules/Footer/module";
import Link from "next/link";
import Image from "next/image";
import "./style.css"

function PageContent() {
    return <div className={"pageContentContainer"}>
        <div className={"titleContainer"}>
            <h1 className={"titleHeader"}>Pepeland Modpack Customizer</h1>
            <h2>
                <span>Твоя сборка - </span>
                <span className={"accent"}>твои правила</span>
            </h2>
            <Link href={"/create"} className={"titlePrimaryButton"}>
                <Image className={"titlePrimaryButtonIcon"} src={"/settings.svg"} alt={"settings icon"} height={1} width={1}/>
                Создать
            </Link>
        </div>

    </div>
}

export default function Page() {
    return <>
        <Header />
        <PageContent />
        <Footer />
    </>
}