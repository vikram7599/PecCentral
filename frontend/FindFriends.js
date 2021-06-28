import React from 'react'; 
import './FindFriends.css';
import bg from './resource/background1.jpg';
import Avatar from './resource/avatar.png';
import Navbar from './Navbar.js';
var CryptoJS = require("crypto-js");

class FindFriends extends React.Component {
	constructor(props) {
		super(props);
		this.generateContent = this.generateContent.bind(this);
		this.state={
			usersInfo: [],
			isloading: false
		};
	}
	
	componentWillMount()
    {
        const time = localStorage.getItem('setupTime');
        var now = new Date().getTime();
        if(now-time > 2*60*60*1000)
        {
        localStorage.removeItem('ed');
        localStorage.removeItem('setupTime');
        localStorage.removeItem('token');
        }
       
        const token = localStorage.getItem('token');
        if(!token)
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
        }
      }).catch((error) => {alert("Server isn't responding. Please try later.")})
        }
       
    }
	
	generateContent() {
		let count=1;
        return (this.state.usersInfo.map(info => {
			const uni = `user${count}`;
			count++;
            const profileImageUrl = info?(info[5]?info[5]:Avatar):Avatar;
		    console.log(profileImageUrl)
			return(<div key={uni} class="hexagon profileCard"><div class="hexagon-in"><div class="hexagon-in1" style={{ backgroundImage: "url(" + bg + ")" }}>
			<img class='findFriendImage' alt src={profileImageUrl} />
			<div class="profileName">
			<p>{info[0]}</p>
			<p style={{marginTop: "-10px"}}>({info[1]})</p>
			</div>
			<div class="overlay">
			<div class="profileText">
				<p class='profileInfo'>Mobile No - {info[2]}</p>
			<p class='profileInfo'>Email Id - {info[3]}</p>
			<p class='profileInfo'>Branch - {info[4]}</p>
			</div>
			</div></div></div></div>
		);
		}));
	}
	
	componentDidMount() {
		document.body.className = 'body-FindFriends';
		fetch('http://127.0.0.1:5004/getUsersInfo',
        {
        method: 'GET',
        headers: {
                 'Accept': 'application/json',
                 "Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json'
                 },
        }).then(response  => {
        if(!response.ok) throw new Error(response.status);
        else return response.json()
        }).then(json => {
			this.setState({usersInfo: json.data});
      }).catch((error) => {alert("Server isn't responding. Please try later.")})
       
	}
	
	
	render() {
		
		
    if(this.state.isloading === false)
        {
            return null;
        };
		return (
		
            <div class='container-findFriends'>
		<Navbar loggedIn={true} searchUser={true}/>
		<div class='container-userGrid'>
		<div class="friends-grid" >
			{this.generateContent()}
		</div>
		</div>
		</div>
		);
	}
}

export default FindFriends;