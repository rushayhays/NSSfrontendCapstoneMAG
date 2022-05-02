//This will compare calories in food storage against calories needed to acheive goal.

import { PieChart } from "react-minimal-pie-chart"
import { getReserveInfo } from "../../../../modules/pieManager"
import { useState, useEffect } from "react"

export const ProgressPieChart = ({parentFoodStorage}) => {

    const[foodstorage, setFoodStorage] = parentFoodStorage
    const[reserveArr, setReserveArr] = useState([])


    // value is not in percentages if value1=50 and value2=50
    // then pieChart adds them together to get 100 as the denominator and each 
    //pie portion then covers 50% of that pie
    const[dataValues, setDataValues] = useState([
        {title: 'One', value:  10, color: '#E38627'},
        {title: 'Two', value:  10, color: '#C13C37'}
    ])
    //Need to figure out how to get a label on here
    
    
    const calcCaloriesInMyFoodStorage = () => {
        
        let CaloriesInMyFoodStorage = 0;
        foodstorage.forEach(meal =>{
            const caloriesAsANum  = parseInt(meal.mealPacket.calories)
            CaloriesInMyFoodStorage += caloriesAsANum
        })
        return CaloriesInMyFoodStorage
    }
    
    const calcCaloriesNeededToMeetGoal = () =>{
        //This is a constant numder it never needs to change
        const caloriesPerPersonPerDay = 2000;
        
        //This will grab the reserve object and get specific
        //numbers from it
        const reserveObj = reserveArr[0]
        const peopleInPlan = reserveObj?.numOfPeople
        console.log("da people" + peopleInPlan)
        const numOfDays = reserveObj?.goal
        console.log("da days" + numOfDays)
        
        //This calculates the calories needed
        const caloriesNeededToMeetGoal = parseInt(peopleInPlan) * parseInt(caloriesPerPersonPerDay) * parseInt(numOfDays)
        console.log("how many c do you need" + caloriesNeededToMeetGoal)
        return caloriesNeededToMeetGoal
    }
    
    const valuesForPieChart = (myCurrentCalories) =>{
        const calorieGoal = calcCaloriesNeededToMeetGoal();
        console.log("this is the Goal "+calorieGoal)

        
        const remainingCaloriesNeeded = parseInt(calorieGoal) - parseInt(myCurrentCalories)
        console.log(remainingCaloriesNeeded)
        const percentageCompletion = Math.floor((myCurrentCalories/calorieGoal)*100)
   
        let valueArr = [
            {title: 'One', value: myCurrentCalories, color: '#E38627'},
            {title: 'Two', value: remainingCaloriesNeeded, color: '#C13C37'}
        ]
        
        setDataValues(valueArr)
    }
    
    
    useEffect(()=> {
        getReserveInfo(1).then(infoArray => {
            setReserveArr(infoArray)
            const myCalories = calcCaloriesInMyFoodStorage()
            //set my calories as a useState?
            valuesForPieChart(myCalories)
        })
                
    }, []);


    return(
        <PieChart
            data={dataValues}
            lineWidth={60}
        />
    )
}