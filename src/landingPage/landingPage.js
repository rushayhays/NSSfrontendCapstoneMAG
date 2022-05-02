import React from "react"
import "./landingPage.css"
import { Link } from "react-router-dom"

export const LandingPage = () => {

    return(
        <>
            <div className="catchPhrase">
                <h1 id="topCatch">Prepare for tomorrow,</h1>
                <h1 id="bottomCatch">for peace of mind today.</h1>
            </div>
            <div className="landingPageBanner">
                <div className="lilBlackBox">
                    <h4>The End of the World as we Know it?</h4>
                    <p>Ragnarok, Armageddon, Doomsday, nobody knows when society might collapse, but there are plenty of people who can tell you how it might collapse.</p>
                    <p id="bottomPara">We're here to tell you if you're ready for it. So that for you, doomsday, is just another day.</p>
                    <Link to={"/setuphq"}>
                    <button id="landingButton">Set Up My HQ</button>
                    </Link>
                </div>
            </div>
            <div>

            </div>
        </>
    )
}