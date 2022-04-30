import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import {Button2} from 'components/ui/Button';
import 'styles/views/Register.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";




const FormField = props => {
  return (
    
    <div className="register field">
      <label className="register label">
        {props.label}
      </label>
      <input
      
        className="register input"
        placeholder="Set your username..."
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
};

const FormField2 = props => {
  return (
    <div className="register field">
      <label className="register label">
        {props.label}
      </label>
      <input
        className="register input"
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

const Register = () => {
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
      localStorage.setItem('username', user.username);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      history.push(`/game`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };


  return (
    <BaseContainer>

    <section className="container">
  <div className="bg-image"></div>
  <div className="content" >
    
  <div></div>
  <div className="Logo"></div>
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
          <Button disabled={!username || !password}  width="100%" onClick={() => doRegister()}>Register</Button>

          <td>&nbsp;&nbsp;&nbsp;</td>
          <div className="login-button-container">
          <div className="alreadyhave"><text >Already have an account?</text></div>

          <Button2   width="100%" onClick={() => history.push('/login')}>Login</Button2>

          </div>
          </div>
        </div>
      </div>
      </div>
      </section>

    </BaseContainer>
  );
};


export default Register;
