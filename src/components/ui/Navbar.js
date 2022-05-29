import React from "react";
import "styles/ui/Navbar.scss";
import {Spinner} from 'components/ui/Spinner';

import {Link, useHistory} from "react-router-dom";
import logoutIcon from "../../img/logout.png";

import logo from "../../img/logo.png";
import gameIcon from "../../img/gameIcon.png";
import profileIcon from "../../img/profileIcon.png";
import commentIcon from "../../img/comment.svg";
import homeIcon from "../../img/homeIcon.png";
import helpIcon from "../../img/helpIcon.png";
import  {useEffect, useState} from "react";
import {Button} from 'components/ui/Button';
import homeHover from "../../img/homeHover.png";


export const Navbar = props => {
    const history = useHistory();

   
    const [isActive,setActive] = useState("home")

    const doLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId')
        history.push('/login');
    }
    const goHome = () => {
        setActive("home")
        history.push('/game');
    }


    const goCurrentSession = () => {
        history.push('/');
    }
    const goProfile = async (userId) => {
        localStorage.setItem('redirectedId', localStorage.getItem('userId'));
        console.log(    localStorage.getItem('redirectedId'));
        
        history.push(`/profile`)}


    const goToHelpPage = () => {
      history.push(`/game/helpPage` );
  }
    const Player = ({user}) => (   
        <div className="player container" >
        <div className="player username"  key={user.id} onClick={()=>goProfile(localStorage.gettItem('redirectedId'))}>{user.username}</div>
        <div className="player id" >id: {user.id}  </div>   
        </div>
      );
    const [users, setUsers] = useState(null);
    let content = <Spinner/>;

    if (users) {
        content = (
          <div className="game">
            <ul className="game user-list">
              {users.map(user => (
                <Player user={user} key={user.id}/>
              ))}
            </ul>
            <Button
              width="100%"
              onClick={() => doLogout()} 
            >
              Logout
            </Button>
          </div>
        );
      }


    

    const goToMyProfile = () => {
        const userId = localStorage.getItem('userId');
        history.push(`/game/profile/` + userId);
    }

    return (
      <div className="nav-bar-container-light">
          <div className="left-item">
              <li className="list-item">

              <button
                className= "nav-button"
                onClick={() => goHome()}>
                  <img className="logo-icon" src={logo} alt="logo" style={{ width: 80, height: 80 }}/>
              </button>
              </li>
          </div>

          <ul className="middle-items" >

            <button
                className="nav-button"
                onClick={() => (goHome(), setActive("home"))}>
                  <img className="home-icon" src={homeIcon} alt="home" style={{ width: 40, height: 40 }}/>
            </button>
            <button
                className="nav-button"
                onClick={()=>goToMyProfile()}>
                  <img className="profile-icon" src={profileIcon} alt="profile" style={{ width: 40, height: 40 }}/>
            </button>
            <button
                className="nav-button"
                onClick={() => goCurrentSession()}>
                  <img className="game-icon" src={gameIcon} alt="current-session" style={{ width: 48, height: 48 }}/>
            </button>
          
            <button
                className="nav-button"
                onClick={() => goToHelpPage()}>
                  <img className="help-icon" src={helpIcon} alt="help" style={{ width: 40, height: 40 }}/>
            </button>
              



          </ul>
          <ul className="right-items">
              <li className="list-item">
                  <button
                      className= "nav-button"
                      onClick={() => doLogout()} >
                  <img className="icon"  src={logoutIcon} alt="logout" style={{ width: 40, height:40, right:20}} />
                  </button>
              </li>
          </ul>
      </div>
  )}