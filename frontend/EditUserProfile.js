import React from 'react';
import Avatar from './resource/avatar.png'; 
import './EditUserProfile.css';
import PostBox from './PostBox.js';
import storage from "./firebase";
import Navbar from "./Navbar.js";
import MyPosts from "./MyPosts.js";
import FavPosts from "./FavPosts.js";

var CryptoJS = require("crypto-js");


class EditUserProfile extends React.Component {
	constructor(props) {
			super(props);
			this.openTab = this.openTab.bind(this);
			this.generateContent = this.generateContent.bind(this);
		this.setProfileImage = this.setProfileImage.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
		this.getUserInfo = this.getUserInfo.bind(this);
		this.changeProfileImageOption = this.changeProfileImageOption.bind(this);
			this.state = {
				tabOpened: 'MyPosts',
				isloading: false,
				details: [],
				username: this.props.location.query.username
			};
	}
	
	openTab(str) {
		this.setState({tabOpened: str});
	}
	
	
	selectForDeletion(event) {
		fetch('http://127.0.0.1:5006/deletePost',
        {
        method: 'POST',
        headers: {
                 'Accept': 'application/json',
                 "Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json'
                 },
        body: JSON.stringify({
        'postId': event.target.id
        })
        }).then(response  => {
        if(!response.ok) throw new Error(response.status);
        else return response.json()
        }).then(json => {
		var status = json.status;
		if(status == 1) {
			this.setState({myPosts: [], pageStatus: 0});
		}
		else {
			alert("Server isn't responding. Please try later.")
		}
      }).catch((error) => {alert("Server isn't responding. Please try later.")})
	}
	
	
	getUserInfo() {
		fetch('http://127.0.0.1:5004/getUserInfo',
        {
        method: 'POST',
        headers: {
                 'Accept': 'application/json',
                 "Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json'
                 },
        body: JSON.stringify({
        'username': this.state.username
        })
        }).then(response  => {
        if(!response.ok) throw new Error(response.status);
        else return response.json()
        }).then(json => {
		var data = json.data;
		this.setState({details: data});
      }).catch((error) => {alert("Server isn't responding. Please try later.")})
       
	}
	
	componentDidMount() {
		
		const time = localStorage.getItem('setupTime');
        var now = new Date().getTime();
        if(now-time > 2*60*60*1000)
        {
        localStorage.removeItem('ed');
        localStorage.removeItem('setupTime');
        localStorage.removeItem('token');
        }
        const token = localStorage.getItem('token');
        if(!token )
		{
			alert("Please login.");
			return (this.props.history.push('/Login'));
		}
        else
        {
			const ed = localStorage.getItem('ed');
			var bytes = CryptoJS.AES.decrypt(ed, 'birbal');
           var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
           fetch('http://127.0.0.1:5005/tokenverify',
        {
        method: 'POST',
        headers: {
                 'Accept': 'application/json',
                 "Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json'
                 },
        body: JSON.stringify({
        'user_exists': decryptedData
        })
        }).then(response  => {
        if(!response.ok) throw new Error(response.status);
        else return response.json()
        }).then(json => {
        console.log(json.token);
        var validate_token = JSON.stringify(json.token);
        console.log(validate_token);
        console.log(token);
        if(validate_token !== token){
        alert("Please login first to access the page.");
        return (this.props.history.push('/Login'));
        }
        else
		{
			this.setState({isloading:true});
			document.body.className = '';
			this.getUserInfo();
		}
     }).catch((error) => {alert("Server isn't responding. Please try later.")})
    }}
	
	generateContent() {
		const tabs = document.getElementsByClassName('tablink');
		for(var i=0;i<tabs.length;i++) {
			tabs[i].style.border = 'none';
			tabs[i].style.color = 'white';
		}
		
		if(this.state.tabOpened === 'MyPosts') {
			if(document.getElementById("MyPostsBtn")) {
					const btn = document.getElementById("MyPostsBtn");
					btn.style.border='1px solid #f4f4f4';
					btn.style.color='#7DCADA';
			}
			return(
			
			<MyPosts username={this.state.username} />
			);
		}
		else {
			if(document.getElementById("FavouritesBtn")) {
					const btn = document.getElementById("FavouritesBtn");
					btn.style.border='1px solid #f4f4f4';
					btn.style.color='#7DCADA';
			}
			return (
			<FavPosts username={this.state.username} />
			);
		}
	}
	
	handleUpload(event)
    {
    event.preventDefault();
    const reference = storage.ref();
    const  selectedfile = event.target.files[0];
    const upload = reference.child(`images/${selectedfile.name}`).put(selectedfile);
    upload.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(selectedfile.name)
          .getDownloadURL()
          .then(furl => {
            this.setProfileImage(furl);
          })
      }
    )
   }
	
	setProfileImage(url) {
		const ed = localStorage.getItem('ed');
  var bytes = CryptoJS.AES.decrypt(ed, 'birbal');
           var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	fetch('http://127.0.0.1:5006/updateProfilePicture',
	{
        method: 'POST',
        headers: {
                 'Accept': 'application/json',
                 "Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json'
                 },
        body: JSON.stringify({
        'username': decryptedData,
        'imageUrl':url
        })
        }).then(response  => {
        if(!response.ok) throw new Error(response.status);
        else return response.json()
        }).then(json => {
        var status_code = json.status;
        if(status_code !== 1)
        {
          alert("Some Error Occurred, Please try again later.");
        }        
		this.getUserInfo();
      }).catch((error) => {alert("Server isn't responding. Please try later.'")})
       
	}
	
	changeProfileImageOption() {
		const ed = localStorage.getItem('ed');
			const bytes = CryptoJS.AES.decrypt(ed, 'birbal');
			const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
		if(this.state.username === decryptedData) {
			document.getElementById('file1').click()
		}
	}
	
	render() {
		if(this.state.isloading === false) {
				return null;
		}
		console.log(this.state.details[0])
		const profileImageUrl = this.state.details[0]?(this.state.details[0][5]?this.state.details[0][5]:Avatar):Avatar;
		console.log(profileImageUrl);
		return (
		
    <div class='container-myprofile'>
	
    <Navbar loggedIn={true}/>
			<div class='edit-profile-container'>
			<div class='left-side'> 
			<div class='left-top'> </div>
			<input type="file" id='file1' accept="image/*" capture style={{display:"none"}} onChange={this.handleUpload} />
			<img onClick={this.changeProfileImageOption} class='profile-image' src={profileImageUrl} />
			<p class='user-details'><i class='fa fa-fw fa-user profile-icons'></i> {this.state.details[0]?this.state.details[0][0]:null}</p>
			<p class='user-details'><i class='fa fa-fw fa-envelope profile-icons'></i> {this.state.details[0]?this.state.details[0][3]:null} </p>
			<p class='user-details'><i class='fa fa-fw fa-phone profile-icons'></i> {this.state.details[0]?this.state.details[0][2]:null} </p>
			<p class='user-details'><i class='fa fa-fw fa-users profile-icons'></i> {this.state.details[0]?this.state.details[0][4]:null} </p>
			</div>
			<div class='right-side'>
			
			<div class="tabs">
			<button class="tablink" id='MyPostsBtn' onClick={()=> {this.openTab('MyPosts')}}>My Posts</button>
			<button class="tablink" id='FavouritesBtn' onClick={() => {this.openTab('Favourites')}}>Favourites</button>
			</div>
			
			{this.generateContent()}
			
			</div>
			</div>
			</div>
		);
	}
}

export default EditUserProfile;
