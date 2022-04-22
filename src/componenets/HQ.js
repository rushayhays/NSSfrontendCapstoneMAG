//This should hold Header, UserBanner, and AplicationViews

import React from "react"
import { Header } from "./header/Header"
import { ApplicationViews } from "./ApplicationViews"

export const HQ = () => {
    return(
        <>
            <Header/>
            <ApplicationViews/>
        </>
    )
}