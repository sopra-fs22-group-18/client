import {useEffect, useState} from 'react';
import {Button, Button2} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';

import "styles/views/Start.scss";
import {Navbar} from "../ui/Navbar";
import logo from "../../img/logo.png"
import { api, handleError } from 'helpers/api';
import Session from "../../models/Session";
//import { useState } from 'react/cjs/react.production.min';

const FormField = props => {
    return (
      <div className="identifier field">
        <label className="identifier label">
          {props.label}
        </label>
        <input
        
          className="identifier input"
          placeholder="Set code..."
          value={props.value}
          maxLength = "6"
          onChange={e => props.onChange(e.target.value)}
        />
      </div>
    );
  };

const Start = () => {
  // use react-router-dom's hook to access the history
    const history = useHistory();
    const [sessions, setSessions] = useState(0);
    const [identifier, setIdentifier] = useState("");

    const newSession = () => {
        history.push('/game/newSession');
    }

    const joinSession = async() => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await api.get('/sessions/join/' + userId);
            const session = new Session(response.data);
            localStorage.setItem('sessionId', session.sessionId);
            const user = await api.get(`/users/${userId}`);
            updateParticipatedSessions(user.data);
            history.push(`/game/session/` + session.sessionId);
        } catch (error) {
            alert(`Something went wrong when trying to join a session: \n${handleError(error)}`);
        }
    }
    const joinSessionByIdentifier = async() => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await api.get('/sessions/' + identifier + '/join/' + userId);
            const session = new Session(response.data);
            console.log(session.identifier);
            localStorage.setItem('sessionId', session.sessionId);
            const user = await api.get(`/users/${userId}`);
            updateParticipatedSessions(user.data);
            history.push(`/game/session/` + session.sessionId);
        } catch (error) {
            alert(`Something went wrong when trying to join a session: \n${handleError(error)}`);
    }
  };
  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
        try{
            const response = await api.get('/sessions');
            setSessions(response.data.length);
        } catch(error){
            console.error(`Something went wrong while fetching the sessions: \n${handleError(error)}`);
        }

    }
    fetchData();
  }, []);

    const updateParticipatedSessions = async(x) => {
        var obj = new Object();
        obj.userId = x["userId"];
        obj.username = x["username"];
        obj.name = x["name"];
        obj.token = x["token"];
        obj.avatarUrl = x["avatarUrl"];
        obj.bio = x["bio"];
        obj.participated_sessions = x["participated_sessions"]+1;
        obj.wonSessions = x["wonSessions"];
        await api.put(`/users/statistics/${x["userId"]}`, JSON.stringify(obj));
    }



  let newSessionButton = (
      <Button
          width="100%"
          onClick={() => newSession()}>
          Create a new session
      </Button>
  )

    let joinSessionButton = (
        <Button2
            width="100%"
            onClick={() => joinSession()}>
            Join a session
        </Button2>
    )

    let joinSessionByIdentifierButton = (
        <Button2
            disabled = {identifier.length != 6}
            width="100%"
            onClick={() => joinSessionByIdentifier()}>
            Join a session by identifier
        </Button2>
    )


  return (
      <div><Navbar />


      <div className="start container" >
          <img className="start logo" src={logo} alt="logo"/>

      <div className="start button-container">
          <div className="start button">
            {newSessionButton}
          </div>
          <div className="start button">
              {joinSessionButton}
          </div>
          <div className='start'>
            <FormField
                value={identifier}
                onChange={id => setIdentifier(id)}
            />
          </div>
          
          <div className="start button">
              {joinSessionByIdentifierButton}
          </div>

      <h2 className="start header2">
        Number of open roasting sessions: {sessions}
      </h2>
      </div>
      </div>

      </div>

  );
}

export default Start;
