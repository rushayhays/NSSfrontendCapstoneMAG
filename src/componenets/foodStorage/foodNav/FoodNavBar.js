//This will appear on the Food Storage page and it will allow the user to access the nested routes

import "./foodNavBar.css"
import { Link } from "react-router-dom"

export const FoodNavBar = () =>{
    return(
        <>
            <div id="navButtonArea">
                <Link to={"/foodstorage/myfoodstorage"}>
                <button className="foodNavButton">My Food Storage</button>
                </Link>
                <button className="foodNavButton">My Meal Cards</button>
                <button className="foodNavButton">About</button>
            </div>
        </>
    )
}