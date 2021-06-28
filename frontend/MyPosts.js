import React from 'react';
import Avatar from './resource/avatar.png'; 
import './EditUserProfile.css';
import PostBox from './PostBox.js';
import storage from "./firebase";
import Navbar from "./Navbar.js";
import Newsfeed from './Newsfeed.js';
var CryptoJS = require("crypto-js");


class MyPosts extends React.Component {
	constructor(props) {
			super(props);
		
		this.fetchPosts = this.fetchPosts.bind(this);
		this.handleObserver = this.handleObserver.bind(this);
		this.selectForDeletion = this.selectForDeletion.bind(this);
		this.generateEditableOption = this.generateEditableOption.bind(this);
			this.state = {
				myPosts: [],
				pageStatus: 0,
				prevY: 0,
				isloading: false,
				username: this.props.username
			};
	}
	
	handleObserver(entities, observer) {
		const y = entities[0].boundingClientRect.y;
		if (this.state.prevY > y) {
			this.fetchPosts();
		}
		this.setState({ prevY: y });
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
	
	generateEditableOption(postId) {
		const ed = localStorage.getItem('ed');
			const bytes = CryptoJS.AES.decrypt(ed, 'birbal');
			const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
			let editableOption=null;
			if(this.state.username==decryptedData) {
				return(<i id={postId} onClick={this.selectForDeletion} class="fa fa-fw fa-trash"></i>);
			}
	}
	
	fetchPosts() {
		fetch('http://127.0.0.1:5006/myPosts',
		{
			method: 'POST',
			headers: {
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
                },
			body: JSON.stringify({
			'pageStatus': this.state.pageStatus,
			'username': this.state.username
			})
        }
		).then(response  => {
        if(!response.ok) throw new Error(response.status);
        else return response.json()
        }).then(res => {
		
		if(res.data.length > 0) {
			let newPosts = [];
			for(let i=0;i<res.data.length;i++) {
				if(res.data[i][0]===this.state.username) {
					newPosts.push(
					<div key={res.data[i][1]} class='my-post-box'>
						<PostBox username= {res.data[i][0]} createdAt= {res.data[i][5]} description={res.data[i][6]} resourceUrl= {res.data[i][4]} postId= {res.data[i][1]}	postType= {res.data[i][2]} postCategory= {res.data[i][3]} />
							<div id={res.data[i][1]} class='editableOption'>
							{
								this.generateEditableOption(res.data[i][1])
							}
							</div>
							</div>
					);
				}
			}
			this.setState({ myPosts: [...this.state.myPosts, ...newPosts] });
			this.setState({ pageStatus: this.state.pageStatus+res.data.length });
		}
		
      }).catch((error) => {alert("Server isn't responding. Please try later.")});
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
			this.fetchPosts();
			var options = {
			root: null,
			rootMargin: "0px",
			threshold: 0.9
			};
   
			this.observer = new IntersectionObserver(
				this.handleObserver,
				options
			);

			this.observer.observe(this.loadingRef);
		}
     }).catch((error) => {alert("The Server isn't responding. Please try later.")})
    }}
   
	render() {
		if(this.state.isloading === false) {
				return null;
		}
		return (
		<div>
			<div class='containerMyPost'>
			{
				this.state.myPosts.map((post) => { 
						return post;
				})
			}
			</div>
				<div ref={loadingRef => (this.loadingRef = loadingRef)} class='newsfeedLoading'>
				</div>
			</div>
		);
	}
}

export default MyPosts;
