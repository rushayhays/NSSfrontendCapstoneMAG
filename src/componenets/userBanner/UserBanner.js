//This will show the User's name near the top of the screen
//Maybe make it so that they can change the color?

import "./userBanner.css"

export const UserBanner = () => {

    const userObject = JSON.parse(sessionStorage.getItem("mag_user"))


    return(
        <>
            <div className="userbanner">
                <h1>HQ</h1> 
                <h1>{userObject.name}</h1>  
                <h1>HQ</h1>
            </div>
        </>
    )
}