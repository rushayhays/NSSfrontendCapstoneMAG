//This will display inside of FoodStorage
//It will have 1 to 3 piecharts

import "./foodStorageStats.css"
import { PieChart } from "react-minimal-pie-chart"
import { ProgressPieChart } from "./piecharts/ProgressPieChart"
import { NutritionPieChart } from "./piecharts/NutritionPieChart"
import { MealPieChart } from "./piecharts/MealPieChart"
import { useEffect } from "react"

export const FoodStorageStats =({foodstorage, oneBigArray}) =>{

    useEffect(()=> {
        
    }, [foodstorage]);

    return(
        <>
            <div id="foodStorageStatsBox">
                <div className="statsHeaderBox">
                    <h4>Red October's Food Plan</h4>
                    <div id="statTagArea">
                        <button className="statTag">Short Term</button>
                        <button className="statTag">4 People</button>
                        <button className="statTag">3 Months</button>
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