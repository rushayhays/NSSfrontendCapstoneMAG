//This will give a percentage breakdown of Food groups

import { PieChart } from "react-minimal-pie-chart"

export const NutritionPieChart = () => {
    return(
        <PieChart
            data={[
                { title: 'One', value: 100, color: '#E38627' },
                { title: 'Two', value: 200, color: '#C13C37' },
            ]}
            lineWidth={60}
        />
    )
}