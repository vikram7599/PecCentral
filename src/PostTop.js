import React from 'react';
import './PostTop.css';
import Avatar from './resource/avatar.png';

class PostTop extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: this.props.username,
			createdAt: this.props.createdAt,
			showOptions: false
		};
		this.hidePost = this.props.hidePost;
		this.toggleShow = this.toggleShow.bind(this);
	}
	
	toggleShow() {
		this.setState({showOptions: this.state.showOptions?false:true});
	}
	
	render() {
		return (
			<div class='box'>
				<img class='profileImage' src={Avatar} alt='' />
				<p class='name'>{this.state.username}</p>
				<p class='description'>Posted On {this.state.createdAt}</p>
				<i class="fa fa-ellipsis-v" id='showOptions' onClick={this.toggleShow}></i>
				<div id="optionsDropdown" style={{display: this.state.showOptions?'block':'none'}}>
					<a onClick={this.hidePost}>Hide</a>
				</div>
			</div>
		);
	}
}

export default PostTop;