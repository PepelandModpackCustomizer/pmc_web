"use client"

import "./module.css";
import Image from "next/image";
import {useEffect, useReducer, useRef, useState} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";


function LogoComponent() {
    return <div className={"headerLogoContainer"}>
        <Image src={"/logo.svg"} alt={"Pepeland Logo"} width={1} height={1} className={"headerLogoImage"}/>
        <h1 className={"headerLogoTitle"}>Pepeland Modpack Customizer</h1>
    </div>
}

interface NavigationLinkProps {
    text: string,
    link: string,
    prefetch?: boolean | null
}

function NavigationLink({ text, link, prefetch = null }: NavigationLinkProps) {
    const pathname = usePathname();
    return <Link prefetch={prefetch} href={link} className={"headerNavigationLink" + (link == pathname ? "Accent" : "")}>{text}</Link>
}

function NavigationComponent() {
    return <div className={"headerNavigationContainer"}>
        <NavigationLink text={"Главная"} link={"/"} />
        <NavigationLink text={"Каталог"} link={"/catalog"} />
        <NavigationLink text={"Поддержка"} link={"/support"} />
    </div>
}

interface AccountAuthorisedProps {
    display_name: string
}

function AccountAuthorisedComponent({display_name}: AccountAuthorisedProps) {
    const handleLogout = async () =>  {
        await fetch("/api/auth/logout")
        window.location.assign("/")
    }

    return <div className={"headerAccountContainer"}>
        {display_name}
        <button className={"headerAccountLogoutButton cursor-pointer"} onClick={handleLogout}>
            <Image src={"/logout.svg"} alt={"logout button"} width={1} height={1} className={"headerAccountLogoutIcon"}/>
        </button>
    </div>;
}

function AccountComponent() {
    const isAuth = useRef<boolean | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const userData = useRef<{ [key: string]: any}>(null);
    useEffect(() => {
        const fetchIsAuth = async () => {
            if (!isLoading) return;
            try {
                const response = await fetch("/api/auth/is_auth");
                if (!response.ok) {
                    throw new Error("Failed to fetch");
                }
                const data = await response.json();
                isAuth.current = data["is_auth"]
                if (isAuth.current) {
                    const getUserData = async () => {
                        try {
                            const userDataResponse = await fetch("/api/auth/via/discord/get_current_user")
                            if (!userDataResponse.ok) {
                                throw new Error(userDataResponse.statusText);
                            }
                            userData.current = await userDataResponse.json()
                            setIsLoading(false);
                        } catch (error) {
                            console.error(error)
                        }
                    }
                    getUserData()
                }
                else {
                    setIsLoading(false);
                }

            } catch (error) {
                console.error(error);
                isAuth.current = null
            }
        }
        fetchIsAuth();
    }, [])


    const discord_login_url = "https://discord.com/oauth2/authorize?client_id=1352541404332556288&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fvia%2Fdiscord%2F&scope=identify+email+guilds"

    if (isLoading) return <div className={"headerAccountContainer"}>
        <>Loading...</>
    </div>;
    if (!isAuth.current || !userData.current) {
        return <div className={"headerAccountContainer"}>
        <a href={discord_login_url}>Войти</a>
    </div>;
    }

    if (!userData.current?.["global_name"]) return <div className={"headerAccountContainer"}>
        <a href={discord_login_url}>Войти (ошибка)</a>
    </div>;

    return <AccountAuthorisedComponent display_name={userData.current["global_name"]} />
}


interface ModuleProps {

}

export default function Module({}: ModuleProps) {
    return <header className={"header"}>
        <div className={"headerContainer"}>
            <LogoComponent />
            <NavigationComponent />
            <AccountComponent />
        </div>
    </header>
}