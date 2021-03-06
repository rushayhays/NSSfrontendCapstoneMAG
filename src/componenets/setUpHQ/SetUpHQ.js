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
        }
    )

    const navigate = useNavigate();
    
    
    const handleControlledInputChange = (event) => {
        const newReserveObject = { ...reserveobject }
        newReserveObject.userId = currentUserId;
		//A sepearte useState is needed here, because meals, creates an
        //array of meal objects, but this needs something that only deals with
        //and updates one object total
		let selectedVal = event.target.value
        
		newReserveObject[event.target.id] = selectedVal
		// update state
		setReserveObject(newReserveObject)
	}

    const makeValuesIntegers = () => {
        const numberedReserveObject = { 
            userId: currentUserId,
            goal: parseInt(reserveobject.goal),
            numOfPeople: parseInt(reserveobject.numOfPeople)
        }
        return numberedReserveObject
    }


    const handleCreateHQClick = () => {
        if ((reserveobject.goal === "" || reserveobject.goal === 0) || (reserveobject.numOfPeople === "" || reserveobject.numOfPeople === 0)) {
			window.alert("Please fill in Number of People and Days to Plan For")
        }else{
            const reserveObjectToAdd = makeValuesIntegers()
            addReserve(reserveObjectToAdd).then(returnedObject => {
                navigate("/hqhome")
            })
        }
      
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
                                    <input type="number" id="numOfPeople" onChange={handleControlledInputChange} name="numOfPeople" min="1" max="1000000" value={reserveobject.numOfPeople} required/>
                                </div>
                            </fieldset>
                            <fieldset className="fieldArea">
                                <div className="form-area">
                                    <label htmlFor="goal">Days to plan for:</label><br/>
                                    <input type="number" id="goal" onChange={handleControlledInputChange} name="goal" min="1" max="1000000" value={reserveobject.goal} required/>
                                </div>
                            </fieldset>
                            
                            <button onClick={handleCreateHQClick} id="createHQButton">Create My HQ</button>
                                
                    

                        </div>
                        
                    </div>
                </div>
            </section>
        </>
    )
}