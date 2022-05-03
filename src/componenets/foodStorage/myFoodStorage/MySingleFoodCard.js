//This will create the cards on the MyFoodStoragePage, which represent food that actually exists in the users food storage

import React from "react"
import "./mySingleFoodCard.css"
import { deleteMeal } from "../../../modules/myFoodStorageManager";


export const MySingleFoodCard = ({object, handleDelete}) => {

   //credit to Javontae
    const formatMDY = (num) => {
        const date = new Date(num);
        let day = date.getUTCDate();
        let month = date.getUTCMonth() + 1;
        let year = date.getUTCFullYear();
        const formattedDate = month + "/" + day + "/" + year;
        return formattedDate; // returns the date with desired format
    };

    const dateExpire = () =>{
        const aDayInMilli = 1000*60*60*24;
        const shelfLifeToMilli = (object.mealPacket?.shelfLifeInDays * aDayInMilli)
        //To calculate the day something will expire, add the shelf life
        //to the day it was added
        const expirationDayInMilli = object.dateAddedTimestamp + shelfLifeToMilli
        const readableExpirationDate = formatMDY(expirationDayInMilli)
        return readableExpirationDate
    }

    //this creates variables to hold the day added and expiration dates
    const theDateToInsert = formatMDY(object.dateAddedTimestamp)
    const whenExpired = dateExpire()

    

    return(
        <>
            <div className="foodCard">
                <h4>{object.mealPacket?.name}</h4>
                <h4>Added: {theDateToInsert}</h4>
                <h4>Meal Id: {object.id}</h4>
                <h4>Expires: {whenExpired}</h4>
                <button onClick={() => handleDelete(object.id)}>Delete</button>
            </div>
        </>
    )
}