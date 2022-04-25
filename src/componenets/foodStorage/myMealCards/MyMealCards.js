//This will load the data from the mealPackets Database

import "./myMealCards.css"

export const MyMealCards = () => {
    return(
        <>
            <section className="topBar">
                {/* eventually this will also be able to display the creation information */}
                <h4>My Meal Cards</h4>
            </section>
            <section className="mealCardCarousel">

            </section>
            <section className="mealCardCreation">
                <div className="mealCreateTitleArea">
                    <h4>Create a New Meal Card</h4>
                </div>
                <div className="mealCreateEntryArea">
                    <div className="mealCreateEntryBox" id="box1"></div>
                    <div className="mealCreateEntryBox" id="box2"></div>
                    <div className="mealCreateEntryBox" id="box3"></div>
                </div>
                <div id="createButtonArea">
                    <h4>Create My Meal Card</h4>
                </div>
            </section>
        </>
    )
}