import {useHistory, useParams} from "react-router-dom";
import {Navbar} from "../ui/Navbar";
import React, {useEffect, useState} from "react";
import SessionWait from "../ui/SessionWait";
import "styles/views/Session.scss"
import {api, handleError} from "../../helpers/api";
import Session from "../../models/Session";
import {getWsDomain} from "../../helpers/getWsDomain";
import User from "../../models/User";
import PropTypes from "prop-types";
import {Button} from 'components/ui/Button';

const MessageField = props => {
    return (
      
      <div className="login field">
        <input
        
          className="login input"
          placeholder="Enter message..."
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      </div>
    );
  };

  
  MessageField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
  };

const ActiveSession = () => {
    const history = useHistory();
    const sessionId = useParams().sessionId;
    const userId = localStorage.getItem('userId');
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [socket, setSocket] = useState(null);
    const [inputMessage, setInputMessage] = useState();

    const sendMessage = async () => {
        var msg = {
            content: inputMessage,
            from: userId
        };
        socket.send(JSON.stringify(msg));
      };

    function MessageAdd(message) {
        var chat_messages = document.getElementById("chat-messages");
        chat_messages.insertAdjacentHTML("beforeend", message);
        chat_messages.scrollTop = chat_messages.scrollHeight;
        console.log("hello")
    }

    useEffect(() => {
        let wsocket = new WebSocket(getWsDomain() + '/' + userId + '/' + sessionId);
        setSocket(wsocket)

        wsocket.onopen = () => {
            console.log("WebSocket Connected");
        }

        wsocket.onmessage = (e) => {
            var data = JSON.parse(e.data);
            MessageAdd('<div>' + data.from + ': ' + data.content + '</div>')
        }

        wsocket.onclose = () => {
            console.log("WebSocket Closed")
        }

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

        async function fetchUser(userId) {
            try {
                const userResponse = await api.get('/users/' + userId);
                const userReturned = new User(userResponse.data)
                setUser(userReturned);

            } catch (error) {
                console.error(`Something went wrong while fetching the session: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the session! See the console for details.");
            }
        }

        fetchSession(sessionId);
        fetchUser(userId);

    }, []);


    let content = (<div className="session container">Loading session...</div>)

    if(session) {
        if(session.sessionStatus === "CREATED") {
            content = (
            <div className="session container">
                <SessionWait session={session}/>
                <div id = "chat-messages"></div>
                <MessageField value={inputMessage} onChange={im => setInputMessage(im)} />
                <Button disabled={!inputMessage}  width="100%" onClick={() => sendMessage()}>Send</Button>
            </div>
            )
        } else if(session.sessionStatus === "ONGOING") {
            content = (
                <div className="session container">
                    <div>Placeholder for session {session.sessionId}</div>
                </div>
            )
        } else if(session.sessionStatus === "FINISHED") {
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