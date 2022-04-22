//This will control routing, every route needs a link
import React from "react"
import { Route, Routes } from "react-router-dom"
import { LandingPage } from "../landingPage/landingPage"
import { SetUpHQ } from "./setUpHQ/SetUpHQ"
import { HQHome } from "./hqHome/HQHome"
import { FoodStorage } from "./foodStorage/FoodStorage"

export const ApplicationViews = () => {
    return(
        <>
            <Routes>
                <Route exact path="/" element={<LandingPage/>}/>
                <Route path="/setuphq" element={<SetUpHQ/>}/>
                <Route path="/hqhome" element={<HQHome/>}/>
                <Route path="/foodstorage" element={<FoodStorage/>}/>
            </Routes>  
        </>
    )
}

