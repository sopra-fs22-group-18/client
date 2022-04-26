import {useHistory, useParams} from "react-router-dom";
import {Navbar} from "../ui/Navbar";
import React, {useEffect, useState} from "react";
import "styles/views/Session.scss"
import {api, handleError} from "../../helpers/api";
import {getWsDomain} from "../../helpers/getWsDomain";

import "styles/views/Comment.scss"
import PropTypes from "prop-types";
import {Button} from "../ui/Button";
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
    const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [socket, setSocket] = useState(new WebSocket(getWsDomain() + '/' + userId + '/' + sessionId));
  const [messages, setMessages] = useState([]);
  const [member, setMember] = useState([]);
  const [liste, setListe] = useState(null);



  const [title, setTitle] = useState(null);
  const [title2, setTitle2] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [createdDate, setCreatedDate] = useState(null);
  const [username, setUsername] = useState("username");


  
  const createComment = async () => {
    try {
      const session =  await api.get('/sessions/'+sessionId );
      const user =  await api.get('/users/'+userId);
      const ma="max";
      const sa=null;
      const requestBody1 = JSON.stringify({user, session, ma,sa });

      const requestBody2 = {
        "user": {
                "userId": 54,
                "username": "carol2",
                "password": "carol2",
                "userStatus": "ONLINE",
                "token": "96c0ad76-9819-4f6a-892c-1fecaa576a11",
                "imagepath": null,
                "userType": null
            },
        "session":{
            "sessionId":4,
        "host": {
            "userId": 1,
            "username": "test1",
            "password": "test1",
            "userStatus": "ONLINE",
            "token": "fb7849c5-c0cb-43fa-ac02-04c094af055b",
            "imagepath": null,
            "userType": "STANDARD"
        },
        "participants": [
            {
                "userId": 54,
                "username": "carol2",
                "password": "carol2",
                "userStatus": "ONLINE",
                "token": "96c0ad76-9819-4f6a-892c-1fecaa576a11",
                "imagepath": null,
                "userType": null
            },
            {
                "userId": 55,
                "username": "carol1",
                "password": "carol1",
                "userStatus": "ONLINE",
                "token": "08b12917-5327-4231-9d74-3feb85ff0a2e",
                "imagepath": null,
                "userType": null
            }
        ],
        "maxParticipants": 2,
        "sessionStatus": "ONGOING",
        "title": "testsession",
        "hostUsername": "test1",
        "imageUrl": null
    },"commentText":"maxjj","createdDate":null};

     api.post('/sessions/'+sessionId+'/comments', requestBody2);
     api.post('/sessions/'+sessionId+'/comments', requestBody1);
     history.push('/game/sesssion/'+sessionId);    

    } catch (error) {
      alert(`Something went wrong during the cration of the comment: \n${handleError(error)}`);
    }
  };

  const allParticipants = async () => {
      let SessionInfo = await api.get('/sessions/' + sessionId);
      SessionInfo.data["participants"].forEach(function(item, index, array){
          setMember(member.push(item["username"]))
      })
      setShow(true);
      setListe(member.map((i) => 
        <li>{i}</li>
      ));
      console.log(member);
  }



  const reportComment = async () => {
    
    history.push('/game/session/'+sessionId+'/Report');    
  };

  let addComments = (<Button
    width="100%"
    onClick={() => createComment()}> Add comment
</Button>)

let reportComments = (<Button
width="100%"
onClick={() => reportComment()}> Report comment
</Button>)

function hideAllParticipants(){
    setMember([]);
    setShow(false);
}




let showParticipants = (
    <div>
        <Button width = "100%"
        onClick={() => allParticipants()}>
            show all participants
        </Button>
    </div>
)

let hideParticipants = (
    <div>
        <Button width = "100%"
        onClick={() => hideAllParticipants()}>
            hide participants
        </Button>
    </div>
)



let avatar = (
<FormField
/>)
let commentText = (
    <FormField
        placeholder="Add your comment..."
        value={title}
        onChange={e => commentText.onChange(e.target.value)}/>)



        let content = (<div className="session container">Loading session...</div>)

  return (

     <div className="session">
            <Navbar/>
            <div>{content}</div>
            <div className="newComment">
            <div className="newComment container">
            <div className="newComment avatar">
           <img src={image} width={80} height={80} alt='Avatar' /></div>
           <div className="newComment username">
                {username}
            </div>
           <div>&nbsp;</div>
            <div className="newComment form">
                {commentText}
            </div>
                {addComments}
                <div>&nbsp;</div>
                {reportComments}
                <div>&nbsp;</div>
                {!show && showParticipants}
                {show && hideParticipants}
                <div>&nbsp;</div>
                {show && <center>
                    <ul>
                        {liste}
                    </ul>
                </center>}
            </div>
            
        </div>

    )

        </div>
    )
}

export default ActiveSession