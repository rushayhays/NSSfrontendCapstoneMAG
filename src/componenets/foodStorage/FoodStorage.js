//This will hold the FoodStorageStats and a navBar with links to MyFoodStorage, MyMealCards, and About
//Make it so that MyFoodStorage shows up when you first load the page.

import "./foodStorage.css"
import { UserBanner } from "../userBanner/UserBanner"
import { FoodStorageStats } from "./foodStorageStats/FoodStorageStats"
import { FoodNavBar } from "./foodNav/FoodNavBar"
import { Outlet, Link } from "react-router-dom"


export const FoodStorage = () => {
    return(
        <>
            <Link to={"/hqhome"}>
           <UserBanner/>
            </Link>
           <section className="foodStorageMainBox">
               <div className="foodStorageLeft">
                    <FoodStorageStats/>
               </div>
               <div className="foodStorageRight">
                    <div id="foodStorageNavBar">
                        <FoodNavBar/>
                    </div>
                    <div id="foodStorageOutlet">
                        <Outlet/>
                    </div>
               </div>
            </section> 
        </>
    )
}