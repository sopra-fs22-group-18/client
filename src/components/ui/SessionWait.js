import React from "react";


const SessionWait = props => {
    const session = props.session;
    const messages = props.messages;


    return(
        <div>
        <div>Session number {session.sessionId} hosted by {session.hostUsername} is waiting for participants.</div><br/>
        <div>Maximum number of user (incl. host) in session: {session.maxUsers}.</div>
            <ul type='none'>
                {messages.reverse().map((message, index) =>
                    <li key={index}>
                        <em>{message}</em>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default SessionWait;