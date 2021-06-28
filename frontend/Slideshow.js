import React from 'react';
import './Slideshow.css';

class Slideshow extends React.Component {
	constructor(props) {
		super(props);
		this.plusSlides = this.plusSlides.bind(this);
		this.showSlides= this.showSlides.bind(this);
		this.generateContent = this.generateContent.bind(this);
		this.state = {
			slideIndex: 1
		};
	}
	
	plusSlides(n) {
		let num = this.state.slideIndex+n;
		const id = `${this.props.postId}image`;
		let slideShow = document.getElementById(id);
		const slides=slideShow.getElementsByClassName('mySlides');
		if(num>slides.length) { num=1; }
		if(num<1) { num=slides.length }
		this.setState({slideIndex: num});
	}

	showSlides(n) {
		var i;
		const id = `${this.props.postId}image`;
		let slideShow = document.getElementById(id);
		const slides=slideShow.getElementsByClassName('mySlides');
		for (i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}
		slides[this.state.slideIndex-1].style.display = "block";
	}

	generateContent() {
		let index=0;
		const num=this.props.urls.length;
		return(
		this.props.urls.map(url => {
			index=index+1;
			const key = `${this.props.postId}image${index}`;
			return (
				<div key={key} class="mySlides fade">
				<div class="numbertext">{index} / {num}</div>
				{url.includes("mp4?alt=media&token=")? <video controls class='mainImage' src={url} type="video/mp4" /> : <img src={url} class='mainImage'/>}
				</div>
			);
		})
		);
	}
	
	componentDidUpdate() {
		this.showSlides(this.state.slideIndex);
	}
	
	componentDidMount() {
		this.showSlides(this.state.slideIndex);
	}
	
	render() {
		const id = `${this.props.postId}image`;
		return(
		<div id={id} class='slideshow-container'>
		{this.generateContent()}
			<a class="prev" onClick={()=> {this.plusSlides(-1)}}><i class='fa fa-fw fa-chevron-left' ></i></a>
			<a class="next" onClick={()=> {this.plusSlides(1)}}><i class='fa fa-fw fa-chevron-right' ></i></a>
		</div>
		);
	}
}

export default Slideshow;