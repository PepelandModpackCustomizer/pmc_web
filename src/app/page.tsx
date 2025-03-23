"use client"

import Header from "@/modules/header.module/module";
import Footer from "@/modules/footer.module/module";
import Link from "next/link";
import Image from "next/image";
import "./style.css"

function PageContent() {
    return <div className={"pageContentContainer"}>
        <div className={"titleContainer"}>
            <h1 className={"titleHeader"}>Pepeland Modpack Customizer</h1>
            <h2>
                <span>Только то, что нужно </span>
                <span className={"accent"}>тебе</span>
            </h2>
            <Link href={"/create"} className={"hover:bg-teal-500 titlePrimaryButton"}>
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