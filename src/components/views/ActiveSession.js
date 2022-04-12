import {useHistory, useParams} from "react-router-dom";
import {Navbar} from "../ui/Navbar";
import React, {useEffect, useState} from "react";
import SessionWait from "../ui/SessionWait";
import "styles/views/Session.scss"
import {api, handleError} from "../../helpers/api";
import Session from "../../models/Session";


const ActiveSession = () => {
    const history = useHistory();
    const sessionId = useParams().sessionId;
    const [session, setSession] = useState(null);

    useEffect(() => {
        async function fetchSession(sessionId) {
            try {
                const sessionResponse = await api.get('/sessions/' + sessionId);
                const sessionReturned = new Session(sessionResponse.data)
                setSession(sessionReturned);
            } catch (error) {
                console.error(`Something went wrong while fetching the session: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the session! See the console for details.");
            }
        }
        fetchSession(sessionId);
    }, []);

    let content = (<div className="session container">Loading session...</div>)

    if(session) {
        if(session.sessionStatus == "CREATED") {
            content = (
            <div className="session container">
                <SessionWait session={session}/>
            </div>
            )
        } else if(session.sessionStatus == "ONGOING") {
            content = (
                <div className="session container">
                    <div>Placeholder for session {session.sessionId}</div>
                </div>
            )
        } else if(session.sessionStatus == "FINISHED") {
            content = (
                <div className="session container">
                    <div>This session is no longer active</div>
                </div>
            )
        } else {
            content = (
                <div className="session container">
                    <div>No session status available: {session.sessionStatus}</div>
                </div>
            )
        }
    }

    return(
        <div className="session">
            <Navbar/>
            <div>{content}</div>
        </div>
    )
}

export default ActiveSession;