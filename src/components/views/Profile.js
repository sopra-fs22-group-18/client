import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";

//Playerprofile component takes object user as parameter
const PlayerProfile = ({user}) => (
<div className="player-profile">

<div className="onlinestate&creationdate">
<h2>Online state and Creation Date</h2>
<div className="player-profile online state" >Online state: {user.loggedIn?"Online":"Offline"}</div>
<div className="player-profile creation date">Creation Date: {String(user.loggedIn)?user.creation_date:""}</div>
</div>

<div className="username&birthday&pic">
<h2>Username and Birthday</h2>
<div className="player-profile username" >Username: {user.username}</div>
<div className="player-profile birth date">Birth Date: {user.birthday==null?"Undefined":user.birthday}</div>
<h2>Profile Pic and  Stats</h2>
<div className="player-profile avatar">Profilepic: {user.imagepath}</div>
<div className="player-participated-sessions">Participated Sessions: {user.participated_sessions}</div>
<div className="player-won-sessions">Won Sessions: {user.won_sessions}</div>




</div></div>
);

PlayerProfile.propTypes = {
user: PropTypes.object
};

const Profile = () => {
const history = useHistory();
const [user, setUser] = useState(1);
const ProfilEdit = (id) => {
try {
  if(localStorage.getItem('userId')==localStorage.getItem('redirectedId')){history.push("/Edit");}
  
  else{alert("You can't access this profil page");}} 
  catch (error) {alert(`Something went wrong during the profileEdit: \n${handleError(error)}`);}
}

const ShowListOfAllUsers=() => {history.push('/Game');}//back button

useEffect(() => {// effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
  async function fetchData() {
  try {
    const response = await api.get(`/users/${localStorage.getItem("redirectedId")}`);
    console.log(response.data);

    // Get the returned profile
    setUser(response.data);
    console.log("User has been set");
  } 
  
  catch (error) {
    console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
    console.error("Details:", error);
    alert("Something went wrong while fetching the users! See the console for details.");
  }
}

fetchData();
}, []);


let content = <Spinner/>;

content = (
<div className="game"> 
<PlayerProfile  user={user}/>
<div class="buttons">
<Button class="button" width="100%" onClick={() => ProfilEdit(user.id)}> Edit Username or Birthday </Button>
<td>&nbsp;</td>
<Button class="button"width="100%" onClick={() =>  ShowListOfAllUsers()}> Back</Button>
</div></div>);

return (
<BaseContainer className="game container">
<h1>Profile Page</h1>
{content}
</BaseContainer>);}

export default Profile;

