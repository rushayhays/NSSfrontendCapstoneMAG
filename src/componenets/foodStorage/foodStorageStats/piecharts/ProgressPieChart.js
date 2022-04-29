//This will compare calories in food storage against calories needed to acheive goal.

import { PieChart } from "react-minimal-pie-chart"
import { getReserveInfo } from "../../../../modules/pieManager"
import { useState, useEffect } from "react"

export const ProgressPieChart = ({parentFoodStorage}) => {

    const[foodstorage, setFoodStorage] = parentFoodStorage
    const[reserveArr, setReserveArr] = useState([])

    let numerator = 50;
    let denominator = 50;

    // value is not in percentages if value1=50 and value2=50
    // then pieChart adds them together to get 100 as the denominator and each 
    //pie portion then covers 50% of that pie
    let dataValues = [
        {title: 'One', value: numerator , color: '#E38627'},
        {title: 'Two', value: denominator , color: '#C13C37'}
    ]

    useEffect(()=> {
        getReserveInfo(1).then(infoArray => {
            setReserveArr(infoArray)
        })
        numerator = Math.floor(valuesForPieChart())
        
    }, []);

    const calcCaloriesInMyFoodStorage = () => {
        let CaloriesInMyFoodStorage = 0;
        foodstorage.forEach(meal =>{
            CaloriesInMyFoodStorage += meal.calories
        })
        return CaloriesInMyFoodStorage
    }

    const calcCaloriesNeededToMeetGoal = () =>{
        //This is a constant numder it never needs to change
        const caloriesPerPersonPerDay = 2000;

        //This will grab the reserve object and get specific
        //numbers from it
        const reserveObj = reserveArr[0]
        const peopleInPlan = reserveObj.numOfPeople
        const numOfDays = reserveObj.reserveGoal

        //This calculates the calories needed
        const caloriesNeededToMeetGoal = peopleInPlan * caloriesPerPersonPerDay * numOfDays

        return caloriesNeededToMeetGoal
    }

    const valuesForPieChart = () =>{
        const currentCalories = calcCaloriesInMyFoodStorage();
        const neededCalories = calcCaloriesNeededToMeetGoal();

        const numerator = ((currentCalories/neededCalories)*100)

        return numerator
    }




    return(
        <PieChart
            data={dataValues}
            lineWidth={60}
        />
    )
}