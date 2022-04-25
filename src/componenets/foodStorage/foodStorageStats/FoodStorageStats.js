//This will display inside of FoodStorage
//It will have 1 to 3 piecharts

import "./foodStorageStats.css"

export const FoodStorageStats =() =>{
    return(
        <>
            <div id="foodStorageStatsBox">
                <div className="statsHeaderBox">
                    <h4>Red October's Food Plan</h4>
                    <div id="statTagArea">
                        <button className="statTag">Short Term</button>
                        <button className="statTag">4 People</button>
                        <button className="statTag">3 Months</button>
                    </div>
                </div>
                <div className="statsPieBox">
                    <div id="pieChartOne">
                        <p>Pie 1</p>
                    </div>
                    <div id="pieChartTwo">
                        <p>Pie 2</p>
                    </div>
                    <div id="pieChartThree">
                        <p>Pie 3</p>
                    </div>

                </div>
            </div>
        </>
    )
}