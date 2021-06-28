import React from 'react';
import './Navbar.css';
import Logo from './resource/logo.png';
import { Link } from "react-router-dom";
import UserProfile from './UserProfile.js';
var CryptoJS = require("crypto-js");

class Navbar extends React.Component
{
    constructor(props)
	{
	    super(props);
		this.generateContent = this.generateContent.bind(this);
		this.search = this.search.bind(this);
		this.setSearchKey = this.setSearchKey.bind(this);
		this.toggleShowUserProfileDropbox = this.toggleShowUserProfileDropbox.bind(this);
		this.state = {
			searchKey: '',
			searchUser: this.props.searchUser?this.props.searchUser:false,
			showProfileDropbox: false
		};
	}
	
	toggleShowUserProfileDropbox() {
		this.setState({ showProfileDropbox : this.state.showProfileDropbox?false:true });
	}
	
	setSearchKey(event) {
		this.setState({
			searchKey: event.target.value
		});
	}
	
	search(event) {
		
		event.preventDefault();
		const searchKey = this.state.searchKey.toUpperCase();
		if(this.state.searchUser) {
			const profileCards = document.getElementsByClassName('profileCard');
			const profileNames = document.getElementsByClassName('profileName');
			for(var i=0;i<profileCards.length;i++) {
				const info= profileNames[i].getElementsByTagName('p');
				const name=info[0].textContent.toUpperCase();
				const username=info[1].textContent.toUpperCase();
				if(name.indexOf(searchKey) > -1 || username.indexOf(searchKey) > -1) {
					profileCards[i].style.display='';
				}
				else {
					profileCards[i].style.display='none';
				}
			}
		}
		else {
			const names = document.getElementsByClassName('name');
			const descriptions = document.getElementsByClassName('description');
			const contents = document.getElementsByClassName('mainDescription');
			const posts = document.getElementsByClassName('post');
			for(var i=0;i<posts.length;i++) {
				const name = names[i].textContent.toUpperCase();
				const desc = descriptions[i].textContent.toUpperCase();
				const content = contents[i].textContent.toUpperCase();
				if(name.indexOf(searchKey) > -1 || desc.indexOf(searchKey) > -1 || content.indexOf(searchKey) > -1) {
					posts[i].style.display = '';
				}
				else {
					posts[i].style.display = 'none';
				}
			}
		}
		
	}
	
	generateContent() {
		if(this.props.loggedIn) {
			const ed = localStorage.getItem('ed');
			var bytes = CryptoJS.AES.decrypt(ed, 'birbal');
			const username = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
			return(
			<div className="topnav">
			<img alt='' style={{float:"left", height: "50px"}} src={Logo} />
            <Link to="/Newsfeed" style={{float:"left" ,marginTop:"5px", color:"white",fontFamily: "Times New Roman",letterSpacing:"0.06em", textTransform: "uppercase" , fontWeight:"light",}}>Pec Central</Link>
             <button id='navbar-dropdownbutton' onClick={() => {this.toggleShowUserProfileDropbox()}}><i class="fa fa-fw fa-user"></i> {username}</button>
			 <Link to="/Formpost"> <i class="fa fa-fw fa-upload"></i>New Post</Link>
			 <form>
				<input id='search' type="text" placeholder="Search.." onChange={this.setSearchKey} value={this.state.searchKey} />
				<button id='navbar-button' onClick={(event) => {this.search(event)}}> <i class="fa fa-fw fa-search"></i> </button>
			</form>
			</div>
			);
		}
		else {
			return(
			<div className="topnav">
			<img alt='' style={{float:"left", height: "50px"}} src={Logo} />
            <Link to="/" style={{float:"left" ,marginTop:"5px", color:"white",fontFamily: "Times New Roman",letterSpacing:"0.06em", textTransform: "uppercase" , fontWeight:"light",}}>Pec Central</Link>
             <Link to="/Login"><i class="fa fa-fw fa-sign-in"></i> Log In</Link>
			<Link to="/SignUp"><i class="fa fa-fw fa-user"></i> Join</Link>
			</div>
			);
		}
	}
	
	render()
	{
		let userProfileDropDown;
		if(this.state.showProfileDropbox) {
			userProfileDropDown = <UserProfile />;
		}
		return(
		<div class='navbar-container'>
		{this.generateContent()}
		<div class='navbar-profileDropboxContainer'>
		{userProfileDropDown}
		</div>
		</div>
	    );
	}
}
export default Navbar;