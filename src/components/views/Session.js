import {useParams} from "react-router-dom";
import {Navbar} from "../ui/Navbar";
import React from "react";


const Session = () => {
    const sessionId = useParams().sessionId;

    return(
        <div className="newSession">
            <Navbar/>
            <div className="newSession container">
                <div>Placeholder for session {sessionId}</div>
            </div>
        </div>
    )
}

export default Session;