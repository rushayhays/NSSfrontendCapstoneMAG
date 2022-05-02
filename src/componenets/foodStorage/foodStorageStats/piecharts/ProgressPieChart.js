//This will compare calories in food storage against calories needed to acheive goal.

import { PieChart } from "react-minimal-pie-chart"
import { getReserveInfo } from "../../../../modules/pieManager"
import { useState, useEffect } from "react"

export const ProgressPieChart = ({parentFoodStorage}) => {

    const[foodstorage, setFoodStorage] = parentFoodStorage
    const[reserveArr, setReserveArr] = useState([{
        id: 1,
        userId: 1,
        goal: 92,
        numOfPeople: 4
    }
    ])


    // value is not in percentages. If value1=50 and value2=50
    // then pieChart adds them together to get 100 as the denominator and each 
    //pie portion then covers 50% of that pie
    const[dataValues, setDataValues] = useState([
        {title: 'One', value:  10, color: '#E38627'},
        {title: 'Two', value:  10, color: '#C13C37'}
    ])
    //Need to figure out how to get a label on here
    
    const[mycalories, setMyCalories]=useState(0)
    
    const calcCaloriesInMyFoodStorage = () => {
        
        let caloriesInMyFoodStorage = 0;
        foodstorage.forEach(meal =>{
            const caloriesAsANum  = parseInt(meal.mealPacket.calories)
            caloriesInMyFoodStorage += caloriesAsANum
        })
        return caloriesInMyFoodStorage
    }
    
    const calcCaloriesNeededToMeetGoal = () =>{
        //This is a constant numder it never needs to change
        const caloriesPerPersonPerDay = 2000;
        
        //This will grab the reserve object and get specific
        //numbers from it
        const reserveObj = reserveArr[0]
        const peopleInPlan = reserveObj?.numOfPeople
        const numOfDays = reserveObj?.goal
        
        //This calculates the calories needed
        const caloriesNeededToMeetGoal = parseInt(peopleInPlan) * parseInt(caloriesPerPersonPerDay) * parseInt(numOfDays)
        return caloriesNeededToMeetGoal
    }
    
    const valuesForPieChart = (myCurrentCalories) =>{
        const calorieGoal = calcCaloriesNeededToMeetGoal();
        
        const remainingCaloriesNeeded = parseInt(calorieGoal) - parseInt(myCurrentCalories)
        const percentageCompletion = Math.floor((myCurrentCalories/calorieGoal)*100)
   
        let valueArr = [
            {title: 'One', value: myCurrentCalories, color: '#E38627'},
            {title: 'Two', value: remainingCaloriesNeeded, color: '#C13C37'}
        ]
        
        return valueArr
    }
    
    
    useEffect(()=> {
        getReserveInfo(1).then(infoArray => {
            setReserveArr(infoArray)
        })
                
    }, []);

    useEffect(()=> {
        const myFoodCalories = calcCaloriesInMyFoodStorage()
        setMyCalories(myFoodCalories)
                
    }, [foodstorage]);

    useEffect(()=> {
    
        const newPieValues = valuesForPieChart(mycalories);
        setDataValues(newPieValues);
    
                
    }, [mycalories]);




    return(
        <PieChart
            data={dataValues}
            lineWidth={60}
            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
            labelPosition={62}
        />
    )
}