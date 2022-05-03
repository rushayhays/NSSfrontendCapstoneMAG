//This will control routing, every route needs a link
import React from "react"
import "./applicationViews.css"
import { Route, Routes, Navigate } from "react-router-dom"
import { LandingPage } from "../landingPage/landingPage"
import { SetUpHQ } from "./setUpHQ/SetUpHQ"
import { HQHome } from "./hqHome/HQHome"
import { FoodStorage } from "./foodStorage/FoodStorage"
import { MyFoodStorage } from "./foodStorage/myFoodStorage/MyFoodStorage"
import { MyMealCards } from "./foodStorage/myMealCards/MyMealCards"
import { About } from "./foodStorage/about/About"
import { EditMyMealCard } from "./foodStorage/myMealCards/editMyMealCard/EditMyMealCard"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"

export const ApplicationViews = ({isAuthenticated, setIsAuthenticated}) => {

    const PrivateRoute = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/login" />;
    }
    
    const setAuthUser = (user) => {
        sessionStorage.setItem("kennel_customer", JSON.stringify(user))
        setIsAuthenticated(sessionStorage.getItem("kennel_customer") !== null)
    }

    return(
        <>
            <Routes>
                <Route exact path="/" element={<LandingPage/>}/>
                <Route exact path="/login" element={<Login setAuthUser={setAuthUser} />} />
                <Route exact path="/register" element={<Register setAuthUser={setAuthUser}/>} />
                <Route path="/setuphq" element={<SetUpHQ/>}/>
                <Route path="/hqhome" element={<PrivateRoute><HQHome/></PrivateRoute>}/>
                <Route path="/foodstorage" element={<PrivateRoute><FoodStorage/></PrivateRoute>}>
                    <Route path="/foodstorage/myfoodstorage" element={<MyFoodStorage/>}/>
                    <Route path="/foodstorage/mymealcards" element={<MyMealCards/>}/>
                    <Route path="/foodstorage/about" element={<About/>}/>
                    <Route path="/foodstorage/editmymealcard/:mealId" element={<EditMyMealCard/>}/>
                </Route>
            </Routes>  
        </>
    )
}

