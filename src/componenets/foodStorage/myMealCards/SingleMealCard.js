//This will structure all the data for a single mealPacket into a card that can add meal info to the reserve
//Need mealPacket and mealNutrition

import React from "react"
import "./singleMealCard.css"
import { getNutritionForSingleMeal, deleteMealNutrientType } from "../../../modules/mealPacketManager"
import { useState, useEffect } from "react"
import { NutritionButton } from "./nutritionButton/NutritionButton"

export const SingleMealCard =({object, handleClickDelete}) =>{

    const userNum =1;
    // need to get the nutrition types for this Meal packet
    const [nutritionGroups, setNutritionGroups] = useState([{
        "id": 0,
        "nutritionTypeId": 0,
        "mealPacketId": 0,
    }])

    useEffect(()=> {
        getNutritionForSingleMeal(object.id).then(arrOfNTypes => {
            setNutritionGroups(arrOfNTypes)
        });
    }, []);

    const handleClickDeleteInsideSingleMealCard = () => {
        nutritionGroups.forEach(nutriObject => {
            deleteMealNutrientType(nutriObject.id)
        })
    
    }


    return(
        <>
            <div className="mealPacket" id={object.id}>
                <div className="mealCardNameArea">
                    <h5>{object.name}</h5>
                </div>
                <p>{object.mealtype?.name}</p>
                <p>{object.calories}</p>
                <p>{object.servings}</p>
                <p>{object.shelfLifeInDays}</p>
                <div>
                    <h5>Nutrition Types</h5>
                    {nutritionGroups.map(nutritionGroup=>{
                        
                        <NutritionButton key={nutritionGroup.id} nutriName={nutritionGroup}/>
                    })}
                </div>
                <div className="mealCardButtonArea">
                    <button>Edit</button>
                    {/* Take a look at having two things happen when something is clicked */}
                    <button onClick={handleClickDelete}>Delete</button>

                </div>
            </div>
        </>
    )
}