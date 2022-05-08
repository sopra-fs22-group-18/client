import React from "react";
import "styles/ui/Navbar.scss";
import {Link, useHistory} from "react-router-dom";
import logoutIcon from "../../img/logout.png";
import logoIcon from "../../img/roastmeIcon.svg"
import gameIcon from "../../img/gamepad.svg"
import profileIcon from "../../img/profile.svg"
import commentIcon from "../../img/comment.svg"
import postIcon from "../../img/post.svg"




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

    const goCurrentSession = () => {
        history.push('/');
    }

    const goProfile = () => {
        history.push('/');
    }

    const goPostsList = () => {
        history.push('/');
    }

    const goCommentList = () => {
        history.push('/');
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
          <ul className="middle-items" >
            <button
                className="nav-button"
                onClick={() => goPostsList()}>
                  <img className="post-icon" src={postIcon} alt="post"/>
            </button>
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            <button
                className="nav-button"
                onClick={() => goCommentList()}>
                  <img className="comment-icon" src={commentIcon} alt="comment"/>
            </button>
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            <button
                className="nav-button"
                onClick={() => goProfile()}>
                  <img className="profile-icon" src={profileIcon} alt="profile"/>
            </button>
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            <button
                className="nav-button"
                onClick={() => goCurrentSession()}>
                  <img className="game-icon" src={gameIcon} alt="current-session"/>
            </button>
              


          </ul>
          <ul className="right-items">
              <li className="list-item">
                  <button
                      className= "nav-button"
                      onClick={() => doLogout()} >
                  <img className="icon"  src={logoutIcon} alt="logout" style={{ width: 40, height:40 }} />
                  </button>
              </li>
          </ul>
      </div>
  )}