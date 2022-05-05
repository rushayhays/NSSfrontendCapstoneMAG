//This page will show up if you meet your goal

import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { addReserve } from "../../../modules/pieManager";
import { updateGoal, getUsersReserve} from "../../../modules/pieManager";


export const GoalMet = () => {

    const userObject = JSON.parse(sessionStorage.getItem("mag_user"))
    const currentUserId = parseInt(userObject.id)

    const [reserveobject, setReserveObject] = useState(
        {
            userId: currentUserId,
            goal: 0,
            numOfPeople: 0,
            id:0
        }
    )

    const[days, setDays] = useState(0)

    const navigate = useNavigate();

    useEffect(()=> {
        getUsersReserve(currentUserId).then(theObject =>{
            setReserveObject(theObject)
        })
    }, []);

    const handleControlledInputChange = (event) => {
    
		let selectedVal = event.target.value
        
        
		setDays(selectedVal)
	}

    const makeValuesIntegers = () => {
        const currentDays = parseInt(reserveobject.goal)
        const daysToAdd = parseInt(days)
        const totalDays = currentDays + daysToAdd

        const numberedReserveObject = { 
            userId: parseInt(currentUserId),
            goal: totalDays,
            numOfPeople: parseInt(reserveobject.numOfPeople),
            id:parseInt(reserveobject.id)
        }
        return numberedReserveObject
    }


    const handleCreateHQClick = () => {
        if (days === "" || days === 0){
			window.alert("Please fill in Days to Plan For")
        }else{
            const reserveObjectToAdd = makeValuesIntegers()
            updateGoal(reserveObjectToAdd).then(returnedObject => {
                navigate("/hqhome")
            })
        }
      
    }

    return(
        <>
            <h2>Congratulations! You met your goal.</h2>

            <fieldset className="fieldArea">
                <div className="form-area">
                    <label htmlFor="goal">Add Days to plan for:</label><br/>
                    <input type="number" id="goal" onChange={handleControlledInputChange} name="goal" min="1" max="1000000" value={days}/>
                </div>
            </fieldset>
            
            <button onClick={handleCreateHQClick} id="createHQButton">Set My New Goal</button>
        </>
    )
}