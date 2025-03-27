"use client"

import Link from "next/link";
import Image from "next/image";
import "./style.css"
import AppLayout from "@/modules/AppLayout/module";

function PageContent() {
    return <div className={"titleContainer"}>
        <h1 className={"titleHeader"}>Pepeland Modpack Customizer</h1>
        <h2>
            <span>Твоя сборка - </span>
            <span className={"accent"}>твои правила</span>
        </h2>
        <Link href={"/editor"} className={"titlePrimaryButton"}>
            <Image className={"titlePrimaryButtonIcon"} src={"/settings.svg"} alt={"settings icon"} height={1}
                   width={1}/>
            Создать
        </Link>
    </div>
}

export default function Page() {
    return <AppLayout isFlex={true}>
        <PageContent />
    </AppLayout>
}