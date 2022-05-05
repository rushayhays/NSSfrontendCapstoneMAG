//This will show the ratio of meal types

import { PieChart } from "react-minimal-pie-chart"
import { useState, useEffect } from "react"

export const MealPieChart = ({oneBigArray}) =>{

    const[dinnerarr, setDinnerArr] = oneBigArray[0]
    const[luncharr, setLunchArr] = oneBigArray[1]
    const[breakfastarr, setBreakfastArr] = oneBigArray[2]
    const[otherarr, setOtherArr] = oneBigArray[3]

    const[piedata, setPieData] = useState([
        { title: 'One', value: 10, color: '#E38627' },
        { title: 'Two', value: 15, color: '#C13C37' },
        { title: 'Three', value: 20, color: '#6A2135' },
        { title: 'Three', value: 20, color: '#6A2135' },
    ])

    const valuesetter = () =>{
        const newData=[
            { title: 'Dinners', value: dinnerarr.length, color: '#C04CF0' },
            { title: 'Lunches', value: luncharr.length, color: '#9DFFF9' },
            { title: 'Breakfasts', value: breakfastarr.length, color: '#FF521B' },
            { title: 'Snacks', value: otherarr.length, color: '#FFDF64' },
        ]

        return newData

    }

    useEffect(()=> {
        const newPieValues = valuesetter();
        setPieData(newPieValues)
        
    }, [otherarr]);

    
    return(
        <PieChart
            data={piedata}
            lineWidth={60}
            label={( {dataEntry} ) => `${Math.round(dataEntry.percentage)} %`}
        />
    )
}