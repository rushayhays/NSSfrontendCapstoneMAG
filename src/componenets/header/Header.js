//This will be able to load two differennt headers based on whether a user is logged in or not
import React from "react"
import "./header.css"
import { Link } from "react-router-dom"


export const Header = ({clearUser}) => {

    const handleLogout = () =>{
        clearUser()
    }

    if(sessionStorage.getItem("mag_user") !== null){
        return (
            <>
                <div className="headerArea">
                    <Link to={"/"}>
                    <h2 id="tempLogo">MAG</h2>
                    </Link>
                    <div className="headerButtonArea">
                        <Link to={"/"}>
                            <button id="outButton" onClick={handleLogout}>Logout</button>
                        </Link>
                        <Link to={"/hqhome"}>
                            <button id="hqButton">Go to HQ</button>
                        </Link>
                        <Link to={"/forum"}>
                            <button id="forumButton">Forum</button>
                        </Link>
                    </div>
                </div>
            </>
        )
    } else{
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
                    </div>
                </div>
            </>
        )
    }

}