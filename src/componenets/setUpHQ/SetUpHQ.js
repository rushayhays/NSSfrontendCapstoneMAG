import React from "react";
import { useNavigate } from "react-router-dom";
import "./setUpHQ.css"

export const SetUpHQ = () => {

    const navigate = useNavigate();
    const handleCreateHQClick = () => {
        navigate("/hqhome")
    }

    return(
        <>
            <section className="hqEntryForm">
                <div className="hqEntry">
                    <div>
                        <h2 className="hqEntryBanner">Let's get your HQ set up</h2>
                    </div>
                    <div className="nameArea">
                        <div className="nameAreaLeft">
                        <h2>Your Name</h2>
                            <p>Form Area Name</p>
                            <p>This can be your real name or a nickname if you prefer</p>
                            <p>Choose a profile picture</p>
                        </div>
                        <div className="nameAreaRight">

                        </div>

                    </div>
                    <div className="regionArea">
                        <div className="regionAreaLeft">
                            <h2>Your Region</h2>
                            <p>Region Form Area</p>
                            <p>Choose a region to see a list of potential events common to your area</p>
                        </div>
                        <div className="regionAreaRight">

                        </div>

                    </div>
                    <div className="foodStorageArea">
                        <h2>My Food Storage Plan</h2>
                        <p>Form 1</p>
                        <p>Form 2</p>
                    </div>

                </div>
                <div className="hqPreview">
                    <div className="hqPreviewBox">
                        <div className="nameBanner">
                            <h2>HQ        Red October       HQ</h2>
                        </div>
                        <div className="regionBanner">
                            <p>Events Common to My Region</p>
                        </div>
                        <div className="foodStorageBanner">
                            <p>My Food Storage Plan</p>
                        </div>
                        <button id="createHQButton" onClick={handleCreateHQClick}>Create My HQ</button>
                    </div>
                </div>
            </section>
        </>
    )
}