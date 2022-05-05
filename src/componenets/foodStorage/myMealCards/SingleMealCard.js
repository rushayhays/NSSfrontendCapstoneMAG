//This will structure all the data for a single mealPacket into a card that can add meal info to the reserve
//Need mealPacket and mealNutrition

import React from "react"
import "./singleMealCard.css"
import { getNutritionForSingleMeal, deleteMealNutrientType, deleteMealPacket } from "../../../modules/mealPacketManager"
import { useState, useEffect } from "react"
import { NutritionButton } from "./nutritionButton/NutritionButton"
import { Link } from "react-router-dom"
import { addFood } from "../../../modules/myFoodStorageManager"

export const SingleMealCard =({object, render, renderFoodArray}) =>{

    // const userNum =1;
    // need to get the nutrition types for this Meal packet
    const userObject = JSON.parse(sessionStorage.getItem("mag_user"))
    const currentUserId = parseInt(userObject.id)

    

    

    const [nutritionGroups, setNutritionGroups] = useState([{
        "id": 0,
        "nutritionTypeId": 0,
        "mealPacketId": 0,
    }])

    useEffect(()=> {
        getNutritionForSingleMeal(object.id).then(arrOfNTypes => {
            setNutritionGroups(arrOfNTypes)
        });
    }, []);

    const nutrientPromiseArrayMaker = () => {
        const nutrientPromiseArray=[];
        nutritionGroups.forEach(nutriObject => {
            const nutriPromise = deleteMealNutrientType(nutriObject.id)
            nutrientPromiseArray.push(nutriPromise)
        })
        return nutrientPromiseArray
    }


    //Try putting a promise.all in here to control nutrient deletions
    const handleClickDelete = () => {
        const arrayOfNutrientPromises = nutrientPromiseArrayMaker()
        Promise.all(arrayOfNutrientPromises).then(returnedObjectIdoNothingWith => {
            deleteMealPacket(object.id).then(donttouch => {
                render();
            })
        })
    }
    //This should post an object to reserveMeals and cause a popup window to appear with info the user
    //needs to write on the packet
    const handleAddMeal = () =>{

        //create a timestamp
        const dateAdded = Date.now()

        const reserveMealObject={
            mealPacketId: object.id,
            reserveId: currentUserId,
            dateAddedTimestamp: dateAdded
        }

        addFood(reserveMealObject)
        renderFoodArray[5](currentUserId);

    }


    return(
        <>
            <div className="mealPacket" id={object.id}>
                <div className="mealCardNameArea">
                    <h5 className="mealTitle">{object.name}</h5>
                </div>
                <div className="mealNumberRunDown">
                    <h4 id="nutritionTitle">Nutrition</h4>
                    <p className="mealNumbers">Calories| {object.calories}</p>
                    <p className="mealNumbers">Servings| {object.servings}</p>
                    <p className="mealNumbers">Shelf-Life| {object.shelfLifeInDays} days</p>
                </div>
                <div className="nutriButtonArea">
                    <h4 id="groupsTitle">Food Groups</h4>
                    {nutritionGroups.map(nutritionGroup=>
                        <NutritionButton key={nutritionGroup.id} nutriObject={nutritionGroup}/>
                    )}
                </div>
                <div className="mealCardButtonArea">
                    <Link to={`/foodstorage/editmymealcard/${object.id}`}>
                    <button>Edit</button>
                    </Link>
                    <button onClick={handleAddMeal}>Add Meal</button>
                    <button onClick={handleClickDelete} >Delete</button>

                </div>
            </div>
        </>
    )
}