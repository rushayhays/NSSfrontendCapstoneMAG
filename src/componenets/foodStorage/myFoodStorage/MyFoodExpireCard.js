//This will create the cards on the MyFoodStoragePage, which represent food that actually exists in the users food storage

import React from "react"
import "./myFoodExpireCard.css"
import { deleteMeal } from "../../../modules/myFoodStorageManager";


export const MyFoodExpireCard = ({object, render, alsoRender}) => {

    
    //credit to Javontae
    const formatMDY = (num) => {
        const date = new Date(num);
        let day = date.getUTCDate();
        let month = date.getUTCMonth() + 1;
        let year = date.getUTCFullYear();
        const formattedDate = month + "/" + day + "/" + year;
        return formattedDate; // returns the date with desired format
    };
    
    const dateExpire = (obj) =>{

        const aDayInMilli = 1000*60*60*24;
        const twoWeeksInMilli = (aDayInMilli * 14)
        const shelfLifeToMilli = (obj.mealPacket?.shelfLifeInDays * aDayInMilli)
        const expirationDayInMilli = obj.dateAddedTimestamp + shelfLifeToMilli
        const todaysDate = Date.now()
        const daysTillExpInMilli = expirationDayInMilli - todaysDate
        const readableExpirationDate = formatMDY(expirationDayInMilli)

        if(daysTillExpInMilli < 0){
            const expMessage = "Expired:" + readableExpirationDate
            return expMessage;
        }else if(daysTillExpInMilli < twoWeeksInMilli){
            const daysRemaining = Math.ceil(daysTillExpInMilli / aDayInMilli)
            const expMessage = "Expires in " + daysRemaining + " days"
            return expMessage;
        }
    }
  

    const theDateToInsert = formatMDY(object.dateAddedTimestamp)
    const whenExpired = dateExpire(object)

    const handleDeleteReserveMeal = () => {
        console.log("deleted")
        deleteMeal(object.id).then(()=>{
            render()
            alsoRender()
        })
    }

    return(
        <>
            <div className="expireFoodCard">
                <h4>{object.mealPacket?.name}</h4>
                <h4>Added: {theDateToInsert}</h4>
                <h4>Meal Id: {object.id}</h4>
                <h4>{whenExpired}</h4>
                <button onClick={handleDeleteReserveMeal}>Delete</button>
            </div>
        </>
    )
}