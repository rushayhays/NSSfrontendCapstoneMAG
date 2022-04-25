//This will create the nutrition information on each mealPacket card

import React from "react";

export const NutritionButton=({nutriGroup})=>{
    console.log(nutriGroup)
    const nutriName = nutriGroup?.nutritionType?.name;
    console.log("hear Me");
    return(
        <>
            <p>some text</p>
            <button>{nutriName}</button>
        </>
    )
}