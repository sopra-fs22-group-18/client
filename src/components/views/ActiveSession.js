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
import {Button3} from "../ui/Button";
import {Button4} from "../ui/Button";
import {Button5} from "../ui/Button";


import image from "../views/avatar.jpg";
import { async, isEmpty } from "@firebase/util";
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
    const [show, setShow] = useState(false);
    const [participantsList, setParticipantsList] = useState ([]);
    const [showList, setShowList] = useState(null);
    const [sessionWinner, setSessionWinner] = useState(null);
    const [showWinner, setShowWinner] = useState(false);
    const [winnerId, setWinnerId] = useState([]);
    const [noParticipants, setNoParticipants] = useState(false);


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
            value={inputMessage}
            onChange={im => setInputMessage(im)}/>)

    let content = (<div className="session container"></div>)         
    
    let leaveSessionButton = (<Button5
      width="100%"
      onClick={() => leaveSession()}
      > <div className = "leaveSession"><div width = "90%">Leave session</div> <div width = "10%"><img className="icon" src={logoutIcon} alt="logout"/></div></div>
    </Button5>)

    function selectTheWinner(){
      session.participants.forEach(function(item, index, array){
        console.log(item["participated_sessions"]);
        if(item["userId"] !== session.host["userId"]){
          setParticipantsList(participantsList.push(item));
          console.log("participants activated");
        }
      });
      setShow(true);
      if(participantsList.length !== 0){
        setNoParticipants(false);
        setShowList(participantsList.map((i) => 
          
            <Button3 width="100%" onClick={()=> TheWinnerisSelected(i)}>
              {i["username"]+'\n'+'\n'+'\n'}
            </Button3>
           
           
           
            
        
      ));}else{
        setNoParticipants(true);
      }
    }

    function TheWinnerisSelected(x){
      setSessionWinner(x["username"]);
      setWinnerId(winnerId.push(x["userId"]));
      setShowWinner(true);
      postTheWinner();
      updateWonSessions(x);
    }

    //const delay = ms => new Promise(res => setTimeout(res, ms));

    const postTheWinner = async() => {
      await api.post(`/sessions/${sessionId}/${winnerId[0]}`);
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
      obj.participated_sessions = x["participated_sessions"];
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

    let noActiveParticipants = (
      <div>
        <Button width =  "100%" onClick={() => hideAllParticipants()}>
          No Active Participants
        </Button>
      </div>
    )

    return (

        <div className="session">
            <Navbar/>
            <div class='session parent'>
              <div class='session leftChild'>
                  <div className="newSession">
                  <div className="headerrow">
      <div className="headerp1" ><h1>Let the</h1></div>
      <div className="headerp2"><h1>roast begin</h1></div>
  </div>
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
                    {(username === session.hostUsername && !show) && showParticipants}
                    <div>&nbsp;</div>
                    {(username === session.hostUsername && show) && hideParticipants}
                    <div>&nbsp;</div>
                    {show && <center>
                      
                          {showList}
                      
                      </center>}
                    {noParticipants && noActiveParticipants}
                    {(username !== session.hostUsername) && <div>{leaveSessionButton}</div>}
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
                        {(showWinner) && ShowMessage}
                        {(showWinner) && leaveSessionButton}
                    </div>
                    <div>&nbsp;</div>
                    <div className="newComment form">
                      {(username !== session.hostUsername) && <div>{commentText}</div>}
                    </div>
                    {(username !== session.hostUsername) && <div>{addComments}</div>}
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