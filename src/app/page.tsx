"use server"

import Header from "@/modules/header.module/module";
import PageContent from "./page_content";
import Footer from "@/modules/footer.module/module";

export default async function Page() {
    return <>
        <Header />
        <PageContent />

        <Footer />
    </>
}