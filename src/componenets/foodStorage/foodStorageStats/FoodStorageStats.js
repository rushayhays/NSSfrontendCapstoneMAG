//This will display inside of FoodStorage
//It will have 1 to 3 piecharts

import "./foodStorageStats.css"
import { PieChart } from "react-minimal-pie-chart"
import { ProgressPieChart } from "./piecharts/ProgressPieChart"
import { NutritionPieChart } from "./piecharts/NutritionPieChart"
import { MealPieChart } from "./piecharts/MealPieChart"
import { useEffect, useState } from "react"
import { getReserveInfo } from "../../../modules/pieManager"

export const FoodStorageStats =({foodstorage, oneBigArray}) =>{

    const userObject = JSON.parse(sessionStorage.getItem("mag_user"))
    const currentUserId = parseInt(userObject.id)

    const[reserveobject, setReserveObject]=useState(
        {
            id: 0,
            userId: 0,
            goal: 0,
            numOfPeople: 0
        }
    )

    useEffect(()=> {
        getReserveInfo(currentUserId).then(infoArray => {
            const infoObject = infoArray[0]
            setReserveObject(infoObject)
        })
    }, [foodstorage]);

    return(
        <>
            <div id="foodStorageStatsBox">
                <div className="statsHeaderBox">
                    <h4>{userObject.name}'s Food Plan</h4>
                    <div id="statTagArea">
                        <button className="statTag">Short Term</button>
                        <button className="statTag">{reserveobject.numOfPeople} People</button>
                        <button className="statTag">{reserveobject.goal} Days</button>
                    </div>
                </div>
                <div className="statsPieBox">
                    <h5>Progress to Goal</h5>
                    <div id="pieChartOne">
                        <ProgressPieChart parentFoodStorage={foodstorage}/>
                    </div>
                    <h5>Nutrition</h5>
                    <div id="pieChartTwo">
                        <NutritionPieChart parentFoodStorage={foodstorage}/>
                    </div>
                    <h5>Meals</h5>
                    <div id="pieChartThree">
                        <MealPieChart oneBigArray={oneBigArray}/>
                    </div>

                </div>
            </div>
        </>
    )
}