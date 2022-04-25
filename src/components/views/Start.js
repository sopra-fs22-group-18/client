import {useEffect, useState} from 'react';
import {Spinner} from 'components/ui/Spinner';
import {Button, Button2} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Start.scss";
import {Navbar} from "../ui/Navbar";
import logo from "../../img/logo.png"
import { api, handleError } from 'helpers/api';
//import { useState } from 'react/cjs/react.production.min';



const Start = () => {
  // use react-router-dom's hook to access the history
  const history = useHistory();
  const [sessions, setSessions] = useState(0);

  const newSession = () => {
      history.push('/game/newSession');
  }

  const getSession = () => {
    history.push('/game/newSession');
}

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



  let newSessionButton = (
      <Button
          width="100%"
          onClick={() => newSession()}>
          Create a new session
      </Button>
  )

    let joinSessionButton = (
        <Button2
            width="100%">
            onClick={() => newSession()}>
            Join a session
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

      <h2 className="start header2">
        Number of open roasting sessions: {sessions}
      </h2>
      </div>
      </div>

      </div>

  );
}

export default Start;
