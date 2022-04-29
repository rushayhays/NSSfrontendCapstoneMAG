//This will give a percentage breakdown of Food groups

import { PieChart } from "react-minimal-pie-chart"

export const NutritionPieChart = () => {
    return(
        <PieChart
            data={[
                { title: 'One', value: 10, color: '#E38627' },
                { title: 'Two', value: 15, color: '#C13C37' },
                { title: 'Three', value: 20, color: '#6A2135' },
            ]}
            lineWidth={60}
        />
    )
}