//This will load data from the ReserveMeals database, with an expand to include MealPacket Data

import "./myFoodStorage.css"
import { MySingleFoodCard } from "./MySingleFoodCard"
import { MyFoodExpireCard } from "./MyFoodExpireCard"
import { useOutletContext } from "react-router-dom"
import { useEffect } from "react"

export const MyFoodStorage = () =>{
    
    const anArray = useOutletContext();
    const[foodstorage, setFoodStorage] =anArray[8]
    const [dinnerarr, setDinnerArr] = anArray[0]
    const [luncharr, setLunchArr] = anArray[1]
    const [breakfastarr, setBreakfastArr] = anArray[2]
    const [snackarr, setSnackArr] = anArray[3]
    const [expirearr, setExpireArr] = anArray[4]
    const callUpUsersFoodStorage = anArray[5]
    const theGreatSorting = anArray[6]


    // useEffect(()=> {
    //     setDinnerArr(anArray[0]);
    //     setLunchArr(anArray[1])
    //     setBreakfastArr(anArray[2])
    
    // }, []);

    // useEffect(()=> {
    //     theGreatSorting();
    //     console.log("don't crash")

    // }, [foodstorage]);




    return(
        <>
            <section className="myFoodStorageBar">
                <h4>My Food Storage</h4>
            </section>
            <section className="cardDisplayArea">
                <div className="myFoodStorageCarousel" id="row1">
                    {dinnerarr.map(dinner =>
                        <MySingleFoodCard key={dinner.id} object={dinner} render={callUpUsersFoodStorage} alsoRender={theGreatSorting}/>
                    )}
                </div>
                <div className="myFoodStorageCarousel" id="row2">
                    {luncharr.map(lunch =>
                        <MySingleFoodCard key={lunch.id} object={lunch} render={callUpUsersFoodStorage} alsoRender={theGreatSorting}/>
                    )}
                </div>
                <div className="myFoodStorageCarousel" id="row3">
                    {breakfastarr.map(breakfast =>
                        <MySingleFoodCard key={breakfast.id} object={breakfast} render={callUpUsersFoodStorage} alsoRender={theGreatSorting}/>
                    )}
                </div>
                <div className="myFoodStorageCarousel" id="row4">
                    {snackarr.map(snack =>
                        <MySingleFoodCard key={snack.id} object={snack} render={callUpUsersFoodStorage} alsoRender={theGreatSorting}/>
                    )}
                </div>
            </section>
            <section className="expirationArea">
                <div className="expirationBar">
                    <h4>Expiring Soon!</h4>
                </div>
                <div className="expireCardArea">
                {expirearr.map(expirer =>
                        <MyFoodExpireCard key={expirer.id} object={expirer} render={callUpUsersFoodStorage} alsoRender={theGreatSorting}/>
                    )}
                </div>

            </section>
        </>
    )
}