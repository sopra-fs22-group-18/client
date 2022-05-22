import React from "react";
import "styles/ui/Navbar.scss";
import {Spinner} from 'components/ui/Spinner';

import {Link, useHistory} from "react-router-dom";
import logoutIcon from "../../img/logout.png";

import logoIcon from "../../img/roastmeIcon.svg";
import gameIcon from "../../img/gamepad.svg";
import profileIcon from "../../img/profile.svg";
import commentIcon from "../../img/comment.svg";
import postIcon from "../../img/post.svg";
import  {useEffect, useState} from "react";
import {Button} from 'components/ui/Button';



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



    const goPostsList = () => {
        history.push('/');
    }

    const goCommentList = () => {
        history.push('/');
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
                className={` ${isActive === "home" ? 'btn__nav-bar-btn active-link' : 'btn__nav-bar-btn'}`} 
                onClick={() => goHome()}>
                  <img className="home-icon" src={logoIcon} alt="home"/>
              </button>
              </li>
          </div>

          <ul className="middle-items" >

            <button
                className={` ${isActive === "profile" ? 'btn__nav-bar-btn active-link' : 'btn__nav-bar-btn'}`}
                onClick={() => setActive("home")}>
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
                onClick={()=>goProfile(1)}>
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