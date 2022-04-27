//This will structure all the data for a single mealPacket into a card that can add meal info to the reserve
//Need mealPacket and mealNutrition

import React from "react"
import "./singleMealCard.css"
import { getNutritionForSingleMeal, deleteMealNutrientType, deleteMealPacket } from "../../../modules/mealPacketManager"
import { useState, useEffect } from "react"
import { NutritionButton } from "./nutritionButton/NutritionButton"
import { Link } from "react-router-dom"

export const SingleMealCard =({object, render}) =>{

    // const userNum =1;
    // need to get the nutrition types for this Meal packet

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


    return(
        <>
            <div className="mealPacket" id={object.id}>
                <div className="mealCardNameArea">
                    <h5>{object.name}</h5>
                </div>
                <div className="mealNumberRunDown">
                    <p className="mealNumbers">{object.mealtype?.name}</p>
                    <p className="mealNumbers">{object.calories}</p>
                    <p className="mealNumbers">{object.servings}</p>
                    <p className="mealNumbers">{object.shelfLifeInDays}</p>
                </div>
                <div className="nutriButtonArea">
                    <h4 id="nutritionTitle">Nutrition</h4>
                    {nutritionGroups.map(nutritionGroup=>
                        <NutritionButton key={nutritionGroup.id} nutriObject={nutritionGroup}/>
                    )}
                </div>
                <div className="mealCardButtonArea">
                    <Link to={`/foodstorage/editmymealcard/${object.id}`}>
                    <button>Edit</button>
                    </Link>
                    {/* Take a look at having two things happen when something is clicked */}
                    <button onClick={handleClickDelete} >Delete</button>

                </div>
            </div>
        </>
    )
}