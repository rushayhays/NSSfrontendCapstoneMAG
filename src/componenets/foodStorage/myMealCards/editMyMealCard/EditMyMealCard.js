
import "./editMyMealCard.css"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getUsersMealPackets, addNutrient, addMealPacket, getSingleUserMealPacket, getNutritionForSingleMeal } from "../../../../modules/mealPacketManager" 
import { SingleMealCard } from "../SingleMealCard"

export const EditMyMealCard = () => {

    const{mealId} = useParams()

    const [meals, setMeals] = useState([{
        id:0,
        userId:0,
        calories:0,
        mealTypeId:0,
        servings:0,
        shelfLifeInDays:0,
        name:""
    }])
    const [editedMeal, setEditedMeal] = useState({
        userId:1,
        calories:0,
        mealTypeId:0,
        servings:0,
        shelfLifeInDays:0,
        name:""
    })

    const [nutritionGroups, setNutritionGroups] = useState([{
        "id": 0,
        "nutritionTypeId": 0,
        "mealPacketId": 0,
    }])

    //This is being watched by a use effect. The useEffect will trigger when 
    //nutritiongroups populates
    let lengthLooker = nutritionGroups.length

    

    //This will keeptrack of whether a box is checked or unchecked
    const [checkedone, setCheckedOne] = useState(false)
    const [checkedtwo, setCheckedTwo] = useState(false)
    const [checkedthree, setCheckedThree] = useState(false)
    const [checkedfour, setCheckedFour] = useState(false)
    const [checkedfive, setCheckedFive] = useState(false)
    const [checkedsix, setCheckedSix] = useState(false)

    //This will set the default state of the chckboxes to match
    //what nutrients are listed
    const setUpNutritionGroupsForEditing = () => {
        nutritionGroups.forEach(object => {
            if(object.nutritionTypeId === 1){
                setCheckedOne(true)
            }
            if(object.nutritionTypeId === 2){
                setCheckedTwo(true)
            }
            if(object.nutritionTypeId === 3){
                setCheckedThree(true)
            }
            if(object.nutritionTypeId === 4){
                setCheckedFour(true)
            }
            if(object.nutritionTypeId === 5){
                setCheckedFive(true)
            }
            if(object.nutritionTypeId === 6){
                setCheckedSix(true)
            }
        })
    }

    const userNum = 1;
    useEffect(()=> {
        getUsersMealPackets(userNum).then(arrOfMeals => {
            setMeals(arrOfMeals)
        });
        getSingleUserMealPacket(mealId).then(object => {
            setEditedMeal(object)
        })
        getNutritionForSingleMeal(mealId).then(arrOfNTypes => {
            setNutritionGroups(arrOfNTypes)
        });
    }, []);

    //This ensures that nutrtionGroups has populated before running setUpNutritionGroupsForEditing
    useEffect(()=>{
        setUpNutritionGroupsForEditing()
    }, [lengthLooker]);


    
    const handleControlledInputChange = (event) => {
        const mealWithEdits = { ...editedMeal }
        mealWithEdits.userId = userNum;
		//A sepearte useState is needed here, because meals, creates an
        //array of meal objects, but this needs something that only deals with
        //and updates one object total
		let selectedVal = event.target.value
		// forms always provide values as strings. But we want to save the ids as numbers.
		if (event.target.id.includes("Id")) {
			selectedVal = parseInt(selectedVal)
		}
	
		mealWithEdits[event.target.id] = selectedVal
		// update state
		setEditedMeal(mealWithEdits)
	}

    const handleRadioButtonChange = (event) => {
        const mealWithEdits = { ...editedMeal }
        let userChoice = parseInt(event.target.value)
        mealWithEdits.mealTypeId=userChoice
        setEditedMeal(mealWithEdits)

    }

   
    //This block keeeps track of which checkboxes are checked and which are not
    const checkBoxChangeHandleOne = (event) => {
        setCheckedOne(!checkedone)
    }
    const checkBoxChangeHandleTwo = (event) => {
        setCheckedTwo(!checkedtwo)
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
    
    //This will identify what is checked and post appropriately
    const nutrientsToPost = (numberArgument) => {
        let nutriObject={
            mealPacketId: numberArgument,
            nutritionTypeId:0
        }
        const promiseArray=[]
        if(checkedone === true){
            nutriObject.nutritionTypeId=1
            const promise1 = addNutrient(nutriObject)
            promiseArray.push(promise1)
        }
        if(checkedtwo === true){
            nutriObject.nutritionTypeId=2
            const promise2 = addNutrient(nutriObject)
            promiseArray.push(promise2)
        }
        if(checkedthree === true){
            nutriObject.nutritionTypeId=3
            const promise3 = addNutrient(nutriObject)
            promiseArray.push(promise3)
        }
        if(checkedfour === true){
            nutriObject.nutritionTypeId=4
            const promise4 = addNutrient(nutriObject)
            promiseArray.push(promise4)
        }
        if(checkedfive === true){
            nutriObject.nutritionTypeId=5
            const promise5 = addNutrient(nutriObject)
            promiseArray.push(promise5)
        }
        if(checkedsix === true){
            nutriObject.nutritionTypeId=6
            const promise6 = addNutrient(nutriObject)
            promiseArray.push(promise6)
        }
        return promiseArray
        
    }

    // const clearCreateNewMealCard = () => {
    //     setCheckedOne(false)
    //     setCheckedTwo(false)
    //     setCheckedThree(false)
    //     setCheckedFour(false)
    //     setCheckedFive(false)
    //     setCheckedSix(false)
    //     setSingleMeal({
    //         userId:0,
    //         calories:0,
    //         mealTypeId:0,
    //         servings:0,
    //         shelfLifeInDays:0,
    //         name:""
    //     })
    // }
    //This is to make my code shorter, I have to rerender the meal cards a lot
    const renderMealCards = () =>{
        getUsersMealPackets(userNum).then(arrOfMeals => {
            setMeals(arrOfMeals)
        });
    }

    //This area handles posting all of the information to mealPacket, and to mealNutrition
    // const handleCreateButtonPush = () => {
        //add meal packet posts to meal packet
    //     addMealPacket(singleMeal).then(postedMeal => {
    //         const arrayOfNutrientPromises =nutrientsToPost(postedMeal.id)
    //         Promise.all(arrayOfNutrientPromises).then(aThingIdontTouch =>{
    //             clearCreateNewMealCard();
    //             renderMealCards();
    //         })
    //     })
    // }

    return(
        <>
            <section className="topBar">
                {/* eventually this will also be able to display the creation information */}
                <h4>Edit My Meal Card</h4>
            </section>
            <section className="mealCardCarousel">
                {meals.map(meal =>
                    <SingleMealCard key={meal.id} object={meal} render={renderMealCards}/>
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
                                <input type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="name" value={editedMeal.name} />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="calories">Total calories:</label>
                                <input type="number" id="calories" onChange={handleControlledInputChange} name="calories" min="1" max="1000000" value={editedMeal.calories}/>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="servings">Servings:</label>
                                <input type="number" id="servings" onChange={handleControlledInputChange} name="servings" min="1" max="8000" value={editedMeal.servings}/>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="shelfLifeInDays">Shelf Life in Days:</label>
                                <input type="number" id="shelfLifeInDays" onChange={handleControlledInputChange} name="shelfLifeInDays"min="1" max="4000" value={editedMeal.shelfLifeInDays}/>
                            </div>
                        </fieldset>
                    </div>
                    {/* Box2 will also post to MealPacket  */}
                    <div className="mealCreateEntryBox" id="box2">
                        <fieldset>
                            <div className="form-group">
                                <input type="radio" id="breakfast" checked={editedMeal.mealTypeId === 1} onChange={handleRadioButtonChange} name="mealType" value="1"/>
                                <label htmlFor="breakfast">BREAKFAST</label><br/>
                                <input type="radio" id="lunch"  checked={editedMeal.mealTypeId === 2} onChange={handleRadioButtonChange} name="mealType" value="2"/>
                                <label htmlFor="lunch">LUNCH</label><br/>
                                <input type="radio" id="dinner"  checked={editedMeal.mealTypeId === 3} onChange={handleRadioButtonChange} name="mealType" value="3"/>
                                <label htmlFor="dinner">Dinner</label>
                                <input type="radio" id="snack" checked={editedMeal.mealTypeId === 4} onChange={handleRadioButtonChange} name="mealType" value="4"/>
                                <label htmlFor="snack">Snack or Other</label>
                            </div>
                        </fieldset>
                    </div>
                    {/* This will need to post to mealNutrition once per every checked box */}
                    <div className="mealCreateEntryBox" id="box3">
                        <fieldset>
                            <div className="form-group">
                                <input type="checkbox" id="nutrition1" checked={checkedone} onChange={checkBoxChangeHandleOne} name="nutrition1" value="1"/>
                                <label htmlFor="nutrition1"> Grains</label><br/>
                                <input type="checkbox" id="nutrition2" checked={checkedtwo} onChange={ checkBoxChangeHandleTwo} name="nutrition2" value="2"/>
                                <label htmlFor="nutrition2"> Vegetables</label><br/>
                                <input type="checkbox" id="nutrition3" checked={checkedthree} onChange={checkBoxChangeHandleThree} name="nutrition3" value="3"/>
                                <label htmlFor="nutrition3"> Fruits</label><br/>
                                <input type="checkbox" id="nutrition4"  checked={checkedfour} onChange={checkBoxChangeHandleFour} name="nutrition4" value="4"/>
                                <label htmlFor="nutrition4"> Proteins</label><br/>
                                <input type="checkbox" id="nutrition5"  checked={checkedfive} onChange={checkBoxChangeHandleFive} name="nutrition5" value="5"/>
                                <label htmlFor="nutrition5"> Dairy</label><br/>
                                <input type="checkbox" id="nutrition6"  checked={checkedsix} onChange={checkBoxChangeHandleSix} name="nutrition6" value="6"/>
                                <label htmlFor="nutrition6"> Other</label><br/>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div id="createButtonArea">
                    <button>Create My Meal Card</button>
                </div>
            </section>
        </>
    )
}