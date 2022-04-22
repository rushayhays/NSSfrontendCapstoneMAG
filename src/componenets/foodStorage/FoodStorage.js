//This will hold the FoodStorageStats and a navBar with links to MyFoodStorage, MyMealCards, and About
//Make it so that MyFoodStorage shows up when you first load the page.

import "./foodStorage.css"
import { UserBanner } from "../userBanner/UserBanner"
import { FoodStorageStats } from "./foodStorageStats/FoodStorageStats"


export const FoodStorage = () => {
    return(
        <>
           <UserBanner/>
           <section className="foodStorageMainBox">
               <div className="foodStorageLeft">
                    <FoodStorageStats/>
               </div>
               <div className="foodStorageRight">
                    <div id="foodStorageNavBar">
                        <p>Nav bar goes here, My Food Storage,My Meal Cards,About</p>
                    </div>
                    <div id="foodStorageOutlet">
                        This is the spot for the outlet
                    </div>
               </div>
            </section> 
        </>
    )
}