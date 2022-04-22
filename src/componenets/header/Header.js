//This will be able to load two differennt headers based on whether a user is logged in or not
import React from "react"
import "./header.css"
import { Link } from "react-router-dom"


export const Header = () => {
    return (
        <>
            <div className="headerArea">
                <Link to={"/"}>
                <h2 id="tempLogo">MAG</h2>
                </Link>
                <div className="headerButtonArea">
                    <button id="regButton">Register</button>
                    <button id="logButton">Login</button>
                </div>
            </div>
        </>
    )
}