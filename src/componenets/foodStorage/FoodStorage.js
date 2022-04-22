//This will hold the FoodStorageStats and a navBar with links to MyFoodStorage, MyMealCards, and About
//Make it so that MyFoodStorage shows up when you first load the page.

import "./foodStorage.css"
import { UserBanner } from "../userBanner/UserBanner"


export const FoodStorage = () => {
    return(
        <>
           <UserBanner/>
           <section className="foodStorageMainBox">
               <div className="foodStorageLeft">
                    <p>Left</p>
               </div>
               <div className="foodStorageRight">
                    <p>right</p>
               </div>
            </section> 
        </>
    )
}