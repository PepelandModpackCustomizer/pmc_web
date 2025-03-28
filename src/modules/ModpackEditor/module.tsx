"use client"

import {JSX, useState} from "react";
import Image from "next/image"
import "./module.css"

interface ModProps {
    title: string,
    key: number
}

function Mod({ title }: ModProps) {
    return <div className={"modpackEditorMod"}>
        {title}
    </div>
}

interface CategoryProps {
    title: string
    mods: JSX.Element[]
}

function Category({ title, mods }: CategoryProps) {
    const [expanded, setExpanded] = useState(false)

    return <div className={"modpackEditorCategory"}>
        <button  className={"modpackEditorCategoryTitle"} onClick={() => {setExpanded((prev) => !prev)}}>
            <Image src={expanded ? "/minus.svg" : "/plus.svg"} alt={expanded ? "minus" : "plus"} width={1} height={1} style={{height: "100%", width: "auto", padding: ".1rem"}}/>
            <span style={{marginLeft: ".6rem"}}>{title}</span>
        </button>
        <div className={"modpackEditorCategorySeparator"} style={expanded ? undefined : {display: "none"}}></div>
        <div className={"modpackEditorCategoryContent"} style={expanded ? undefined : {display: "none"}}>
            { mods }
        </div>
    </div>
}

function ModpackContentList() {
    const modList = [
        <Mod title={"Pochatok"} key={0} />
    ]
    return <div className={"modpackEditorContentList"}>
        <Category title={"Одиночная игра"} mods={modList}></Category>
    </div>

}

interface ModuleProps {

}

export default function Module() {
    return <ModpackContentList />
}
