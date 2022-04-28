//This will create the cards on the MyFoodStoragePage, which represent food that actually exists in the users food storage

import React from "react"
import "./mySingleFoodCard.css"


export const MySingleFoodCard = ({object}) => {
    return(
        <>
            <div className="foodCard">
                <h4>{object.mealPacket?.name}</h4>
                <h4>dayAdded {object.dateAddedTimestamp}</h4>
                <h4>MealPacketId {object.id}</h4>
            </div>
        </>
    )
}