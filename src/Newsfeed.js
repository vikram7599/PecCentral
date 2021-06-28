import React from 'react';
import PostBox from './PostBox.js';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './Newsfeed.css';

class Newsfeed extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			pageStatus: 0,
			prevY: 0,
			loadingMssg: ' Loading... ',
		};
		this.fetchPosts = this.fetchPosts.bind(this);
		this.handleObserver = this.handleObserver.bind(this);
	}
	
	handleObserver(entities, observer) {
		const y = entities[0].boundingClientRect.y;
		if (this.state.prevY > y ) {
			this.fetchPosts();
		}
		this.setState({ prevY: y });
	}
	
	fetchPosts() {
		fetch('http://127.0.0.1:5003/newsfeedbackend',
		{
			method: 'POST',
			headers: {
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
                },
			body: JSON.stringify({
			'pageStatus': this.state.pageStatus
			})
        }
		).then(response  => {
        if(!response.ok) throw new Error(response.status);
        else return response.json()
        }).then(res => {
		
		
        if(res.status === '1')
        {
          this.setState({loadingMssg: ' You have Seen all posts so far :) '});
        }
		
		if(res.data.length > 0) {
			let newPosts = [];
			for(let i=0;i<res.data.length;i++) {
				newPosts.push(<PostBox key={res.data[i][1]} username= {res.data[i][0]} createdAt= {res.data[i][5]} description={res.data[i][6]} resourceUrl= {res.data[i][4]} postId= {res.data[i][1]}	postType= {res.data[i][2]} postCategory= {res.data[i][3]} />);
			}
			this.setState({ posts: [...this.state.posts, ...newPosts] });
			this.setState({ pageStatus: this.state.pageStatus+newPosts.length });
		}
		
      }).catch((error) => {alert("Server isn't responding. Please try later.")});
	}
	
	componentDidMount() {
		document.body.className = 'body-Newsfeed';
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
	
	render() {
		return (
		<div class='container-Newsfeed'>
		<Navbar loggedIn={true} />
		<Sidebar setPostType={this.setPostType} setPostCategory={this.setPostCategory}/>
		<div class='containerPost'>
		{
			this.state.posts.map((post) => {
				return post;
			})
		}
		<div ref={loadingRef => (this.loadingRef = loadingRef)} class='newsfeedLoading'>
			<span class='newsfeedLoadingText'>{this.state.loadingMssg}</span>
		</div>
	  
		</div>
		</div>
		);
	}
}

export default Newsfeed;