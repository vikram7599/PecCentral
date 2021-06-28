import React from 'react';
import Avatar from './resource/avatar.png';
import { Link } from "react-router-dom";
import './UserProfile.css';
var CryptoJS = require("crypto-js");

class UserProfile extends React.Component {
	constructor (props) {
		super(props);
		this.logout = this.logout.bind(this);
		this.state = {
			details: []
		};
	}
	
	logout() {
		localStorage.removeItem('ed');
        localStorage.removeItem('setupTime');
        localStorage.removeItem('token');
	}
	
	componentDidMount() {
		const ed = localStorage.getItem('ed');
		var bytes = CryptoJS.AES.decrypt(ed, 'birbal');
		const username = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
		fetch('http://127.0.0.1:5004/getUserInfo',
        {
        method: 'POST',
        headers: {
                 'Accept': 'application/json',
                 "Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json'
                 },
        body: JSON.stringify({
        'username': username
        })
        }).then(response  => {
        if(!response.ok) throw new Error(response.status);
        else return response.json()
        }).then(json => {
		var data = json.data;
		this.setState({details: data});
      }).catch((error) => {alert("Server isn't responding. Please try later.")})
       
	}
	
	render() {
		
		const ed = localStorage.getItem('ed');
		var bytes = CryptoJS.AES.decrypt(ed, 'birbal');
		const username = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
		const profileImageUrl = this.state.details[0]?(this.state.details[0][5]?this.state.details[0][5]:Avatar):Avatar;
		return(
	<div class="userProfileDropbox">
  <img class='userProfileDropboxImage' src={profileImageUrl} />
  <h1>{this.state.details[0]?this.state.details[0][0]:null}</h1>
  <p class="userProfileNameText">Username : {this.state.details[0]?this.state.details[0][1]:null} <br/> Mobile Number : {this.state.details[0]?this.state.details[0][2]:null} <br/> Email Id : {this.state.details[0]?this.state.details[0][3]:null} </p>
  <Link to={{pathname:"/MyProfile",query:{username: username}}}><i class="fa fa-fw fa-user"></i> My Profile</Link>
  <Link to="/FindFriends"><i class="fa fa-fw fa-search"></i> Find Friends</Link>
  <Link to="/" onClick={this.logout}><i class="fa fa-fw fa-sign-out"></i> Log Out</Link>
</div> 
);
	}
}

export default UserProfile;