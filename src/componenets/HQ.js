//This should hold Header, UserBanner, and AplicationViews

import React from "react"
import { Header } from "./header/Header"
import { ApplicationViews } from "./ApplicationViews"
import "./HQ.css"

export const HQ = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("kennel_customer") !== null)

    const setAuthUser = (user) => {
        sessionStorage.setItem("kennel_customer", JSON.stringify(user))
        setIsAuthenticated(sessionStorage.getItem("kennel_customer") !== null)
    }

    const clearUser = () => {
        sessionStorage.clear();
        setIsAuthenticated(sessionStorage.getItem("kennel_customer") !== null)
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