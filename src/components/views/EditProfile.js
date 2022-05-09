import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/EditProfile.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import ProgressBar from 'components/firebase comps/uploadImage'

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
  const [username, setUsername] = useState(null);
  const [birthday, setBirthday] = useState(null);
 
  const edit = async () => {
    try {  
      if(localStorage.getItem('userId')==localStorage.getItem('redirectedId')){
        const id=localStorage.getItem('userId');
        const requestBody = JSON.stringify({
          "userId": id,
          "username": username
      });
        await api.put("/users/"+ localStorage.getItem("redirectedId"), requestBody);
        history.push(`/Profile`);
      }
      else{
      
        alert("You can't access this profil page");}

    } catch (error) {
      alert(`Something went wrong during the edit: \n${handleError(error)}`);}};

      const [file, setFile] = useState(null);
      const [error, setError] = useState(null);
      const [imageUrl, setImageUrl] = useState(null);
    
      const types = ['image/png', 'image/jpeg'];
    
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

      let uploadPhoto = (
        <div className = "uploadImage"style={{ height:170 }}>
          <div className = "uploadImage input"style={{ height:1 }}>
          <label>
            <input type="file" onChange={handleChange}   />
          </label>
          </div >
          { error && <div className="uploadImage output"><div className="error">{ error }</div></div>}
          { file && <div className="uploadImage output"style={{ width:100, height:100 }}><ProgressBar  file={file} setFile={setFile} imageUrl={imageUrl} setImageUrl={setImageUrl} /> </div>}
        </div>
      )

  return (   
  <BaseContainer>
    <div className="editProfile container">
      <div className="editProfile form">
        <FormField label="Username" value={username} onChange={un => setUsername(un)}/>
        {uploadPhoto}
        <div className="loginbutton-container"></div>
        <Button  width="100%"onClick={() => edit()}>Save</Button>
        </div>
      </div>
  </BaseContainer>);};

export default EditProfile;