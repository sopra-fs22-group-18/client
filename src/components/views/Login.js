import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import {Button2} from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";


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
        onKeyDown={(event) => {
          props.onKeyDown(event);
        }}
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
        type="password"
        className="login input"
        placeholder="Set your password..."
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
        onKeyDown={(event) => {
          props.onKeyDown(event);
        }}
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

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  



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
      localStorage.setItem('username', user.username);
      history.push(`/game`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      doLogin();
    }
  };


  return (
    <BaseContainer>
<div id= "container">
    <section className="container">
  <div className="bg-image"></div>
  <div className="content" >
    
  <div></div>
  <div className="Logo"></div>
  <div className="headerrow" >
      <div className="headerp1" ><h1>Login</h1></div>
      <div className="headerp2"><h1>into the account</h1></div>
  </div>


      <div className="login container">
        <div className="login form">
          <FormField
            label="Username"
            value={username}
            onChange={un => setUsername(un)}
            onKeyDown = {handleKeyDown}
          />
         
          <FormField2
            placeholder="mas"
            label="Password"
            value={password}
            onChange={n => setPassword(n)}
            onKeyDown = {handleKeyDown}
          />

      

          <div className="register-button-container" >
          <Button disabled={!username || !password}  width="100%" onClick={() => doLogin()}>Login</Button>

          <td>&nbsp;&nbsp;&nbsp;</td>
          <div className="login-button-container">
          <div className="alreadyhave"><text >Create a new account</text></div>

          <Button2   width="100%" onClick={() => history.push('/register')}>Register</Button2>

          </div>
          </div>
        </div>
      </div>
      </div>
      </section>
</div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Login;
