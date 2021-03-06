import {Redirect, Route} from "react-router-dom";
import PropTypes from 'prop-types';
import Start from "../../views/Start";
import NewSession from "../../views/NewSession";
import ActiveSession from "../../views/ActiveSession";
import Comment from "../../views/Comment";
import Report from "../../views/Report";
import Profile from "../../views/Profile";
import EditProfile from "components/views/EditProfile";
import HelpPage from "components/views/HelpPage";



const GameRouter = props => {
  /**
   * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
   */
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Route exact path={`${props.base}/start`}>
        <Start/>
      </Route>

      <Route exact path={`${props.base}/helpPage`}>
        <HelpPage/>
      </Route>

      <Route exact path = {`${props.base}/newSession`}>
          <NewSession/>
      </Route>

      <Route exact path = {`${props.base}/Comment`}>
          <Comment/>
      </Route>

      <Route exact path={`${props.base}/session/:sessionId`}>
          <ActiveSession/>
      </Route>
      
      <Route exact path={`${props.base}/session/:sessionId/Report`}>
          <Report/>
      </Route>

      <Route exact path={`${props.base}/profile/:userId`}>
        <Profile/>
      </Route>

      <Route exact path={`${props.base}/profile/:userId/edit`}>
        <EditProfile/>
      </Route>

      <Route exact path={`${props.base}`}>
        <Redirect to={`${props.base}/start`}/>
      </Route>

    </div>
  );
};
/*
* Don't forget to export your component!
 */

GameRouter.propTypes = {
  base: PropTypes.string
}

export default GameRouter;
