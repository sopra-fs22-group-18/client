import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import {Button2} from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import {ReactLogo} from "components/ui/ReactLogo";
/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */



const FormField = props => {
  return (
    
    <div className="login field">
      <label className="login label">
        {props.label}
      </label>
      <input
      
        className="login input"
        placeholder="Set your username..."
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
};

const FormField2 = props => {
  return (

    <div className="login field">
      <label className="login label">
        {props.label}
      </label>
      <input
      
        className="login input"
        placeholder="Set your password..."
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

FormField2.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

const Login = props => {
  const history = useHistory();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  
  
  const doRegister = async () => {
    try {
      const requestBody = JSON.stringify({username, password});
      const response = await api.post('/users', requestBody);
      // Get the returned user and update a new object.
      const user = new User(response.data);
      // Store the token into the local storage.
      localStorage.setItem('token', user.token);
      localStorage.setItem('userId', user.userId);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      history.push(`/game`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };


  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({username, password});
      const response = await api.post('/users/login', requestBody);
      // get returned user and updating a new object
      const user = new User(response.data);

      // storing token in local storage
      
      localStorage.setItem('token', user.token);
      // login worked route to /game 
      localStorage.setItem('userId', user.userId);
      history.push(`/game`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };


  return (
    <BaseContainer>

    <section class="container">
  <div class="bg-image"></div>
  <div class="content" >
    
  <div></div>
  <div class="Logo"></div>
  <div className="headerrow">
      <div className="headerp1" ><h1>Create</h1></div>
      <div className="headerp2"><h1>a new account</h1></div>
  </div>


      <div className="login container">
        <div className="login form">
          <FormField
            label="Username"
            value={username}
            onChange={un => setUsername(un)}
          />
         
          <FormField2
            placeholder="mas"
            label="Password"
            value={password}
            onChange={n => setPassword(n)}
          />

      

          <div className="register-button-container" >
          <Button disabled={!username || !password}  width="100%"onClick={() => doRegister()}>Register</Button>
          <td>&nbsp;&nbsp;&nbsp;</td>
          <div className="login-button-container">
          <div className="alreadyhave"><text >Already have an account?</text></div>

          <Button2 disabled={!username || !password}  width="100%"onClick={() => doLogin()}>Login</Button2>

          </div>
          </div>
        </div>
      </div>
      </div>
      </section>

    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Login;
