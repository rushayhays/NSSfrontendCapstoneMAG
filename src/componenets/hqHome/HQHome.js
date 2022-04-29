//This will load the GIANT pie chart that is also a link to the FoodStorage area
//It will also display disasters and possibly badges

import { UserBanner } from "../userBanner/UserBanner"
import "./hqHome.css"
import { Link } from "react-router-dom"
import { PieChart } from "react-minimal-pie-chart"

export const HQHome = () => {
    return(
        <>
            < UserBanner />

            <div className="hqHomeBody">
                < Link to={"/foodStorage"}>
                <div className="hqHomeFoodPie">
                <PieChart
                    data={[
                        { title: 'One', value: 25, color: `#FFFF46` },
                        { title: 'Two', value: 75, color: '#000000' },
                    ]}
                    lineWidth={60}
                />
                </div>
                </Link>
            </div>

        
        </>
    )
}