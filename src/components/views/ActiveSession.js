import {useHistory, useParams} from "react-router-dom";
import {Navbar} from "../ui/Navbar";
import React, {useEffect, useState} from "react";
import "styles/views/Session.scss"
import "styles/views/Chat.scss"
import {api, handleError} from "../../helpers/api";
import {getWsDomain} from "../../helpers/getWsDomain";
import logoutIcon from "../../img/logout.png";
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
    console.log(userId);
    const username = localStorage.getItem('username');
    const [socket, setSocket] = useState(null);
    const [inputMessage, setInputMessage] = useState();
    const [messages, setInputMessages] = useState([]);
    const [session, setSession] = useState([]);

    let messageIndex = 0;

    const [title, setTitle] = useState(null);

    const sendMessage = async () => {
        var msg = {
            from: username,
            content: inputMessage
        };
        socket.send(JSON.stringify(msg));
    };

    function MessageAdd(message) {
        setInputMessages(messages => [...messages, <div className="chatMessage" key={messageIndex}> {message.from}: {message.content} </div>]);
        //messages.push(<div className="chatMessage" key={messageIndex}> {message.from}: {message.content} </div>);
        messageIndex += 1;
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

    useEffect(() => {
      // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
      const fetchData = async () => {
        try {
          const response =  await api.get('/sessions/'+ sessionId );

          setSession(response.data);

          console.log('request to:', response.request.responseURL);
          console.log('status code:', response.status);
          console.log('status text:', response.statusText);
          console.log('requested data:', response.data);
        } catch (error) {
          console.error(`Something went wrong while getting the data for the session: \n${handleError(error)}`);
          console.error("Details:", error);
          alert("Something went wrong while getting the data for the session! See the console for details.");
        }
      }

      fetchData()
    }, []);

    const leaveSession = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const request = await api.put(`/sessions/${sessionId}/leave/` + userId);

        history.push(`/game/start`);

    } catch (error) {
        alert(`Something went wrong when trying to leave the session: \n${handleError(error)}`);
    }
  }

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
    
    let leaveSessionButton = (<Button
      width="100%"
      onClick={() => leaveSession()}
      > <div className = "leaveSession"><div>Leave session</div> <div><img className="icon" src={logoutIcon} alt="logout"/></div></div>
    </Button>)
    return (

        <div className="session">
            <Navbar/>
            <div class='session parent'>
              <div class='session leftChild'>
                  <div className="newSession">
                    <div className="newSession container">
                        <div className="newSession form">
                        <div className = "uploadImage">
                          <div className = "uploadImage input">
                            <label>
                            <div className title-field>{session.title}</div>
                            </label>
                          </div>
                          <div className="uploadImage output">
                            <img alt="Image" src={session.imageUrl}></img>
                          </div>
                        </div>
                    </div>
                    {(username != "session.hostUsername") && <div>{leaveSessionButton}</div>}
                  </div>
                </div>
              </div>
            <div class='session rightChild'>
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
                        {messages}
                    </div>
                    <div>&nbsp;</div>
                    <div className="newComment form">
                        {commentText}
                    </div>
                    {addComments}
                    <div>&nbsp;</div>
                    {reportComments}
                </div>
            </div> 
            </div>
            </div>)
        </div>
        )
    }

    export default ActiveSession