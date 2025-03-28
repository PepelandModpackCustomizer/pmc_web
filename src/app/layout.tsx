import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import React, {ReactNode} from "react";

const inter = Inter({subsets: ["latin", "cyrillic"]})

export const metadata: Metadata = {
  title: "Pepeland Modpack Customizer | Только то, что нужно",
  description: "Добавить в сборку только нужные тебе компоненты еще никогда не было так просто!",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return <html lang={"ru"}>
        <body className={`${inter.className} antialiased`}>
            {children}
        </body>
    </html>
}
