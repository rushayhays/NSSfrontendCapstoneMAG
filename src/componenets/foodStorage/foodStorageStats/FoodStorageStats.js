//This will display inside of FoodStorage
//It will have 1 to 3 piecharts

import "./foodStorageStats.css"
import { PieChart } from "react-minimal-pie-chart"

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
                    <PieChart
                        data={[
                            { title: 'One', value: 10, color: '#E38627' },
                            { title: 'Two', value: 15, color: '#C13C37' },
                            { title: 'Three', value: 20, color: '#6A2135' },
                        ]}
                        lineWidth={60}
                    />;
                    </div>
                    <div id="pieChartTwo">
                        <PieChart
                            data={[
                                { title: 'One', value: 10, color: '#E38627' },
                                { title: 'Two', value: 15, color: '#C13C37' },
                                { title: 'Three', value: 20, color: '#6A2135' },
                            ]}
                            lineWidth={60}
                        />;
                    </div>
                    <div id="pieChartThree">
                        <PieChart
                            data={[
                                { title: 'One', value: 10, color: '#E38627' },
                                { title: 'Two', value: 15, color: '#C13C37' },
                                { title: 'Three', value: 20, color: '#6A2135' },
                            ]}
                            lineWidth={60}
                        />;
                    </div>

                </div>
            </div>
        </>
    )
}