//This will control routing, every route needs a link
import React from "react"
import "./applicationViews.css"
import { Route, Routes } from "react-router-dom"
import { LandingPage } from "../landingPage/landingPage"
import { SetUpHQ } from "./setUpHQ/SetUpHQ"
import { HQHome } from "./hqHome/HQHome"
import { FoodStorage } from "./foodStorage/FoodStorage"
import { MyFoodStorage } from "./foodStorage/myFoodStorage/MyFoodStorage"
import { MyMealCards } from "./foodStorage/myMealCards/MyMealCards"
import { About } from "./foodStorage/about/About"
import { EditMyMealCard } from "./foodStorage/myMealCards/editMyMealCard/EditMyMealCard"

export const ApplicationViews = () => {
    return(
        <>
            <Routes>
                <Route exact path="/" element={<LandingPage/>}/>
                <Route path="/setuphq" element={<SetUpHQ/>}/>
                <Route path="/hqhome" element={<HQHome/>}/>
                <Route path="/foodstorage" element={<FoodStorage/>}>
                    <Route path="/foodstorage/myfoodstorage" element={<MyFoodStorage/>}/>
                    <Route path="/foodstorage/mymealcards" element={<MyMealCards/>}/>
                    <Route path="/foodstorage/about" element={<About/>}/>
                    <Route path="/foodstorage/editmymealcard/:mealId" element={<EditMyMealCard/>}/>
                </Route>
            </Routes>  
        </>
    )
}

