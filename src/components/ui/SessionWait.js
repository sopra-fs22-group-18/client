import React from "react";


const SessionWait = props => {
    const session = props.session;

    return(
        <div>
            <div>Session number {session.sessionId} hosted by {session.hostUsername} is waiting for participants.</div><br/>
            <div>Maximum number of user (incl. host) in session: {session.maxUsers}.</div>
        </div>
    )
}

export default SessionWait;