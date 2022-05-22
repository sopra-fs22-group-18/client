import { useState, useEffect } from 'react';

import {useHistory, useParams} from 'react-router-dom';

import "styles/views/HelpPage.scss";
import logo from "../../img/logo.png"
import {Navbar} from "../ui/Navbar";
import {Button7} from "../ui/Button";


const HelpPage = () => {

const [AboutTheApp, setAboutTheApp] = useState(true);
const [CreateSession, setCreateSession] = useState(false);
const [JoinSession, setJoinSession] = useState(false);
const [Profile, setProfile] = useState(false);


let aboutTheAppButton = (<Button7
    width="100%"
    onClick={() => (setAboutTheApp(true), setCreateSession(false), setJoinSession(false), setProfile(false))}> About the App
</Button7>)

let createSessionButton = (<Button7
    width="100%"
    onClick={() => (setAboutTheApp(false), setCreateSession(true), setJoinSession(false), setProfile(false)) }> Creating a session
</Button7>)

let joinSessionButton = (<Button7
    width="100%"
    onClick={() => (setAboutTheApp(false), setCreateSession(false), setJoinSession(true), setProfile(false))}> Joining a session
</Button7>)

let profileButton = (<Button7
    width="100%"
    onClick={() => (setAboutTheApp(false), setCreateSession(false), setJoinSession(false), setProfile(true))}> Profile
</Button7>)


  return (
      <div><Navbar />
        <div className="helpPage" >
            <div className="helpPage container">
                    <img className = "logo" src={logo} alt="logo"/>
                    <div className="buttons">
                        {aboutTheAppButton}
                        {createSessionButton}
                        {joinSessionButton}
                        {profileButton}
                    </div>     
                <div className="helpPage form">
                    { AboutTheApp == true && <text><br></br><b>About the app:</b> 
                    <br></br><br></br>This is a game where a user can host a roasting session 
                    and upload a picture, e.g. of a meal they cooked, a sweater they are wearing, or their pet. 
                    <br></br><br></br>Other users can then join the roasting session as participants, 
                    and comment on the picture, making fun of it.
                    <br></br><br></br>The host will decide at the end of the session which participant wins the game. 
                    </text>}
                    { CreateSession == true && <text><br></br><b>How to create a session:</b> 
                    <br></br><br></br> In order to create a session you need to 
                    go to the start page, where you can find the "Create a session" button.
                    <br></br><br></br> Then you should be able to write a title, upload an image and set the 
                    max. number of participants for the roasting session.
                    <br></br><br></br> Now you can start the session by clicking on the "Start session" button.
                    <br></br><br></br> When the game is started and all the participants joined your session, 
                    you can see the comments of the participants and report the session, if someone uses inapropriate vocabulary.
                    You can do that by clicking on the "Report button". Then choose a reason, write a description and click on the ,,Create report" button.
                    <br></br><br></br>When you are ready to declare the winner, just click on the "Declare winner" button and choose the winner.
                    <br></br><br></br> Well done! Now you can leave the session by clicking on the "Leave session" button.
                    </text>}
                    { JoinSession == true && <text><br></br><b>How to join a session:</b> 
                    <br></br><br></br> In order to join a session you need to 
                    go to the start page, where you can find the "Join a session" button.
                    <br></br><br></br> You can also join a session by identifier. Just time in the code in the box and click on the regarding button.
                    <br></br><br></br> Well done! You should now the see the session screen, you joined a session!.
                    <br></br><br></br> You can write comments in the comment box, which is located on the right side of the screen. Write a nice roast!
                    <br></br><br></br>You can also report the session, if someone uses inapropriate vocabulary. To do that, just click on the "Report button". 
                    Then choose a reason, write a description and click on the ,,Create report" button.
                    <br></br><br></br>The host should declare a winner at a certain moment of the game, just write more comments until that time.
                    <br></br><br></br> Winner declared? Now you can leave the session by clicking on the "Leave session" button.</text>}
                    { Profile == true && <text><br></br><b>How to see and edit your profile:</b>
                    <br></br><br></br> In order to see or edit your profile, just click on the profile icon, 
                    which is displayed on the navigation bar above
                    <br></br><br></br> Now you should be able to see your avatar (if you have one), your username, name and bio.
                    <br></br><br></br> If you want to edit your profile, just click on the "Edit profile" button, 
                    which will redirect you to the edit profile page
                    <br></br><br></br> Here you can change your username, name, bio or upload a new avatar.
                    <br></br><br></br> To do that, just type in the text boxes or upload a picture by clicking on the avatar picture
                    <br></br><br></br> To save your new profile, just click on the "Save profile" button</text>}
                </div>
                
            </div>
        </div>
      </div>

  );
}

export default HelpPage;
