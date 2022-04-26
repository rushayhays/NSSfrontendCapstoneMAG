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
        userId:0,
        calories:0,
        mealTypeId:0,
        servings:0,
        shelfLifeInDays:0,
        name:""
    })

    //This will keeptrack of whether a box is checked or unchecked
    const [checkedone, setCheckedOne] = useState(false)
    const [checkedtwo, setCheckedTwo] = useState(false)
    const [checkedthree, setCheckedThree] = useState(false)
    const [checkedfour, setCheckedFour] = useState(false)
    const [checkedfive, setCheckedFive] = useState(false)
    const [checkedsix, setCheckedSix] = useState(false)

    //Update this later to get the User's ID dynamically
    const userNum=1;

    useEffect(()=> {
        getUsersMealPackets(userNum).then(arrOfMeals => {
            setMeals(arrOfMeals)
        });
    }, []);

    //Putting newSingleMeal out here makes it available to both handleInputChange functions
    const newSingleMeal = { ...singleMeal }
    newSingleMeal.userId=userNum;

    const handleControlledInputChange = (event) => {
		//A sepearte useState is needed here, because meals, creates an
        //array of meal objects, but this needs something that only deals with
        //and updates one object total
		let selectedVal = event.target.value
		// forms always provide values as strings. But we want to save the ids as numbers.
		if (event.target.id.includes("Id")) {
			selectedVal = parseInt(selectedVal)
		}
	
		newSingleMeal[event.target.id] = selectedVal
		// update state
		setSingleMeal(newSingleMeal)
	}

    const handleRadioButtonChange = (event) => {
        let userChoice = parseInt(event.target.value)
        newSingleMeal.mealTypeId=userChoice
        setSingleMeal(newSingleMeal)

    }

   

    const checkBoxChangeHandleOne = (event) => {
        setCheckedOne(!checkedone)
        console.log(checkedone)
    }
    const checkBoxChangeHandleTwo = (event) => {
        setCheckedTwo(!checkedtwo)
        console.log(checkedtwo)
    }
    const checkBoxChangeHandleThree = (event) => {
        setCheckedThree(!checkedthree)
    }
    const checkBoxChangeHandleFour = (event) => {
        setCheckedFour(!checkedfour)
    }
    const checkBoxChangeHandleFive = (event) => {
        setCheckedFive(!checkedfive)
    }
    const checkBoxChangeHandleSix = (event) => {
        setCheckedSix(!checkedsix)
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
                                <label for="name">Name:</label>
                                <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="name" value={singleMeal.name} />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label for="calories">Total calories:</label>
                                <input type="number" id="calories" onChange={handleControlledInputChange} name="calories" min="1" max="1000000" value={singleMeal.calories}/>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label for="servings">Servings:</label>
                                <input type="number" id="servings" onChange={handleControlledInputChange} name="servings" min="1" max="8000" value={singleMeal.servings}/>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label for="shelfLifeInDays">Shelf Life in Days:</label>
                                <input type="number" id="shelfLifeInDays" onChange={handleControlledInputChange} name="shelfLifeInDays"min="1" max="4000" value={singleMeal.shelfLifeInDays}/>
                            </div>
                        </fieldset>
                    </div>
                    {/* Box2 will also post to MealPacket  */}
                    <div className="mealCreateEntryBox" id="box2">
                        <fieldset>
                            <div className="form-group">
                                {/* remember to change all valuee to numbers and use parseInt when grabbing */}
                                <input type="radio" id="breakfast"  onChange={handleRadioButtonChange} name="mealType" value="1"/>
                                <label for="breakfast">BREAKFAST</label><br/>
                                <input type="radio" id="lunch" onChange={handleRadioButtonChange} name="mealType" value="2"/>
                                <label for="lunch">LUNCH</label><br/>
                                <input type="radio" id="dinner" onChange={handleRadioButtonChange} name="mealType" value="3"/>
                                <label for="dinner">Dinner</label>
                                <input type="radio" id="snack" onChange={handleRadioButtonChange} name="mealType" value="4"/>
                                <label for="snack">Snack or Other</label>
                            </div>
                        </fieldset>
                    </div>
                    {/* This will need to post to mealNutrition once per every checked box */}
                    <div className="mealCreateEntryBox" id="box3">
                        <fieldset>
                            <div className="form-group">
                                <input type="checkbox" id="nutrition1" checked={checkedone} onChange={checkBoxChangeHandleOne} name="nutrition1" value="1"/>
                                <label for="nutrition1"> Grains</label><br/>
                                <input type="checkbox" id="nutrition2" checked={checkedtwo} onChange={ checkBoxChangeHandleTwo} name="nutrition2" value="2"/>
                                <label for="nutrition2"> Vegetables</label><br/>
                                <input type="checkbox" id="nutrition3" checked={checkedthree} onChange={checkBoxChangeHandleThree} name="nutrition3" value="3"/>
                                <label for="nutrition3"> Fruits</label><br/>
                                <input type="checkbox" id="nutrition4"  checked={checkedfour} onChange={checkBoxChangeHandleFour} name="nutrition4" value="4"/>
                                <label for="nutrition4"> Proteins</label><br/>
                                <input type="checkbox" id="nutrition5"  checked={checkedfive} onChange={checkBoxChangeHandleFive} name="nutrition5" value="5"/>
                                <label for="nutrition5"> Dairy</label><br/>
                                <input type="checkbox" id="nutrition6"  checked={checkedsix} onChange={checkBoxChangeHandleSix} name="nutrition6" value="6"/>
                                <label for="nutrition6"> Other</label><br/>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div id="createButtonArea">
                    <h4>Create My Meal Card</h4>
                </div>
            </section>
        </>
    )
}