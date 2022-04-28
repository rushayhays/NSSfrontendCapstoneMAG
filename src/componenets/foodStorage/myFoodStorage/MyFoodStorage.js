//This will load data from the ReserveMeals database, with an expand to include MealPacket Data

import "./myFoodStorage.css"
import { getUsersFoodStorage } from "../../../modules/myFoodStorageManager"
import { useState, useEffect } from "react"
import { MySingleFoodCard } from "./MySingleFoodCard"
import { MyFoodExpireCard } from "./MyFoodExpireCard"

export const MyFoodStorage = () =>{

    const [foodstorage, setFoodStorage] = useState([{

        id: 0,
        mealPacketId: 0,
        reserveId: 1,
        dateAddedTimestamp: 0,
        mealPacket: {
            userId: 0,
            calories: 0,
            mealTypeId: 3,
            servings: 0,
            shelfLifeInDays: 0,
            name: "",
            id: 0
        }
   
    }])

    const [dinnerarr, setDinnerArr] = useState([])
    const [luncharr, setLunchArr] = useState([])
    const [breakfastarr, setBreakfastArr] = useState([])
    const [snackarr, setSnackArr] = useState([])
    const [expirearr, setExpireArr] = useState([])

    let lengthLooker = foodstorage.length
    
    
    //I want to sort the entire array of the users Food Storage into smaller arrays filtered by
    //meal type (i.e. breakfast, lunch, dinner, snack)
    const theGreatSorting = () => {
        const anDinnerArr = foodstorage.filter(object => object.mealPacket.mealTypeId === 3);
        setDinnerArr(anDinnerArr);
        const anLunchArr = foodstorage.filter(object => object.mealPacket.mealTypeId === 2);
        setLunchArr(anLunchArr);
        const anBreakfastArr = foodstorage.filter(object => object.mealPacket.mealTypeId === 1);
        setBreakfastArr(anBreakfastArr);
        const anSnackArr = foodstorage.filter(object => object.mealPacket.mealTypeId === 4);
        setSnackArr(anSnackArr);

        checkDateExpire(foodstorage)
    }
    
    
    //This will need to be changes to render dynamically once the login feature is added
    const callUpUsersFoodStorage = () => {
        getUsersFoodStorage(1).then(arrOfFoods => {
            setFoodStorage(arrOfFoods)
        })
    }

    
    useEffect(()=> {
        callUpUsersFoodStorage();
    }, []);

    useEffect(()=> {
        theGreatSorting();
    }, [lengthLooker]);

    //credit to Javontae
    const formatMDY = (num) => {
        const date = new Date(num);
        let day = date.getUTCDate();
        let month = date.getUTCMonth() + 1;
        let year = date.getUTCFullYear();
        const formattedDate = month + "/" + day + "/" + year;
        return formattedDate; // returns the date with desired format
    };

    const checkDateExpire = (array) =>{
        //These are some constant numbers
        const aDayInMilli = 1000*60*60*24;
        const twoWeeksInMilli = (aDayInMilli * 14)
        const todaysDate = Date.now()

        const expirinegSoonArr = []

        array.forEach(obj => {
            const shelfLifeToMilli = (obj.mealPacket?.shelfLifeInDays * aDayInMilli)
            const expirationDayInMilli = obj.dateAddedTimestamp + shelfLifeToMilli
            const daysTillExpInMilli = expirationDayInMilli - todaysDate

            if(daysTillExpInMilli <= twoWeeksInMilli){
                expirinegSoonArr.push(obj)
            }
        })
        setExpireArr(expirinegSoonArr)
    }




    return(
        <>
            <section className="myFoodStorageBar">
                <h4>My Food Storage</h4>
            </section>
            <section className="cardDisplayArea">
                <div className="myFoodStorageCarousel" id="row1">
                    {dinnerarr.map(dinner =>
                        <MySingleFoodCard key={dinner.id} object={dinner}/>
                    )}
                </div>
                <div className="myFoodStorageCarousel" id="row2">
                    {luncharr.map(lunch =>
                        <MySingleFoodCard key={lunch.id} object={lunch}/>
                    )}
                </div>
                <div className="myFoodStorageCarousel" id="row3">
                    {breakfastarr.map(breakfast =>
                        <MySingleFoodCard key={breakfast.id} object={breakfast}/>
                    )}
                </div>
                <div className="myFoodStorageCarousel" id="row4">
                    {snackarr.map(snack =>
                        <MySingleFoodCard key={snack.id} object={snack}/>
                    )}
                </div>
            </section>
            <section className="expirationArea">
                <div className="expirationBar">
                    <h4>Expiring Soon!</h4>
                </div>
                <div className="expireCardArea">
                {expirearr.map(expirer =>
                        <MyFoodExpireCard key={expirer.id} object={expirer}/>
                    )}
                </div>

            </section>
        </>
    )
}