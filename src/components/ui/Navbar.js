import React from "react";
import "styles/ui/Navbar.scss";
import {Link, useHistory} from "react-router-dom";
import logoutIcon from "../../img/logout.png";
import logoIcon from "../../img/logo.png"

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