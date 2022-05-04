//This will show all the members with a little stats

import { getUsers } from "../../modules/forumManager"
import { useEffect, useState } from "react"
import { ForumCard } from "./ForumCard";

export const Forum = () => {

    const [userarr, setUserArr] = useState([
        {
            id: 0,
            name: "",
            email: ""
          }
    ])

    useEffect(()=> {
        getUsers().then(allUsers =>{
            setUserArr(allUsers)
        })
    }, []);

    return(
        <>
            <div className="forumCardArea">
                {userarr.map(user =>
                    <ForumCard key={user.id} user={user}/>
                )}
            </div>
        
        </>
    )

}