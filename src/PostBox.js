import React from 'react';
import './PostBox.css';
import PostTop from './PostTop.js';

class PostBox extends React.Component {
	constructor(props) {
		super(props);
		this.hidePost = this.hidePost.bind(this);
		this.generateContent = this.generateContent.bind(this);
		this.toggleReadMore = this.toggleReadMore.bind(this);
		this.state = {
			readMore: true,
			username: this.props.username,
			createdAt: this.props.createdAt,
			description: this.props.description,
			resourceUrl: this.props.resourceUrl,
			postId: this.props.postId,
			postType: this.props.postType,
			postCategory: this.props.postCategory,
			hide: false
		};
	}
	
	toggleReadMore() {
		const val = this.state.readMore?false:true;
		this.setState({
			readMore: val
		});
	}
	
	generateContent() {
		if(this.state.readMore === true) {
			return(
			<div class='mainBox'>
			<p class='postTypeAndCategory'> Type: {this.state.postType}  Category: {this.state.postCategory}</p>
			<p class='mainDescription' style={{overflow: 'hidden', maxHeight: '50px'}}>{this.state.description}</p>
			<a class='readMore' onClick={()=>{this.toggleReadMore();}}>... Read More</a>
			<div class='container'>
			<img alt='' class='mainImage' src={this.props.resourceUrl} crossOrigin="anonymous"/>		
			</div>
			</div>
			);
		}
		else {
			return(
			<div class='mainBox'>
			<p class='postTypeAndCategory'> Type: {this.state.postType}  Category: {this.state.postCategory}</p>
			<p class='mainDescription'> {this.state.description}</p>
			<a class='readMore' onClick={()=>{this.toggleReadMore();}}>... Read Less</a>
			<div class='container'>
			<img alt='' class='mainImage' src={this.props.resourceUrl} crossOrigin="anonymous"/>		
			</div>
			</div>
			);
		}
	}
	
	hidePost() {
		this.setState({hide: true});
	}
	
	render() {
		return (
		<div class='post' style={{display: this.state.hide?'none':'block' }}>
		<PostTop hidePost={this.hidePost} username={this.state.username} createdAt={this.state.createdAt} />
		{this.generateContent()}
		</div>
		);
	}
}

export default PostBox;