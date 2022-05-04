import React from "react";
import { useNavigate } from "react-router-dom";
import "./setUpHQ.css"
import { useState } from "react";
import { addReserve } from "../../modules/pieManager";

export const SetUpHQ = () => {

    const userObject = JSON.parse(sessionStorage.getItem("mag_user"))
    const currentUserId = parseInt(userObject.id)

    const [reserveobject, setReserveObject] = useState(
        {
            userId: currentUserId,
            goal: 0,
            numOfPeople: 0
          },
    )

    const navigate = useNavigate();
    
    
    const handleControlledInputChange = (event) => {
        const newReserveObject = { ...reserveobject }
        newReserveObject.userId = currentUserId;
		//A sepearte useState is needed here, because meals, creates an
        //array of meal objects, but this needs something that only deals with
        //and updates one object total
		let selectedVal = parseInt(event.target.value)
		// forms always provide values as strings. But we want to save the ids as numbers.
		if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
		}
        
		newReserveObject[event.target.id] = selectedVal
		// update state
		setReserveObject(newReserveObject)
	}

    const handleCreateHQClick = () => {
        addReserve(reserveobject).then(returnedObject => {
            navigate("/hqhome")
        })
      
    }

    
    return(
        <>
            <section className="hqEntryForm">
            
                <div>
                    <h2 className="hqEntryBanner">Let's get your HQ set up</h2>
                </div>

                
                <div className="hqPreview">
                    <div className="hqPreviewBox">
                        <div className="nameBanner">
                            <h2>HQ        {userObject.name}       HQ</h2>
                        </div>
                        <div className="foodStorageArea">
                            <h4 id="foodBanner">My Food Storage Plan</h4>
                            <fieldset className="fieldArea">
                                <div className="form-area">
                                    <label htmlFor="numOfPeople">Number of people:</label><br/>
                                    <input type="number" id="numOfPeople" onChange={handleControlledInputChange} name="numOfPeople" min="1" max="1000000" value={reserveobject.numOfPeople}/>
                                </div>
                            </fieldset>
                            <fieldset className="fieldArea">
                                <div className="form-area">
                                    <label htmlFor="goal">Days to plan for:</label><br/>
                                    <input type="number" id="goal" onChange={handleControlledInputChange} name="goal" min="1" max="1000000" value={reserveobject.goal}/>
                                </div>
                            </fieldset>
                        </div>
                       
                        <button id="createHQButton" onClick={handleCreateHQClick}>Create My HQ</button>
                    </div>
                </div>
            </section>
        </>
    )
}