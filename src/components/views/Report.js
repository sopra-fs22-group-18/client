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


const Report = () => {
  const history = useHistory();
  const sessionId = useParams().sessionId;
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [socket, setSocket] = useState(new WebSocket(getWsDomain() + '/' + userId + '/' + sessionId));
  const [messages, setMessages] = useState([]);


  const [title, setTitle] = useState(null);
  const [title2, setTitle2] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [description, setDescription] = useState(null);
  const [reason, setReason] = useState(null);




  const reportComment = async () => {
    try {
      const requestBody = JSON.stringify({session, user, description, reason});
      const response =  api.post(`/sessions/${sessionId}/reports`, requestBody);
      // Get the returned user and update a new object.

    } catch (error) {
      alert(`Something went wrong during reporting of the comment: \n${handleError(error)}`);
    }
    history.push('/game/session/'+sessionId);    
  };


  let reportReasons =  (
    <select name="reason" value={reason} onChange={event => handleReasonchange(event.target.value)}>
    <option id="0" >Swear words</option>
    <option id="1" >Threat</option>
    <option id="2" >Racism</option>
    <option id="3" >Sexual Harassment</option>
</select>
    )

    const handleReasonchange = (reason) => {
       setReason(reason);
       console.log(reason);
   }

let avatar = (
<FormField
/>)
let reportReason = (
    <FormField
        placeholder="Add Report Reason..."
        value={title}
        onChange={e => reportReason.onChange(e.target.value)}/>)



        let content = (<div className="session container">Report comment...</div>)


let submitReport = (<Button
width="100%"
onClick={() => reportComment()}> Submit report
</Button>)

  return (

     <div className="session">
            <Navbar/>
            <div>{content}</div>

            <div className="newComment">
            <div className="newComment container">
            <div className="newComment avatar">
           <img src={image} width={80} height={80} alt='Avatar' /></div>
           
           <div>&nbsp;</div>
            <div className="newComment form">
            <div><h3>Select Report Reasons</h3></div>
            {reportReasons}
            <div>&nbsp;</div>
            {reportReason}
            </div>
            {submitReport}   
            </div>
            </div> 

    )
   

        </div>
    )

    
}

export default Report