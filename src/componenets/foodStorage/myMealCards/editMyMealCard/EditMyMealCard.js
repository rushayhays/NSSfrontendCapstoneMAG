
import "./editMyMealCard.css"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getUsersMealPackets, addNutrient, getSingleUserMealPacket, getNutritionForSingleMeal, deleteNutrient, updateMeal } from "../../../../modules/mealPacketManager" 
import { SingleMealCard } from "../SingleMealCard"
import { useNavigate } from "react-router-dom"

export const EditMyMealCard = () => {

    const userObject = JSON.parse(sessionStorage.getItem("mag_user"))
    const currentUserId = parseInt(userObject.id)

    const{mealId} = useParams()

    const[lengthValue, setLengthValue]=useState(0)
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
        userId:0,
        calories:0,
        mealTypeId:0,
        servings:0,
        shelfLifeInDays:0,
        name:""
    })


    const [nutritionAreas, setNutritionAreas] = useState([{
        userId: currentUserId,
        nutritionTypeId: 0,
        mealPacketId: 0
    }])

    

    

    //This will keeptrack of whether a box is checked or unchecked
    const [checkedone, setCheckedOne] = useState(false)
    const [checkedtwo, setCheckedTwo] = useState(false)
    const [checkedthree, setCheckedThree] = useState(false)
    const [checkedfour, setCheckedFour] = useState(false)
    const [checkedfive, setCheckedFive] = useState(false)
    const [checkedsix, setCheckedSix] = useState(false)

    //Once a card is edited Navigate back to MyMealCards
    const navigate = useNavigate();

    //This will set the default state of the chckboxes to match
    //what nutrients are listed
    const setUpNutritionAreasForEditing = () => {
        nutritionAreas.forEach(object => {
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

    
    useEffect(()=> {
        getUsersMealPackets(currentUserId).then(arrOfMeals => {
            setMeals(arrOfMeals)
        });
        getSingleUserMealPacket(mealId).then(object => {
            setEditedMeal(object)
        })
        getNutritionForSingleMeal(mealId).then(arrOfNTypes => {
            setNutritionAreas(arrOfNTypes)
            setLengthValue(lengthValue=> lengthValue+1)
        });
    }, []);

    //This ensures that nutrtionAreas has populated before running setUpNutritionAreasForEditing
    useEffect(()=>{
        setUpNutritionAreasForEditing()
    }, [lengthValue]);


    
    const handleControlledInputChange = (event) => {
        const mealWithEdits = { ...editedMeal }
        mealWithEdits.userId = currentUserId;
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
    
    //This area sets up functions that check if certain nutrition types already exist
    const hasNutrientId1 = (object) => object.nutritionTypeId === 1;
    const hasNutrientId2 = (object) => object.nutritionTypeId === 2;
    const hasNutrientId3 = (object) => object.nutritionTypeId === 3;
    const hasNutrientId4 = (object) => object.nutritionTypeId === 4;
    const hasNutrientId5 = (object) => object.nutritionTypeId === 5;
    const hasNutrientId6 = (object) => object.nutritionTypeId === 6;

    //If something needs to be deleted this will find the mealTypeNutritionTypeId so that
    //it can be fed to deleteNutrient

    //This thinh has a bug the wrong things are being deleted
    const nutrientObjectFinder = (num) => {
        const singleObject = nutritionAreas.find(object => object.nutritionTypeId === num);
        return singleObject;
    }

    //This will identify what is checked and post appropriately
    const nutrientsToPost = (numberArgument) => {
        let nutriObject={
            mealPacketId: numberArgument,
            nutritionTypeId:0,
            userId: currentUserId
        }
        
        const addPromiseArray=[]
        const deletePromiseArray= []
        //Logic for1
        if(checkedone === true && !nutritionAreas.some(hasNutrientId1)){
            nutriObject.nutritionTypeId=1
            const promise1 = addNutrient(nutriObject)
            addPromiseArray.push(promise1)
        }
        if(checkedone === false && nutritionAreas.some(hasNutrientId1)){
            const objectToDelete = nutrientObjectFinder(1)
            const dPromise1 = deleteNutrient(objectToDelete.id);
            deletePromiseArray.push(dPromise1)
        }
        //for2
        if(checkedtwo === true && !nutritionAreas.some(hasNutrientId2)){
            nutriObject.nutritionTypeId=2
            const promise2 = addNutrient(nutriObject)
            addPromiseArray.push(promise2)
        }
        if(checkedtwo === false && nutritionAreas.some(hasNutrientId2)){
            const objectToDelete = nutrientObjectFinder(2)
            const dPromise2 = deleteNutrient(objectToDelete.id);
            deletePromiseArray.push(dPromise2)
        }
        //for3
        if(checkedthree === true && !nutritionAreas.some(hasNutrientId3)){
            nutriObject.nutritionTypeId=3
            const promise3 = addNutrient(nutriObject)
            addPromiseArray.push(promise3)
        }
        if(checkedthree === false && nutritionAreas.some(hasNutrientId3)){
            const objectToDelete = nutrientObjectFinder(3)
            const dPromise3 = deleteNutrient(objectToDelete.id);
            deletePromiseArray.push(dPromise3)
        }
        //for4
        if(checkedfour === true && !nutritionAreas.some(hasNutrientId4)){
            nutriObject.nutritionTypeId=4
            const promise4 = addNutrient(nutriObject)
            addPromiseArray.push(promise4)
        }
        if(checkedfour === false && nutritionAreas.some(hasNutrientId4)){
            const objectToDelete = nutrientObjectFinder(4)
            const dPromise4 = deleteNutrient(objectToDelete.id);
            deletePromiseArray.push(dPromise4)
        }
        //for5
        if(checkedfive === true && !nutritionAreas.some(hasNutrientId5)){
            nutriObject.nutritionTypeId=5
            const promise5 = addNutrient(nutriObject)
            addPromiseArray.push(promise5)
        }
        if(checkedfive === false && nutritionAreas.some(hasNutrientId5)){
            const objectToDelete = nutrientObjectFinder(5)
            const dPromise5 = deleteNutrient(objectToDelete.id);
            deletePromiseArray.push(dPromise5)
        }
        //for6
        if(checkedsix === true && !nutritionAreas.some(hasNutrientId6)){
            nutriObject.nutritionTypeId=6
            const promise6 = addNutrient(nutriObject)
            addPromiseArray.push(promise6)
        }
        if(checkedsix === false && nutritionAreas.some(hasNutrientId6)){
            const objectToDelete = nutrientObjectFinder(6)
            const dPromise6 = deleteNutrient(objectToDelete.id);
            deletePromiseArray.push(dPromise6)
        }
        return addPromiseArray
        
    }


   
    //This is to make my code shorter, I have to rerender the meal cards a lot
    const renderMealCards = () =>{
        getUsersMealPackets(currentUserId).then(arrOfMeals => {
            setMeals(arrOfMeals)
        });
    }

    //This area handles posting all of the information to mealPacket, and to mealNutrition
    const handleEditButtonPush = () => {
        // patch mealPacket edits to mealPacket
        updateMeal(editedMeal).then(postedMeal => {
            const array = nutrientsToPost(postedMeal.id)
            navigate("/foodstorage/mymealcards")
        })
    }

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
                    <h4>Edit a Meal Card</h4>
                </div>
                <div className="mealCreateEntryArea">
                    {/* Box1 will grab info to post to mealPacket */}
                    <div className="mealCreateEntryBox" id="box1">
                        
                        <div className="form-area">
                            <label id="label1" htmlFor="name">Name:</label><br/>
                            <input type="text" id="name" onChange={handleControlledInputChange}  autoFocus placeholder="name" value={editedMeal.name} />
                        </div>
                    
                    
                        <div className="form-area">
                            <label htmlFor="calories">Total calories:</label><br/>
                            <input type="number" id="calories" onChange={handleControlledInputChange} name="calories" min="1" max="1000000" value={editedMeal.calories}/>
                        </div>
                
                
                        <div className="form-area">
                            <label htmlFor="servings">Servings:</label><br/>
                            <input type="number" id="servings" onChange={handleControlledInputChange} name="servings" min="1" max="8000" value={editedMeal.servings}/>
                        </div>
                    
                    
                        <div className="form-area">
                            <label htmlFor="shelfLifeInDays">Shelf Life in Days:</label><br/>
                            <input type="number" id="shelfLifeInDays" onChange={handleControlledInputChange} name="shelfLifeInDays"min="1" max="4000" value={editedMeal.shelfLifeInDays}/>
                        </div>
                        
                    </div>
                    {/* Box2 will also post to MealPacket  */}
                    <div className="mealCreateEntryBox" id="box2">
                        <fieldset className="mealField">
                            <div className="form-area">
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
                        <fieldset className="mealField">
                            <div className="form-area">
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
                    <button id="editMyMealButton" onClick={handleEditButtonPush}>Edit My Meal Card</button>
                </div>
            </section>
        </>
    )
}