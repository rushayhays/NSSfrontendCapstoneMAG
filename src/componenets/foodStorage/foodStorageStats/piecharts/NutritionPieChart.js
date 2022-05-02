//This will give a percentage breakdown of Food groups

import { PieChart } from "react-minimal-pie-chart"
import { getNutritionInfo } from "../../../../modules/pieManager"
import { useState, useEffect } from "react"

export const NutritionPieChart = ({parentFoodStorage}) => {

    const[foodstorage, setFoodStorage] = parentFoodStorage
    const[nutritionarray, setNutritionArray] = useState([
        {
            id: 0,
            nutritionTypeId: 0,
            mealPacketId: 0,
            userId: 1,
            nutritionType: {
                id: 0,
                name: ""
            }
        
        }
    ])

    //MAke sure to change this to dynamically get the user Id
    useEffect(()=> {
        getNutritionInfo(1).then(arrOfInfo => {
            setNutritionArray(arrOfInfo)
            const mealNutritionArray=mealRatios()
            console.log(mealNutritionArray)
        })
    }, []);

    //This function comapres the mealPacket Id of an Item in food storage against all of the food packet Ids for an item in mealTypeNutritionType
    //When the mealpacket Ids match, then the name of the nutrtion type is pushed to an array equal to the amount of servings in that meal.
    //If a meal has two servings and contains protein and grain the array will add [grain, grain, protein, protien] 
    const mealRatios = () =>{
        let nutritionCounterArray=[]

        foodstorage.forEach(foodPacket =>{
            const mealId=foodPacket.mealPacketId
            const servings = foodPacket.mealPacket.servings
            nutritionarray.forEach(nutriItem =>{
                if(mealId === nutriItem.mealPacketId){
                    let x=servings
                    for(x; x>0; x--){
                        const nameOfNutri = nutriItem.nutritionTypeId
                        nutritionCounterArray.push(nutriItem.nutritionTypeId)
                    }
                }
            })
        })
        return nutritionCounterArray
    }

    //This function will filter through mealNutritionArray to create arrays with only one number in them
    //The length of these arrays will be the values passed to the pie chart
    


    const dataEntry = [
        { title: 'One', value: 100, color: '#E38627' },
        { title: 'Two', value: 200, color: '#C13C37' },
    ]
    return(
        <PieChart
            data={[
                { title: 'One', value: 100, color: '#E38627' },
                { title: 'Two', value: 200, color: '#C13C37' },
            ]}
            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
            lineWidth={60}
            labelPosition={62}
        />
    )
}