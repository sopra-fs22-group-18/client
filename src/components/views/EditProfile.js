import { useState, useEffect } from 'react';
import {useHistory, useParams} from 'react-router-dom'
import {api, handleError} from 'helpers/api';
import {Button} from 'components/ui/Button';
import 'styles/views/EditProfile.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import ProgressBar from 'components/firebase comps/uploadImage'
import {Navbar} from "../ui/Navbar";
import noAvatar from "../../img/noAvatar.png";
import UploadAvatar from 'components/firebase comps/uploadAvatar';

//component for Editpage display, defining label,value and onchange as passable values
const FormField = props => {
  return (
    <div className="edit field"> <label className="edit label"> {props.label} </label>
    <input className="edit input" placeholder="enter here.." value={props.value} onChange={e => props.onChange(e.target.value)}/>
    </div>);};

//defining type of passable values to FormField
FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

const EditProfile = () => { //setting start states of username and birthday
  const history = useHistory();
  const userId = useParams().userId;
  const [user, setUser] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [username, setUsername] = useState(null);
  const [name, setName] = useState(null);
  const [bio, setBio] = useState(null);

  const types = ['image/png', 'image/jpeg'];
  
 
  const edit = async () => {
    try {  
      if(localStorage.getItem('userId') == user.userId){
        const requestBody = JSON.stringify({
          "userId": userId,
          "username": username,
          "avatarUrl": avatarUrl,
          "name": name,
          "bio": bio
      });
        await api.put("/users/"+ userId, requestBody);
        history.push(`/Profile`);
      }
      else{
      
        alert("You can't access this profil page");}

    } catch (error) {
      alert(`Something went wrong during the edit: \n${handleError(error)}`);}};
    
      const handleChange = (e) => {
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

  return (   
    <div><Navbar />
      <div className="editProfile">
        <div className="editProfile container">
          <div className="editProfile form">
          <div>Click on the avatar below to upload a new avatar image.</div>
              <div class="image-upload">
          
                <label for="file-input">
                  {user.avatarUrl && <img alt="Avatar" src={user.avatarUrl}></img>}
                  {!user.avatarUrl && <img alt="Avatar" src={noAvatar}></img>}
                </label>
                <input id="file-input" type="file" onChange={handleChange}/>
            </div>
            { error && <div className="uploadAvatar output"><div className="error">{ error }</div></div>}
            { file && <div className="uploadAvatar output"><UploadAvatar file={file} setFile={setFile} avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl} /> </div>}
            <FormField label="Username" value={username} onChange={un => setUsername(un)}/>
            <FormField label="Name" value={name} onChange={na => setName(na)}/>
            <FormField label="Bio" value={bio} onChange={bi => setBio(bi)}/>
            <div className="loginbutton-container"></div>
            <Button  width="100%"onClick={() => edit()}>Save Profile</Button>
          </div>
        </div>
      </div>
    </div>);};

export default EditProfile;