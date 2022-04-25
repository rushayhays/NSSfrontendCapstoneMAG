//This will structure all the data for a single mealPacket into a card that can add meal info to the reserve
//Need mealPacket and mealNutrition

import React from "react"
import "./singleMealCard.css"

export const SingleMealCard =({object}) =>{
    return(
        <>
            <div className="mealPacket" id={object.id}>
                <h5>{object.name}</h5>
                <p>{object.mealtype?.name}</p>
                <p>{object.calories}</p>
                <p>{object.servings}</p>
                <p>{object.shelfLifeInDays}</p>
                <div>
                    <p>This is where nutrition types goes</p>
                </div>
            </div>
        </>
    )
}