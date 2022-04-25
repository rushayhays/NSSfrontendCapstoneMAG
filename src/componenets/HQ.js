//This should hold Header, UserBanner, and AplicationViews

import React from "react"
import { Header } from "./header/Header"
import { ApplicationViews } from "./ApplicationViews"
import "./HQ.css"

export const HQ = () => {
    return(
        <>
            <section id="overView">
                <div id="overViewHeader">
                    <Header/>
                </div>
                <div id="overViewBody">
                    <ApplicationViews/>
                </div>
            </section>
        </>
    )
}