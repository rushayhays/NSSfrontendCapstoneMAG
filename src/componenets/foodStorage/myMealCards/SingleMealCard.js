//This will structure all the data for a single mealPacket into a card that can add meal info to the reserve
//Need mealPacket and mealNutrition

import React from "react"
import "./singleMealCard.css"
import { getNutritionForSingleMeal } from "../../../modules/mealPacketManager"
import { useState, useEffect } from "react"
import { NutritionButton } from "./nutritionButton/NutritionButton"

export const SingleMealCard =({object}) =>{
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


    return(
        <>
            <div className="mealPacket" id={object.id}>
                <h5>{object.name}</h5>
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
            </div>
        </>
    )
}