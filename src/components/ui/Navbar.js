import React from "react";
import "styles/ui/Navbar.scss";
import {Link, useHistory} from "react-router-dom";
import logoutIcon from "../../img/logout.png";
import logoIcon from "../../img/logo.png"
import profileIcon from "../../img/profileIcon.png"


export const Navbar = props => {
    const history = useHistory();
    const doLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId')
        history.push('/login');
    }
    const goHome = () => {
        history.push('/game');
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
                className="nav-button"
                onClick={() => goHome()}>
                  <img className="home-icon" src={logoIcon} alt="home"/>
              </button>
              </li>
          </div>
          <ul className="middle-items">
            <li className="list-item">
                    <button
                        className= "nav-button"
                        onClick={() => goToMyProfile()} >
                    <img className="icon" src={profileIcon} alt="myProfile"/>
                    </button>
            </li>
          </ul>
          <ul className="right-items">
              <li className="list-item">
                  <button
                      className= "nav-button"
                      onClick={() => doLogout()} >
                  <img className="icon" src={logoutIcon} alt="logout"/>
                  </button>
              </li>
          </ul>
      </div>
  )}