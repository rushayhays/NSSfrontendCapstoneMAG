//This will populate each forum card with the info it needs and display it on the forum

import "./forumCard.css"
import { ForumProgressPie } from "./ForumProgressPie"

export const ForumCard = ({user}) =>{




    return(
        <>
            <div className="forumCard">
                <div className="userInfo">
                    <h3 className="userForumName">{user.name}</h3>
                    <p>{user.email}</p>
                </div>
                <div className="forumStatsArea">
                    <ForumProgressPie user={user}/>
                </div>
                
            </div>
        </>
    )
}