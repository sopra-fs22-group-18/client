import {useHistory} from "react-router-dom";
import "styles/views/Comment.scss"
import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button} from "../ui/Button";
import {api, handleError} from "../../helpers/api";
import User from "../../models/User";
import Session from "../../models/Session";
import image from "C:/Users/a/client2/client/src/components/views/avatar.jpg";




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


const Comment = () => {
    const history = useHistory();
    const [title, setTitle] = useState(null);
    const [commentId, setCommentId] = useState(null);
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [createdDate, setCreatedDate] = useState(null);
    const [username, setUsername] = useState("maxihassluja");



    const createComment = async () => {
      
            const userResponse = await api.get('/sessions/{sessionId}/comments' + localStorage.getItem('userId'));
            const host = new User(userResponse.data);
            const requestBody = JSON.stringify({commentId, user, session, commentText,createdDate });
            const response = await api.post('/sessions/{sessionId}/comments', requestBody);

            // Get the returned user and update a new object.
            const comment = new Comment(response.data);
    }

    

    let addComment = (<Button
        width="100%"
        onClick={() => addComment()}> Add comment
    </Button>)



let avatar = (
    <FormField
/>)
    let commentText = (
        <FormField
            placeholder="Add your comment..."
            value={title}
            onChange={t => commentText(t)}/>)


   


    return (
        <div className="newComment">
            <div className="newComment container">
            <div className="newComment avatar">
           <img src={image} width={80} height={80} alt='Avatar' /></div>
           <div className="newComment username">
                {username}
            </div>
           <div>&nbsp;</div>
            <div className="newComment form">
                {commentText}
            </div>
                {addComment}
            </div>
        </div>
    )
}

export default Comment