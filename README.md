# SoPra FS22 - Group 18 Roast me

## Introduction
“Roast Me!” is a game, where a user can host a roasting session and upload a picture, e.g. of a meal they cooked, a sweater they are wearing, or their pet. 

Other users can then join the roasting session as participants, and comment on the picture, making fun of it. 

The host will decide at the end of the session which participant wins the game.

## Technologies
- JSX, npm and React
- HTTP/Rest
- gradle, spring, java and mysql
- github, sonarqube and heroku

## High-level components
- Websocket: Socket.java uses the javax.websocket library to build a real time chat with different rooms
- TextApi: TextApi.java is hooked to a free API for text moderation. This component ensures that no blocked words are used in our chat rooms.
- Database: Application.java uses the jpa interface to store all kinds of information in a remote mysql server.

## Launch & Deployment
### Tutorials
First you have to get an idea of the used technology. For that we'll give you some links to get used to the used languages, libraries etc.
Next you'll get a step-by-step tutorial what to download and how to launch & deploy.<br/><br/>
Read and go through these Tutorials!
- [Getting started with React](https://reactjs.org/docs/getting-started.html)
- [Practical React Tutorial](https://reactjs.org/tutorial/tutorial.html) <br/>

Get an understanding of:
- [CSS](https://www.w3schools.com/Css/)
- [SCSS](https://sass-lang.com/documentation/syntax)
- [HTML](https://www.w3schools.com/html/html_intro.asp)

Two important technologies used in this programm:
- [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start)
- [react-hooks](https://reactrouter.com/web/api/Hooks)

### Download Dependencies

Now we are getting to the prerequisits of the deployment. You'll need Node.js to deploy. You can download it here:
- [Node.js](https://nodejs.org)

To download are dependencies for local deployment, run the following line in the terminal. First navigate with the terminal into your client code file using:
```
cd 'your/path/onYour/machine/toThe/client/file'
```
Then run this on the terminal

```
npm install
```
This might take a while. After the download is completed, you can go deploy locally. 

### Local Deployment
Deploy the application by running this on your terminal:
```
npm run dev
```
Normally the local deployment pops up by itself. If it doesn't, use this to view the deployment on your browser:
- [http://localhost:3000](http://localhost:3000)

When you edit the code in your IDE while the code is deploying locally, the browser will reload the page automatically and you can see your changes immediatly. <br/>
You can also see the console outputs and errors in the browser console (use google chrome).

### Testing
You can run the tests with
```
npm run test
```
Consider that testing is optional and that the tests are launched in an interactive watch mode.<br/>
For more testing information see: [running tests](https://facebook.github.io/create-react-app/docs/running-tests) <br/>
If you are a ```MacOS``` user and running into a ```fsevents``` error: 
[see here](https://github.com/jest-community/vscode-jest/issues/423)

### Build
Running
```
npm run build
```
in the terminal builds the app for production to the ```build``` folder. <br/>
It correctly bundles React in production mode and optimizes the build for the best performance: the build is minified, and the filenames include hashes.

#### For more information about deploying a react app visit [react deployment](https://facebook.github.io/create-react-app/docs/deployment)
#### To learn more about React, checkout the [React documentation](https://reactjs.org/)

## Illustrations
### Login / Registration
First you need to log in or create an account. After typing in your credentials, you can click ```enter``` or press the ```Login``` / ```Register``` Button. You can switch between Login and Registration page, by clicking the ```red button```. After logging in or registration, you'll be redirected to the home page.

### Home Page
<br/>
<img width="1415" alt="Bildschirmfoto 2022-05-29 um 22 43 45" src="https://user-images.githubusercontent.com/100378052/170890722-70e73a8f-615a-44f5-aa91-c28e3672451e.png"> 
<br/>

On the top of the page you have the navbar with the logo, the
```Home Button```
 ```Profile Page``` 
 ```Game Session```
 ```Help Page``` and 
 ```logout``` button. We'll get to some later on. <br/>
 On the home page, you can `create a new session` `join a session` or `join a session by identifier`. Also you can see how many roasting sessions there are taking place at the moment on the bottom of the page.
 
### Join a random Session
You can click the `join a session` button on the home page to join the first session in the queue, which is still waiting for participants.

### Join a session with your friends
The Host of the session has to give you the `identifier code` which is a 6 digit number. <br/>
<img width="343" alt="Bildschirmfoto 2022-05-29 um 22 58 35" src="https://user-images.githubusercontent.com/100378052/170891222-7f27450c-0e05-4474-a6c9-c4fdfb58cf41.png">
<br/>
You can type the code in the text field `Set Code` and press the button `Join a session by identifier` to join that session.

### Home Button
The `Home Button` as well as the `Logo` on top of each page, will redirect you to the home page from every page.

### Profile Page
The `Profile Page` Button on top of each page will redirect you to your profile. <br/>
<img width="668" alt="Bildschirmfoto 2022-05-29 um 23 04 59" src="https://user-images.githubusercontent.com/100378052/170891405-dc477783-df54-42c7-ade7-aa2e7c63ae18.png">
<br/>
There you can see your `Avatar Image` `Username` `Number of Participated Sessions` and `Number of Won Sessions`. If you click on the `Edit Profile` Button, you'll be redirected to: <br/>
<img width="669" alt="Bildschirmfoto 2022-05-29 um 23 05 15" src="https://user-images.githubusercontent.com/100378052/170891475-8ac623bb-eee6-4e2b-8dd3-19d32f3d94cb.png"> <br/>
Where you can Edit your profile and change your avatar image.
<br/>
You can cancel all the time by clicking any Button on the top.

### Help Page
You can get all informations about the app and its functions on the `Help Page`

### Create a new Session

<img width="486" alt="Bildschirmfoto 2022-05-29 um 23 17 39" src="https://user-images.githubusercontent.com/100378052/170891753-91b24580-f53d-4027-b1b4-691e814555e9.png"> <br/>
Here you can create a session by your self, set all parameters and start your own session. <br/> Then you'll be the host of the game and people can roast you. <br/>

### In Session
The Session will start when there are enough participants. In the `Chat Box`, you'll get all informations <br/><img width="636" alt="Bildschirmfoto 2022-05-29 um 23 22 57" src="https://user-images.githubusercontent.com/100378052/170891923-46aad6a9-dfee-4afc-a724-2874a64351f7.png"> <br/>
When there are enough players in session, you'll get there all messages. All insults should be removed by the application. Nevertheless, if someone offends you or anybody else, you can report the session by clicking `report session` button. <br/>
You can click on any user's name in the chat box and you'll see his profile page and his statistics. <br/>
When a session is closed by winning of a player, no one will be redirected automatically to the home page. So every user has time to read the roasts again.
#### As Host
If you're the host, you can't participate in chatting, because you shouldn't roast yourself :D <br/>
When you got enough roasted, you can select the winner. A list with the participants will pop up by clicking the `Select the Winner` Button. You can select the winner by clicking on a user's name on that list. If a new user joins the game, you can update the list with the button. The user's which joins and leaves will appear on the chat box.
<br/>
If you have to leave urgent? You can close the session and no one will be chosen as the winner.
<br/>
You can give the identifier code to your friends, so they can join your session.

#### As participant
As a participant you can send roasting messages in the text box, when there are enough players in the session. All informations and messages will be shown in the chat box. <br/>
You can leave the the session while the others are still playing, but as a punishment for ruining the fun, you can't rejoin.<br/>


### Enjoy Playing!




## Roadmap
1. In the future, you could set up a lobby where you can wait for participants to enter after the game starts. 
2. In addition, it would be useful to be able to see your own post and comment history. 
3. It would also be interesting if users could send voice messages or videos while "roasting" pictures.
## Authors and acknowledgment

- [Benjamin Bajralija](https://github.com/bbajrari)
- [Carol Ernst](https://github.com/carolernst-uzh)
- [Niels Zweifel](https://github.com/itsniezwe)
- [Said Haji Abukar](https://github.com/awhoa)
- [Timon Fopp](https://github.com/trofej)





## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


