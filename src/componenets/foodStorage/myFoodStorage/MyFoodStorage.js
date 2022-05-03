//This will load data from the ReserveMeals database, with an expand to include MealPacket Data

import "./myFoodStorage.css"
import { MySingleFoodCard } from "./MySingleFoodCard"
import { MyFoodExpireCard } from "./MyFoodExpireCard"
import { useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUsersFoodStorage } from "../../../modules/myFoodStorageManager"
import { deleteMeal } from "../../../modules/myFoodStorageManager"

export const MyFoodStorage = () =>{

    const anArray= useOutletContext();
    const callUpUserFoodStorage = anArray[5];
    const [value, setValue] = anArray[9]

    
    const userObject = JSON.parse(sessionStorage.getItem("kennel_customer"))
    const currentUserId = parseInt(userObject.id)
    
    const [foodstorage, setFoodStorage] = useState([{
        
        id: 0,
        mealPacketId: 0,
        reserveId: 0,
        dateAddedTimestamp: 0,
        mealPacket: {
            userId: currentUserId,
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
    
    
    
    
    
    //I want to sort the entire array of the users Food Storage into smaller arrays filtered by
    //meal type (i.e. breakfast, lunch, dinner, snack)
    const myGreatSorting = () => {
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
    const myCallUpUsersFoodStorage = (num) => {
        getUsersFoodStorage(num).then(arrOfFoods => {
            setFoodStorage(arrOfFoods)
        
        })
    }

    
    useEffect(()=> {
        myCallUpUsersFoodStorage(currentUserId);
        callUpUserFoodStorage(currentUserId);
    }, []);

    useEffect(()=> {
        myGreatSorting();

    }, [foodstorage]);
    
    // useEffect(()=> {
    //     callUpUserFoodStorage(currentUserId);
    // }, []);

    // useEffect(()=> {
    //     theGreatSorting();
    // }, [foodstorage]);
  
    const handleDeleteReserveMeal = (num) => {
        console.log("deleted")
        deleteMeal(num).then(()=>{
            myCallUpUsersFoodStorage(currentUserId);
            setValue(value=>value+1)
            console.log("added to value")
        })
    }
    
    
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
    
    //This area builds and passes props from FoodStorage to MyFoodStorage
    //and MyMealCard/SingleMealCard through the Outlet
    
    const helloFunction = () => {
        console.log("hello hello")
    }




    return(
        <>
            <section className="myFoodStorageBar">
                <h4>My Food Storage</h4>
            </section>
            <section className="cardDisplayArea">
                <div className="myFoodStorageCarousel" id="row1">
                    {dinnerarr.map(dinner =>
                        <MySingleFoodCard key={dinner.id} object={dinner} handleDelete={handleDeleteReserveMeal}/>
                    )}
                </div>
                <div className="myFoodStorageCarousel" id="row2">
                    {luncharr.map(lunch =>
                        <MySingleFoodCard key={lunch.id} object={lunch} handleDelete={handleDeleteReserveMeal}/>
                    )}
                </div>
                <div className="myFoodStorageCarousel" id="row3">
                    {breakfastarr.map(breakfast =>
                        <MySingleFoodCard key={breakfast.id} object={breakfast} handleDelete={handleDeleteReserveMeal}/>
                    )}
                </div>
                <div className="myFoodStorageCarousel" id="row4">
                    {snackarr.map(snack =>
                        <MySingleFoodCard key={snack.id} object={snack} handleDelete={handleDeleteReserveMeal}/>
                    )}
                </div>
            </section>
            <section className="expirationArea">
                <div className="expirationBar">
                    <h4>Expiring Soon!</h4>
                </div>
                <div className="expireCardArea">
                {expirearr.map(expirer =>
                        <MyFoodExpireCard key={expirer.id} object={expirer} handleDelete={handleDeleteReserveMeal}/>
                    )}
                </div>

            </section>
        </>
    )
}