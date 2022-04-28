//This will load data from the ReserveMeals database, with an expand to include MealPacket Data

import "./myFoodStorage.css"
import { getUsersFoodStorage } from "../../../modules/myFoodStorageManager"
import { useState, useEffect } from "react"
import { MySingleFoodCard } from "./MySingleFoodCard"

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
    }
    
    

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

                </div>

            </section>
        </>
    )
}