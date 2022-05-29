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
import {Button3, Button4, Button5} from 'components/ui/Button';
import noAvatar from "../../img/noAvatar.png";
import ReactScrollableFeed from 'react-scrollable-feed';

import image from "../views/avatar.jpg";
import Textarea from 'react-expanding-textarea'


const FormField = props => {
  return (
      <div className="title-field">
          <Textarea
              className="title-field"
              placeholder={props.placeholder}
              value={props.value}
              maxLength="300"
              max-height= "200px"
              onChange={e => props.onChange(e.target.value)}
              onKeyDown={(event) => {
                props.onKeyDown(event);
              }}
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
    const [show, setShow] = useState(false);
    const [participantsList, setParticipantsList] = useState ([]);
    const [showList, setShowList] = useState(null);
    const [sessionWinner, setSessionWinner] = useState(null);
    const [showWinner, setShowWinner] = useState(false);
    const [winnerId, setWinnerId] = useState([]);
    const [noParticipants, setNoParticipants] = useState(false);
    const [identifier, setIdentifier] = useState("");
    const [sessionStatus, setSessionStatus] = useState(null);
    const [host, setHost] = useState([]);
    const [participants, setParticipants] = useState([]);
    var sessionData = null;
    var participantsLis = [];


    let messageIndex = 0;

    const sendMessage = async () => {
        var msg = {
            from: username,
            content: inputMessage
        };
        socket.send(JSON.stringify(msg));
        setInputMessage("");
    };

    function MessageAdd(message) {
        setInputMessages(messages => [...messages, <div className="chatMessage" onClick={()=>goToProfile(message.from)} key={messageIndex}> {message.from}: {message.content} </div>]);
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
            console.log(data);
            switch (data.messageType) {
                case 'CommentText':
                    MessageAdd(data);
                    break;
                case 'StatusUpdate':
                    setSessionStatus(data.sessionStatus);
                    break;
                case 'Error':
                    break;
            }
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
          setIdentifier(response.data.identifier);
          setSessionStatus(response.data.sessionStatus);
          setHost(response.data.host);
          setParticipants(response.data.participants);

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

    const closeSessionByHost = async () => {
      try {
        await api.post(`/sessions/${sessionId}/close`);
      } catch (error) {
        alert(`Something went wrong when trying to leave the session: \n${handleError(error)}`);
      }
    }

    const leaveSession = async () => {
      try {
        const userId = localStorage.getItem('userId');
        await api.put(`/sessions/${sessionId}/leave/` + userId);

        var msg = {
            from: "Server",
            content: `${username} has left the session!`
        };

        socket.send(JSON.stringify(msg));

        history.push(`/game/start`);

    } catch (error) {
        alert(`Something went wrong when trying to leave the session: \n${handleError(error)}`);
    }
  }

    const reportComment = async () => {
        
        history.push('/game/session/'+sessionId+'/Report');    
    };

    const handleKeyDown = (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        sendMessage();
      }
    };

    let addComments = (<Button
        width="100%"
        onClick={() => sendMessage()}> Add comment
    </Button>)


    let reportComments = (<Button
    width="100%"
    onClick={() => reportComment()}> Report Sesssion
    </Button>)

    let commentText = (
        <FormField
        width="90%"
            placeholder="Add your comment..."
            value={inputMessage}
            onChange={im => setInputMessage(im)}
            onKeyDown={handleKeyDown}
            />
      );
    
    let leaveSessionButton = (<Button5
      width="100%"
      onClick={() => leaveSession()}
    

      > <div className = "leaveSession"><div width = "90%">Leave session</div> <div width = "10%"><img className="c" src={logoutIcon} alt="logout"/></div></div>
    </Button5>)

    let closeSessionByHostButton = (<Button5
      width="100%"
      onClick={() => closeSessionByHost()}
      > <div className = "leaveSession"><div width = "90%">Close session</div> <div width = "10%"><img className="icon" src={logoutIcon} alt="close session"/></div></div>
    </Button5>)

    const selectTheWinner = async() => {
      sessionData = await api.get('/sessions/'+ sessionId );
        sessionData.data.participants.forEach(function(item, index, array){
          if(item["userId"] !== session.host["userId"]) {
            setParticipantsList(participantsLis.push(item));
            console.log("participants activated");
          }
        });
        setShow(true);
        if(participantsLis.length !== 0){
          setNoParticipants(false);
          setShowList(participantsLis.map((i) => 
              <Button3 width="100%" onClick={()=> TheWinnerisSelected(i)}>
                {i["username"]+'\n'+'\n'+'\n'}
              </Button3>
        ));}else{
          setNoParticipants(true);
        }
    }


    const goToProfile = async(name) => {
      sessionData = await api.get('/sessions/'+ sessionId );
      console.log(sessionData.participants);
      console.log(sessionData.sessionId);
      console.log(sessionId);
      sessionData.data.participants.forEach(function(item, index, array){
        if(item.username == name) {
          history.push({
            pathname: `/game/profile/` + item.userId,
            state: { data: sessionId }
          });
        }
      });
    }

    function TheWinnerisSelected(x){
      setSessionWinner(x["username"]);
      setWinnerId(winnerId.push(x["userId"]));
      setShowWinner(true);
      postTheWinner();
      updateWonSessions(x);
    }

    const postTheWinner = async() => {
      await api.post(`/sessions/${sessionId}/close/${winnerId[0]}`);
    }
    const updateWonSessions = async(x) => {
      var obj = new Object();
      obj.userId = x["userId"];
      obj.password = x["password"];
      obj.username = x["username"];
      obj.name = x["name"];
      obj.type = x["type"];
      obj.userStatus = x["userStatus"];
      obj.token = x["token"];
      obj.avatarUrl = x["avatarUrl"];
      obj.bio = x["bio"];
      obj.participatedSessions = x["participatedSessions"];
      obj.wonSessions = x["wonSessions"] + 1;
      await api.put(`/users/statistics/${x["userId"]}`, JSON.stringify(obj));
    }

    let ShowMessage = (
      <div>
        <h1>
          The Winner is: {sessionWinner}
        </h1>
      </div>
    )

    function hideAllParticipants(){
      setParticipantsList([]);
      setShow(false);
      setNoParticipants(false);
    }

    let hideParticipants = (
      <div>
          <Button4 width = "100%" 
          onClick={() => hideAllParticipants()}>
              Don't select the Winner now
          </Button4>
      </div>
  )

    let showParticipants = (
      <div>
        <Button4 width = "100%"
        onClick ={() => selectTheWinner()}>
          Select the Winner
        </Button4>
      </div>
    )

    let updateParticipants = (
      <div>
        <Button width =  "100%" onClick={() => updateParticipantsList()}>
          Update participants list
        </Button>
      </div>
    )
    const updateParticipantsList = () => {
      participantsLis = [];
      selectTheWinner();
    }
    
    let noActiveParticipants = (
      <div>
        <Button width =  "100%" onClick={() => hideAllParticipants()}>
          No Active Participants
        </Button>
      </div>
    )


    let commentingSection = "";

    switch (sessionStatus) {
        case "CREATED":
            console.log("SessionStatus is CREATED");
            commentingSection = (
                <div className="newComment container">
                    <div className="newComment avatar">
                      { host.avatarUrl && host && (<img alt="Avatar"  src={host.avatarUrl}></img>)}
                      { !host.avatarUrl && (<img alt="Avatar" src={noAvatar}></img>)}
                    </div>
                    <div className="newComment username">
                      <text>Host: <b>{host.username}</b></text>
                    </div>
                    <div className="newComment username">
                      <text>Identifier: <b> {identifier} </b></text>
                    </div>

                      <div className="chatContainer" >
                        <ReactScrollableFeed>
                          <br/>
                          <div>Session number {session.sessionId} hosted by {session.hostUsername} is waiting for participants.</div>
                          <br/>
                          <div>Total number of participants required for the session to start: {session.maxParticipants}</div>
                          <br/>
                          {messages}
                          {(showWinner) && ShowMessage}
                          {(showWinner) && leaveSessionButton}
                        </ReactScrollableFeed>
                      </div>
                    <div>&nbsp;</div>
                </div>
            )
            break;
        case "ONGOING":
            console.log("SessionStatus is ONGOING");
            commentingSection = (
                    <div className="newComment container">
                        <div className="newComment avatar">
                          { host.avatarUrl && host && (<img alt="Avatar"  src={host.avatarUrl}></img>)}
                          { !host.avatarUrl && (<img alt="Avatar" src={noAvatar}></img>)} 
                        </div>
                        <div className="newComment username">
                          <text>Host: <b>{host.username}</b></text>
                        </div>
                        <div className="chatContainer" >
                          <ReactScrollableFeed>
                            {messages}
                            {(showWinner) && ShowMessage}
                            
                            {(showWinner) && leaveSessionButton}
                          </ReactScrollableFeed>
                        </div>
                        <div>&nbsp;</div>                        <div>&nbsp;</div>
                        <div className="newCommentform">
                            {(username !== session.hostUsername) && <div>{commentText}</div>}
                        </div>
                        <div className="addcomment">
                        <div>&nbsp;</div>
                            {(username !== session.hostUsername) && <div>{addComments}</div>}
                        </div>
                        <div>&nbsp;</div>
                        <div className="reportcomment">

                            {reportComments}
                            
                        </div>

                        
                    </div>
            )
            break;
        case "FINISHED":
            console.log("SessionStatus is FINISHED");
            break;
        default:
            console.log("No SessionStatus available");
            break;
    }


    return (
      

        <div className="session">

           <Navbar></Navbar>
           
           {commentingSection}
           <div className="headerrow">
            
            <div className="headerp1" ><h1>Let the Roast Begin</h1></div>
          
        </div>
          <div className="newSession container">            

                        <div className="newSession form">
                          
                        <div className = "uploadImage" >
                          <div className = "uploadImage input">
                            <label>
                            <div className title-field>{session.title}</div>
                            </label>
                          </div>

                          <div className="uploadImageoutput">
                            <img id="image1" alt="Image1" src={session.imageUrl}></img>
                          </div>
                        </div>
                    </div>
                    
                    {(username === session.hostUsername && !show) && showParticipants}
                    {(username === session.hostUsername && show) && hideParticipants}
                    {show && <center>
                          {showList}
                      </center>}
                    {noParticipants && noActiveParticipants}
                    <div>&nbsp;</div>
                    {(username !== session.hostUsername) && <div>{leaveSessionButton}</div>}
                    {(username === session.hostUsername) && <div>{closeSessionByHostButton}</div>}
                  </div>
                  



           
        </div>
        )
    }

    export default ActiveSession
