//This will create the cards on the MyFoodStoragePage, which represent food that actually exists in the users food storage

import React from "react"
import "./myFoodExpireCard.css"


export const MyFoodExpireCard = ({object}) => {

    // const dateExpire = (obj) =>{

    //     const aDayInMilli = 1000*60*60*24;
    //     const twoWeeksInMilli = (aDayInMilli * 14)
    //     const shelfLifeToMilli = (obj.mealPacket?.shelfLifeInDays * aDayInMilli)
    //     const expirationDayInMilli = obj.dateAddedTimestamp + shelfLifeToMilli
    //     const todaysDate = Date.now()
    //     const daysTillExpInMilli = expirationDayInMilli - todaysDate
    //     const readableExpirationDate = formatMDY(expirationDayInMilli)

    //     if(daysTillExpInMilli < twoWeeksInMilli){
    //         const daysRemaining = Math.ceil(daysTillExpInMilli / aDayInMilli)
    //         const expMessage = "expiring soon " + "days Remaining: " + daysRemaining
    //         return expMessage;
    //     }else if(daysTillExpInMilli < 0){
    //         const expMessage = "expired on:" + readableExpirationDate
    //     }
    //     else{
    //         const expMessage = "expired"
    //         return expMessage
    //     }
    // }

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
        const expirationDayInMilli = object.dateAddedTimestamp + shelfLifeToMilli
        const readableExpirationDate = formatMDY(expirationDayInMilli)
        return readableExpirationDate
    }

    const theDateToInsert = formatMDY(object.dateAddedTimestamp)
    const whenExpired = dateExpire()

    return(
        <>
            <div className="foodCard">
                <h4>{object.mealPacket?.name}</h4>
                <h4>Added: {theDateToInsert}</h4>
                <h4>Meal Id: {object.id}</h4>
                <h4>Expires: {whenExpired}</h4>
            </div>
        </>
    )
}