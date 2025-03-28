"use client"

import {JSX, useState} from "react";
import Image from "next/image"
import iconPlus from "@/../public/plus.svg";
import iconMinus from "@/../public/minus.svg";
import "./module.css"
import React from "react";

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
            <Image src={expanded ? iconMinus : iconPlus} alt={expanded ? "minus" : "plus"} style={{height: "100%", width: "auto", padding: ".1rem"}}/>
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

export default function Module({}: ModuleProps) {
    return <ModpackContentList />
}
