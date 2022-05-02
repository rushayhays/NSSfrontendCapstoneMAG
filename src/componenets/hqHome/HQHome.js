//This will load the GIANT pie chart that is also a link to the FoodStorage area
//It will also display disasters and possibly badges

import { UserBanner } from "../userBanner/UserBanner"
import "./hqHome.css"
import { Link } from "react-router-dom"
import { HQPieChart } from "./HQPieChart"

export const HQHome = () => {
    return(
        <>
            < UserBanner />

            <div className="hqHomeBody">
                < Link to={"/foodStorage"}>
                <div className="hqHomeFoodPie">
                <HQPieChart/>
                </div>
                </Link>
            </div>

        
        </>
    )
}