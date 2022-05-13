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

=======
import {useHistory, useParams} from 'react-router-dom';
import "styles/views/Profile.scss";
import {Navbar} from "../ui/Navbar";
import { api, handleError } from 'helpers/api';
import UploadAvatar from 'components/firebase comps/uploadAvatar';
import PropTypes from "prop-types";
import noAvatar from "../../img/noAvatar.png";
import {Button6} from "../ui/Button";

const FormField = props => {
    return (
        <div className="title-field">
            <input
                className="title-field"
                placeholder={props.placeholder}
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormField.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};



const Profile = () => {
  // use react-router-dom's hook to access the history
  const history = useHistory();
  const userId = useParams().userId;
  const [user, setUser] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const types = ['image/png', 'image/jpeg'];


  const handleAvatarChange = (e) => {
    let selected = e.target.files[0]; // to select the first file (in order someone selects more files)
    console.log(selected); 
    
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Please select an image file (png or jpg)');
    }
  };

  const editProfile = (userId) => {
    try {
      if(localStorage.getItem('userId') == user.userId){history.push(`/game/profile/${user.userId}/edit`)}
      
      else{alert("You can't access this profil page");}
     } catch (error) {
        console.error(`Something went wrong while trying to edit the user: \n${handleError(error)}`);
        console.error("Details:", error);
        alert("Something went wrong when trying to edit the profile! See the console for details.");
    }
  };


  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    const fetchData = async () => {
      try {
        const response =  await api.get('/users/'+ userId );

        setUser(response.data);

        console.log('request to:', response.request.responseURL);
        console.log('status code:', response.status);
        console.log('status text:', response.statusText);
        console.log('requested data:', response.data);
      } catch (error) {
        console.error(`Something went wrong while getting the data for the user: \n${handleError(error)}`);
        console.error("Details:", error);
        alert("Something went wrong while getting the data for the user! See the console for details.");
      }

    }

      fetchData()
    }, []);

  let uploadAvatar = (
    <div className = "profile form">
    <div className = "uploadAvatar">
      <div className = "uploadAvatar input">
      <input type="file" src= {user !== [] && user.avatarUrl} onChange={handleAvatarChange}/>
      </div>
      { error && <div className="uploadAvatar output"><div className="error">{ error }</div></div>}
      { (file || avatarUrl) && <UploadAvatar file={file} setFile={setFile} avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl} />}
    </div>
    </div>
  )

  let editProfileButton = (
    <div>
        <Button6 width = "100%" 
        onClick={() => editProfile(user.userId)}>
            Edit Profile
        </Button6>
    </div>
)


  return (
      <div><Navbar />
      <div className="profile" >
      <div className="profile container">
            <div className="profile form">
            <div className = "avatar">
                { user.avatarUrl && user && (<img alt="Avatar" src={user.avatarUrl}></img>)}
                { !user.avatarUrl && (<img alt="Avatar" src={noAvatar}></img>)}
                </div>

                {user.username && user && <h1>{user.username}</h1>}
                {user.name && user &&<h2>Name: {user.name}</h2>}
                {user.bio && user && <h2>Bio: {user.bio}</h2>}
                {localStorage.getItem('userId') == user.userId && editProfileButton}
            </div>
      </div>
      </div>
      </div>

  );
}

export default Profile;
