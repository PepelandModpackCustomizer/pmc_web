"use client"

import {JSX, useState} from "react";
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
        <div className={"modpackEditorCategoryTitle"} onClick={() => {setExpanded((prev) => !prev)}}>{ title }</div>
        <div className={"modpackEditorCategorySeparator"} style={expanded ? {} : {display: "none"}}></div>
        <div className={"modpackEditorCategoryContent"} style={expanded ? {} : {display: "none"}}>
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
