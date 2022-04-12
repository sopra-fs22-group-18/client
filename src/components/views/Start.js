import {useEffect} from 'react';
import {Spinner} from 'components/ui/Spinner';
import {Button, Button2} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Start.scss";
import {Navbar} from "../ui/Navbar";
import logo from "../../img/logo.png"
import {api, handleError} from 'helpers/api';
import Session from 'models/Session';
import { useState } from 'react/cjs/react.production.min';


const Start = () => {
  // use react-router-dom's hook to access the history
  const history = useHistory();

  const newSession = () => {
      history.push('/game/newSession');
  }

  const [sessions, setSessions] = useState(null);

  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
        try {
            const response = await api.get('/sessions');

            // delays continuous execution of an async operation for 1 second.
            // This is just a fake async call, so that the spinner can be displayed
            // feel free to remove it :)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Get the returned sessions and update the state.
            setSessions(response.data);

            // This is just some data for you to see what is available.
            // Feel free to remove it.
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);

            // See here to get more data.
            console.log(response);
      } catch (error) {
            console.error(`Something went wrong while fetching the sessions: \n${handleError(error)}`);
            console.error("Details:", error);
            alert("Something went wrong while fetching the sessions! See the console for details.");
      }}
      fetchData();
  }, []);

  const countSessions = () => {

  };
  let noSessions = "XX";

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
            Join a session
        </Button2>
    )

    let activeSessions = (
        <div>
            <p>
                Active Sessions: 
            </p>
        </div>
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
        Number of open roasting sessions: {noSessions}
      </h2>
      </div>
      </div>

      </div>

  );
}

export default Start;
