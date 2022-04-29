import {useHistory, useParams} from "react-router-dom";
import {Navbar} from "../ui/Navbar";
import React, {useEffect, useState} from "react";
import "styles/views/Session.scss"
import "styles/views/Chat.scss"
import {api, handleError} from "../../helpers/api";
import {getWsDomain} from "../../helpers/getWsDomain";

import "styles/views/Comment.scss"
import PropTypes from "prop-types";
import {Button} from "../ui/Button";
import image from "../views/avatar.jpg";
/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */


const FormField = props => {
  return (
      <div className="title-field">
          <input
              className="title-field"
              placeholder={props.placeholder}
              value={props.value}
              onChange={e => props.onChange(e.target.value)}
          />
      </div>
  );
};

FormField.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};


const ActiveSession = () => {
    const history = useHistory();
    const sessionId = useParams().sessionId;
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const [socket, setSocket] = useState(null);
    const [inputMessage, setInputMessage] = useState();
    const [messages, setInputMessages] = useState([]);

    const [title, setTitle] = useState(null);

    const sendMessage = async () => {
        var msg = {
            from: username,
            content: inputMessage
        };
        socket.send(JSON.stringify(msg));
    };

    function MessageAdd(message) {
        messages.push(message);
        // here we have the array with all messages in order
        console.log(messages);
    }

    useEffect(() => {
        let wsocket = new WebSocket(getWsDomain() + '/' + userId + '/' + sessionId);
        setSocket(wsocket);

        wsocket.onopen = () => {
            console.log("WebSocket Connected");
        }

        wsocket.onmessage = (e) => {
            var data = JSON.parse(e.data);
            MessageAdd(data);
        }

        wsocket.onclose = () => {
            console.log("WebSocket Closed")
        }
        return () => {
            wsocket.close();
        }
    }, []);

    const reportComment = async () => {
        
        history.push('/game/session/'+sessionId+'/Report');    
    };

    let addComments = (<Button
        width="100%"
        onClick={() => sendMessage()}> Add comment
    </Button>)

    let reportComments = (<Button
    width="100%"
    onClick={() => reportComment()}> Report comment
    </Button>)

    let avatar = ( <FormField/>)

    let commentText = (
        <FormField
            placeholder="Add your comment..."
            value={title}
            onChange={im => setInputMessage(im)}/>)

            let content = (<div className="session container">Loading session...</div>)

    return (

        <div className="session">
            <Navbar/>
            <div>{content}</div>
            <div className="newComment">
                <div className="newComment container">
                    <div className="newComment avatar">
                        <img src={image} width={80} height={80} alt='Avatar' />
                    </div>
                    <div className="newComment username">
                        {"Session " + sessionId + ": " + username}
                    </div>
                    <div className="chatContainer">
                    </div>
                    <div>&nbsp;</div>
                    <div className="newComment form">
                        {commentText}
                    </div>
                    {addComments}
                    <div>&nbsp;</div>
                    {reportComments}
                </div>
            </div>)
        </div>
        )
    }

    export default ActiveSession