//This will hold the FoodStorageStats and a navBar with links to MyFoodStorage, MyMealCards, and About
//Make it so that MyFoodStorage shows up when you first load the page.

import "./foodStorage.css"
import { UserBanner } from "../userBanner/UserBanner"
import { FoodStorageStats } from "./foodStorageStats/FoodStorageStats"
import { FoodNavBar } from "./foodNav/FoodNavBar"
import { Outlet, Link } from "react-router-dom"
import { getUsersFoodStorage } from "../../modules/myFoodStorageManager" 
import { useState, useEffect } from "react"


export const FoodStorage = () => {

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
    const oneBigArray = [[dinnerarr, setDinnerArr],[luncharr, setLunchArr],  [breakfastarr, setBreakfastArr], [snackarr, setSnackArr], [expirearr, setExpireArr], callUpUsersFoodStorage, theGreatSorting, helloFunction]
    
    
    return(
        <>
            <Link to={"/hqhome"}>
           <UserBanner/>
            </Link>
           <section className="foodStorageMainBox">
               <div className="foodStorageLeft">
                    <FoodStorageStats foodstorage={[foodstorage, setFoodStorage]} oneBigArray={oneBigArray}/>
               </div>
               <div className="foodStorageRight">
                    <div id="foodStorageNavBar">
                        <FoodNavBar/>
                    </div>
                    <div id="foodStorageOutlet">
                        <Outlet context={oneBigArray}/>
                    </div>
               </div>
            </section> 
        </>
    )
}