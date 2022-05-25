import {useHistory, useParams} from "react-router-dom";
import {Navbar} from "../ui/Navbar";
import React, {useState} from "react";
import "styles/views/Session.scss"
import {api, handleError} from "../../helpers/api";

import "styles/views/Comment.scss"
import PropTypes from "prop-types";
import {Button} from "../ui/Button";
import image from "../views/avatar.jpg";
import User from "../../models/User";
import Session from "../../models/Session";
import SessionReport from "../../models/SessionReport";
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

  const [description, setDescription] = useState(null);
  const [reason, setReason] = useState(null);


  const reportComment = async () => {
    try {
      const userResponse = await api.get('/users/' + localStorage.getItem('userId'));
      const user = new User(userResponse.data);

      const sessionResponse = await api.get('/sessions/' + sessionId);
      const session = new Session(sessionResponse.data);

      const requestBody = JSON.stringify({session, user, description, reason});
      const reportResponse =  api.post(`/reports`, requestBody);
      // Get the returned user and update a new object.

      const report = new SessionReport(reportResponse.data);
      console.log(report);
      history.push('/game');

    } catch (error) {
      alert(`Something went wrong during reporting of the comment: \n${handleError(error)}`);
    }

  };


    let reportReasonsDropdown =  (
        <select name="reason" value={reason} onChange={event => handleReasonchange(event.target.value)}>
            <option id="0" >Swearing</option>
            <option id="1" >Threat</option>
            <option id="2" >Racism</option>
            <option id="3" >Harassment</option>
        </select>
    )

    const handleReasonchange = (reason) => {
       setReason(reason);
       console.log(reason);
   }


let reportDescription = (
    <FormField
        placeholder="Add a description..."
        value={description}
        onChange={desc => setDescription(desc)}/>)



let submitReport = (<Button width="100%" onClick={() => reportComment()}> Submit report</Button>)

  return (

     <div className="session">
            <Navbar/>
         {/*<div>{content}</div>*/}

            <div className="newComment">

            <div className="newComment container">
            <div className="newComment avatar">
           <img src={image} width={80} height={80} alt='Avatar' /></div>
           
           <div>&nbsp;</div>
            <div className="newComment form">
            <div><h3>Select Report Reasons</h3></div>
            {reportReasonsDropdown}
            <div>&nbsp;</div>
            {reportDescription}
            </div>
            {submitReport}   
            </div>
            </div> 

    )
   

        </div>
    )

    
}

export default Report