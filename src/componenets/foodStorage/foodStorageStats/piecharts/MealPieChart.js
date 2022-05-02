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
            { title: 'One', value: dinnerarr.length, color: '#E38627' },
            { title: 'Two', value: luncharr.length, color: '#C13C37' },
            { title: 'Three', value: breakfastarr.length, color: '#6A2135' },
            { title: 'Three', value: otherarr.length, color: '#44CF6C' },
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