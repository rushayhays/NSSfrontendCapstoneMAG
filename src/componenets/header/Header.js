//This will be able to load two differennt headers based on whether a user is logged in or not
import React from "react"
import "./header.css"
import { Link } from "react-router-dom"


export const Header = ({clearUser}) => {

    const handleLogout = () =>{
        clearUser()
    }

    return (
        <>
            <div className="headerArea">
                <Link to={"/"}>
                <h2 id="tempLogo">MAG</h2>
                </Link>
                <div className="headerButtonArea">
                    <Link to={"/register"}>
                        <button id="regButton">Register</button>
                    </Link>
                    <Link to={"/login"}>
                        <button id="logButton">Login</button>
                    </Link>
                    <Link to={"/"}>
                        <button id="outButton" onClick={clearUser}>Logout</button>
                    </Link>
                    
                </div>
            </div>
        </>
    )
}