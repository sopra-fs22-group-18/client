import {useHistory} from "react-router-dom";
import {Navbar} from "../ui/Navbar";
import "styles/views/NewSession.scss"
import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button} from "../ui/Button";
import minusButton from "../../img/minusButton.png";
import plusButton from "../../img/plusButton.png";
import {api, handleError} from "../../helpers/api";
import User from "../../models/User";
import Session from "../../models/Session";
import ProgressBar from 'components/firebase comps/uploadImage'

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


const NewSession = () => {
    const history = useHistory();
    const [title, setTitle] = useState(null);
    const [maxParticipants, setMaxParticipants] = useState(2);

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

    const createSession = async () => {
        try {
            const userResponse = await api.get('/users/' + localStorage.getItem('userId'));
            const host = new User(userResponse.data);
            const requestBody = JSON.stringify({title, maxParticipants, host, imageUrl});
            const response = await api.post('/sessions', requestBody);

            // Get the returned user and update a new object.
            const session = new Session(response.data);
            // Login successfully worked --> navigate to the route /game in the GameRouter
            history.push(`/game/session/` + session.sessionId);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    const subtractOne = () => {
        if (maxParticipants > 2) {
            setMaxParticipants(maxParticipants - 1)
        }
    }

    const addOne = () => {
        setMaxParticipants(maxParticipants + 1)
    }

    let startButton = (<Button
        width="100%"
        onClick={() => createSession()}> Start session
    </Button>)

    let sessionTitle = (
        <FormField
            placeholder="Add your session title..."
            value={title}
            onChange={t => setTitle(t)}/>)
    
    let uploadPhoto = (
      <div className = "uploadImage">
        <div className = "uploadImage input">
        <label>
          <input type="file" onChange={handleChange} />
        </label>
        </div>
        { error && <div className="uploadImage output"><div className="error">{ error }</div></div>}
        { file && <div className="uploadImage output"><ProgressBar file={file} setFile={setFile} imageUrl={imageUrl} setImageUrl={setImageUrl} /> </div>}
      </div>
    )

    let maxParticipantSetting = (
        <ul className="newSession maxParticipants">
            <li className="newSession list-item text">
                Max. number of participants:
            </li>
            <li className="newSession list-item">
                <button
                    className="setting-button"
                    onClick={() => subtractOne()}>
                    <img className="setting-icon" src={minusButton} alt="minus"/>
                </button>
            </li>
            <li className="newSession list-item text">
                {maxParticipants}
            </li>
            <li className="newSession list-item">
                <button
                    className="setting-button"
                    onClick={() => addOne()}>
                    <img className="setting-icon" src={plusButton} alt="plus"/>
                </button>
            </li>
        </ul>
    )

    return (
        <div className="newSession">
        <Navbar/>
            <div className="newSession container">
            <div className="newSession form">
                {sessionTitle}
                {uploadPhoto}
                {maxParticipantSetting}
            </div>
                {startButton}
            </div>
        </div>
    )
}

export default NewSession;