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

    const [pieData, setPieData] = useState([
        { title: 'Grain', value: 100, color: '#E38627' },
        { title: 'Veggie', value: 200, color: '#C13C37' },
        { title: 'Fruit', value: 200, color: '#C7B8EA' },
        { title: 'Protein', value: 200, color: '#73A6AD' },
        { title: 'Dairy', value: 200, color: '#4EFFEF' },
        { title: 'Other', value: 200, color: '#44CF6C' },
    ])

    //Make sure to change this to dynamically get the user Id
    useEffect(()=> {
        getNutritionInfo(1).then(arrOfInfo => {
            setNutritionArray(arrOfInfo)
        
        })
    }, []);

    useEffect(()=> {
        const mealNutritionArray=mealRatios()
        const newData = valueFiltering(mealNutritionArray)
        setPieData(newData)
    }, [nutritionarray]);

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
                        nutritionCounterArray.push(nameOfNutri)
                    }
                }
            })
        })
        return nutritionCounterArray
    }

    //This function will filter through mealNutritionArray to create arrays with only one number in them
    //The length of these arrays will be the values passed to the pie chart
    const valueFiltering = (anArray) =>{
        //this creates the filtered arrays
        const grainsArr=anArray.filter(item => item === 1);
        const veggieArr = anArray.filter(item => item === 2);
        const fruitArr = anArray.filter(item => item === 3);
        const proteinArr = anArray.filter(item => item === 4);
        const dairyArr = anArray.filter(item => item === 5);
        const otherArr = anArray.filter(item => item === 6);

        //Now the length is needed
        const pieValueGrain = grainsArr.length
        const pieValueVeggie = veggieArr.length
        const pieValueFruit = fruitArr.length
        const pieValueProtein = proteinArr.length
        const pieValueDairy = dairyArr.length
        const pieValueOther = otherArr.length

        //Now set piechart
        const newPieData = [
            { title: 'Grain', value: pieValueGrain, color: '#E38627' },
            { title: 'Veggie', value: pieValueVeggie, color: '#C13C37' },
            { title: 'Fruit', value: pieValueFruit, color: '#C7B8EA' },
            { title: 'Protein', value: pieValueProtein, color: '#73A6AD' },
            { title: 'Dairy', value: pieValueDairy, color: '#4EFFEF' },
            { title: 'Other', value: pieValueOther, color: '#44CF6C' },
        ]
        return newPieData
    }


    return(
        <PieChart
            data={pieData}
            label={( {dataEntry} ) => `${Math.round(dataEntry.percentage)} %`}
            lineWidth={60}
            labelPosition={62}
        />
    )
}