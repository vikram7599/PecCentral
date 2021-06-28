import React from "react";
import { Route, Switch } from "react-router-dom";
import MainPage from './MainPage.js';
import SignUp from './SignUp.js';
import Newsfeed from './Newsfeed.js';
import Formpost from './Formpost.js';
import ResetPassword from './ResetPassword.js';
import Login from './Login.js';
import Forgot from './Forgot.js';
import FindFriends from './FindFriends.js';
import EditUserProfile from './EditUserProfile.js';

export default function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/SignUp" component={SignUp} />
        <Route path="/Newsfeed" component={Newsfeed} />
        <Route path="/Formpost" component={Formpost} />
        <Route path="/Login" component={Login} />
        <Route path="/Reset" component={ResetPassword} />
        <Route path="/Forgot" component={Forgot} />
		<Route path="/FindFriends" component={FindFriends} />
		<Route path="/MyProfile" component={EditUserProfile} />
      </Switch>
    </div>
  );
}