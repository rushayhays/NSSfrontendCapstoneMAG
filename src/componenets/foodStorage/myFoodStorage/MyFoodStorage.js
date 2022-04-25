//This will load data from the ReserveMeals database, with an expand to include MealPacket Data

import "./myFoodStorage.css"

export const MyFoodStorage = () =>{
    return(
        <>
            <section className="myFoodStorageBar">
                <h4>My Food Storage</h4>
            </section>
            <section className="cardDisplayArea">
                <div className="myFoodStorageCarousel" id="row1"></div>
                <div className="myFoodStorageCarousel" id="row2"></div>
                <div className="myFoodStorageCarousel" id="row3"></div>
                <div className="myFoodStorageCarousel" id="row4"></div>
            </section>
            <section className="expirationArea">
                <div className="expirationBar">
                    <h4>Expiring Soon!</h4>
                </div>
                <div className="expireCardArea">

                </div>

            </section>
        </>
    )
}