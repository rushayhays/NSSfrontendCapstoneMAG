//This will create the nutrition information on each mealPacket card

import React from "react";
import "./nutritionButton.css";

export const NutritionButton=({nutriObject})=>{
   
    return(
        <>
            <button className={nutriObject.nutritionType?.name}>{nutriObject.nutritionType?.name}</button>
        </>
    )
}