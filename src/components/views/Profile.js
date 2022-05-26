import { useState, useEffect } from 'react';

import {useHistory, useParams} from 'react-router-dom';
import "styles/views/Profile.scss";
import {Navbar} from "../ui/Navbar";
import { api, handleError } from 'helpers/api';
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

  const editProfile = () => {
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

  let editProfileButton = (
    <div>
        <Button6 width = "100%" 
        onClick={() => editProfile()}>
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
                <h2>Participated Sessions: {user["participatedSessions"]}</h2>
                <h2>Won Sessions: {user["wonSessions"]}</h2>
                {localStorage.getItem('userId') == user.userId && editProfileButton}
            </div>
      </div>
      </div>
      </div>

  );
}

export default Profile;
