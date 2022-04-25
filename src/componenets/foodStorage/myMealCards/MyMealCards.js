//This will load the data from the mealPackets Database

import "./myMealCards.css"
import { useState, useEffect } from "react"
import { getUsersMealPackets } from "../../../modules/mealPacketManager"
import { SingleMealCard } from "./SingleMealCard"

export const MyMealCards = () => {
    const [meals, setMeals] = useState([{
        id:0,
        userId:0,
        calories:0,
        mealTypeId:0,
        servings:0,
        shelfLifeInDays:0,
        name:""
    }])

    //Update this later to get the User's ID dynamically
    const userNum=1;

    useEffect(()=> {
        getUsersMealPackets(userNum).then(arrOfMeals => {
            setMeals(arrOfMeals)
        });
    }, []);


    return(
        <>
            <section className="topBar">
                {/* eventually this will also be able to display the creation information */}
                <h4>My Meal Cards</h4>
            </section>
            <section className="mealCardCarousel">
                {meals.map(meal =>
                    <SingleMealCard key={meal.id} object={meal}/>
                )}
            </section>
            <section className="mealCardCreation">
                <div className="mealCreateTitleArea">
                    <h4>Create a New Meal Card</h4>
                </div>
                <div className="mealCreateEntryArea">
                    <div className="mealCreateEntryBox" id="box1"></div>
                    <div className="mealCreateEntryBox" id="box2"></div>
                    <div className="mealCreateEntryBox" id="box3"></div>
                </div>
                <div id="createButtonArea">
                    <h4>Create My Meal Card</h4>
                </div>
            </section>
        </>
    )
}