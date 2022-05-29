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
import Switch from "components/ui/Switch";
import noImage from "../../img/noImage.png";

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
    const [isPrivate, setIsPrivate] = useState(false);
  
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
            console.log(title);
            const userResponse = await api.get('/users/' + localStorage.getItem('userId'));
            const host = new User(userResponse.data);
            const requestBody = JSON.stringify({title, maxParticipants, host, imageUrl, isPrivate});
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
        onClick={() => createSession()}
        > Start session
    </Button>)

    let sessionTitle = (
        <FormField
            placeholder="Add your session title..."
            value={title}
            onChange={t => setTitle(t)}/>)

    

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

    let toggleOptions = (
        <div className = "newSession toggleOptions">
            <div className="newSession list-item text">
                Toggle private game: 
            </div>
            <Switch
                isOn={isPrivate}
                handleToggle={() => setIsPrivate(!isPrivate)}
            />
        </div>
    )

    return (
    <div className="newSession">

        <Navbar></Navbar>
     
        
        
        
        <div className="newSession container">
            <div className="newSession form">
                <div className="newSession box">
                    <div className="newSession list-item text">
                        Name your session
                    </div>
                    {sessionTitle}
                </div>
                <div className="newSession box picture">
                    <div className="newSession list-item text">Add your picture </div>
                    <div class="image-upload">
          
                    <label for="file-input">
                        {imageUrl && <img alt="Image" src={imageUrl}></img>}
                        {!imageUrl && <img alt="Image" src={noImage}></img>}
                        
            
                    </label>
                    <input id="file-input" type="file" onChange={handleChange}/>
                </div>
                { error && <div className="uploadImage output"><div className="error">{ error }</div></div>}
                { file && <div className="uploadImage output"><ProgressBar file={file} setFile={setFile} imageUrl={imageUrl} setImageUrl={setImageUrl} /> </div>}
                </div>
                {maxParticipantSetting}
                {toggleOptions}
            </div>
                {startButton}
        </div>
    </div>
    )
}

export default NewSession;