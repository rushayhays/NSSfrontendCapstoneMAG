//This will give a percentage breakdown of Food groups

import { PieChart } from "react-minimal-pie-chart"

export const NutritionPieChart = ({parentFoodStorage}) => {

    const[foodstorage, setFoodStorage] = parentFoodStorage

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