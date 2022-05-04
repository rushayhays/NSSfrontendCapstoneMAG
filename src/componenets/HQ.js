//This should hold Header, UserBanner, and AplicationViews

import React from "react"
import { Header } from "./header/Header"
import { ApplicationViews } from "./ApplicationViews"
import "./HQ.css"
import { useState } from "react"

export const HQ = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("mag_user") !== null)

    const setAuthUser = (user) => {
        sessionStorage.setItem("mag_user", JSON.stringify(user))
        setIsAuthenticated(sessionStorage.getItem("mag_user") !== null)
    }

    const clearUser = () => {
        sessionStorage.clear();
        setIsAuthenticated(sessionStorage.getItem("mag_user") !== null)
      }

    return(
        <>
            <section id="overView">
                <div id="overViewHeader">
                    <Header clearUser={clearUser} isAuthenticated={isAuthenticated}/>
                </div>
                <div id="overViewBody">
                    <ApplicationViews
                        setAuthUser={setAuthUser}
                        isAuthenticated={isAuthenticated}
                        setIsAuthenticated={setIsAuthenticated}
                    />
                </div>
            </section>
        </>
    )
}