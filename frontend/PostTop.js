import React from 'react';
import './PostTop.css';
import Avatar from './resource/avatar.png';
import { Link } from "react-router-dom";
var CryptoJS = require("crypto-js");

class PostTop extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: this.props.username,
			createdAt: this.props.createdAt,
			showOptions: false,
			postId: this.props.postId,
			showModal: false,
			details: []
		};
		this.hidePost = this.props.hidePost;
		this.addToFav = this.addToFav.bind(this);
		this.generateModal = this.generateModal.bind(this);
		this.toggleShow = this.toggleShow.bind(this);
	}
	
	toggleShow() {
		this.setState({showOptions: this.state.showOptions?false:true});
	}
	
	addToFav() {
		const ed = localStorage.getItem('ed');
		var bytes = CryptoJS.AES.decrypt(ed, 'birbal');
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
	fetch('http://127.0.0.1:5006/addToFav',
	{
        method: 'POST',
        headers: {
                 'Accept': 'application/json',
                 "Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json'
                 },
        body: JSON.stringify({
        'username': decryptedData,
        'postId': this.state.postId
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
		
      }).catch((error) => {alert("Server isn't responding. Please try later.'")})
       
		this.setState({showModal: true});
	}
	
	componentDidMount() {
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
	
	generateModal() {
		if(this.state.showModal) {
		return(
		<div class="modal-content" onAnimationEnd={() => this.setState({ showModal: false })}>
		<div class="modal-body">
		<p>This Post with Post Id = {this.state.postId} successfully saved !</p>
		</div>
		<div class="modal-footer">
		<h4>Check saved posts in your Profile</h4>
		</div>
		</div>);
		}
	}
	
	render() {
		const profileImageUrl = this.state.details[0]?(this.state.details[0][5]?this.state.details[0][5]:Avatar):Avatar;
		return (
			<div class='box'>
				<img class='profileImage' src={profileImageUrl} />
				<p style={{marginTop: '7px'}}><Link to={{pathname:"/MyProfile",query:{username: this.state.username}}} class='name'>{this.state.details[0]?this.state.details[0][0]:null} ({this.state.username})</Link></p>
				<p class='description'>Posted On {this.state.createdAt}</p>
				<i class="fa fa-star" id="favOption" onClick={this.addToFav}></i>
					{this.generateModal()}
				<i class="fa fa-ellipsis-v" id='showOptions' onClick={this.toggleShow}></i>
				<div id="optionsDropdown" style={{display: this.state.showOptions?'block':'none'}}>
					<a onClick={this.hidePost}>Hide</a>
				</div>
			</div>
		);
	}
}

export default PostTop;