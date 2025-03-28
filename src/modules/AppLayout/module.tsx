import {ReactNode} from "react";
import Header from "@/modules/Header/module";
import Footer from "@/modules/Footer/module";
import "./module.css"
import React from "react"

interface ModuleProps {
    children: ReactNode;
    isFlex?: boolean;
}

export default function AppLayout({ children, isFlex = false }: ModuleProps) {
    return <>
        <Header />
        <div className={`pageContentContainer${isFlex ? "Flex" : ""}`}>
            {children}
        </div>
        <Footer />
    </>
}