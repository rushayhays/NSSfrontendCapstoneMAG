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
    const [singleMeal, setSingleMeal] = useState({
        id:0,
        userId:0,
        calories:0,
        mealTypeId:0,
        servings:0,
        shelfLifeInDays:0,
        name:""
    })

    //Update this later to get the User's ID dynamically
    const userNum=1;

    useEffect(()=> {
        getUsersMealPackets(userNum).then(arrOfMeals => {
            setMeals(arrOfMeals)
        });
    }, []);

    const handleControlledInputChange = (event) => {
		//A sepearte useState is needed here, because meals, creates an
        //array of meal objects, but this needs something that only deals with
        //and updates one object total
		const newSingleMeal = { ...singleMeal }
		let selectedVal = event.target.value
		// forms always provide values as strings. But we want to save the ids as numbers.
		if (event.target.id.includes("Id")) {
			selectedVal = parseInt(selectedVal)
		}
	
		newSingleMeal[event.target.id] = selectedVal
		// update state
		setSingleMeal(newSingleMeal)
	}

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

            {/* This area will handle gathering information for a new card and posting it */}
            <section className="mealCardCreation">
                <div className="mealCreateTitleArea">
                    <h4>Create a New Meal Card</h4>
                </div>
                <div className="mealCreateEntryArea">
                    {/* Box1 will grab info to post to mealPacket */}
                    <div className="mealCreateEntryBox" id="box1">
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="name" value={singleMeal.name} />
                            </div>
                        </fieldset>
                        <p>Calories</p>
                        <p>Servings</p>
                        <p>shelfLife</p>
                        

                    </div>
                    {/* Box2 will also post to MealPacket  */}
                    <div className="mealCreateEntryBox" id="box2">
                        <p>Meal Type</p>
                        <ul>
                            <li>Dinner</li>
                            <li>Lunch</li>
                            <li>Breakfast</li>
                            <li>Snack or Other</li>
                        </ul>

                    </div>
                    {/* This will need to post to mealNutrition once per every checked box */}
                    <div className="mealCreateEntryBox" id="box3">
                    <p>Nutrition Groups</p>
                        <ul>
                            <li>Grain</li>
                            <li>Vegetables</li>
                            <li>Fruits</li>
                            <li>Proteins</li>
                            <li>Dairy</li>
                            <li>Other</li>
                        </ul>
                    </div>
                </div>
                <div id="createButtonArea">
                    <h4>Create My Meal Card</h4>
                </div>
            </section>
        </>
    )
}