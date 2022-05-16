import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";

//Playerprofile component takes object user as parameter

const PlayerProfile = ({posts}) => (
    
    
<div className="player-profile">




<div className="allposts">
<h2>Posts</h2>

<div className="player-profile posts" >Posts: {posts}</div>
</div></div>
);

PlayerProfile.propTypes = {
user: PropTypes.object
};

const Posts = () => {
const history = useHistory();
const [user, setUser] = useState(1);
const [Posts, setPosts] = useState(1);

const ProfilEdit = (id) => {
try {
  if(localStorage.getItem('idlocal')==id){history.push("/Edit");}
  else{alert("You can't access this profil page");}} 
  catch (error) {alert(`Something went wrong during the profileEdit: \n${handleError(error)}`);}
}

const ShowListOfAllUsers=() => {history.push('/Game');}//back button

useEffect(() => {// effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
  async function fetchData() {
  try {
    const response2 = await api.get(`/sessions/1/posts`);
    const response=response2;
    console.log(response.data);
    const response3=response2.data;
    const response4=JSON.stringify(response3);

    console.log(response4);
    //const array = Object.keys(response3).map(key => response3[key]);
    //array.forEach(item => console.log(item.username))
    // Get the returned profile
    setUser(response.data);
    setPosts(response4)
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
let text1=Posts;
//let title=text1.indexOf('title');
//let title2=text1.indexOf('hostUsername');
//let title3=text1.substr(title+8,title2-title-11);
content = (
<div className="game"> 
<h2>Title</h2>

<div className="Title" > {text1}</div>
<h2>Image</h2>
<div className="Image" >Image: {text1}</div>
<h2>Status</h2>
<div className="Status" >Status: {text1}</div>

<PlayerProfile  user={Posts}/>

</div>);

return (
<BaseContainer className="game container">
<h1>Posts</h1>
{content}
</BaseContainer>);}






export default Posts;

