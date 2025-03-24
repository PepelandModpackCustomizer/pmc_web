import {ReactNode} from "react";
import Header from "@/modules/Header/module";
import Footer from "@/modules/Footer/module";
import "./module.css"

export default function AppLayout({ children }: Readonly<{ children: ReactNode }>) {
    return <>
        <Header />
        <div className={"pageContentContainer"}>
            {children}
        </div>
        <Footer />
    </>
}