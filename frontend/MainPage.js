import React from 'react';
import './MainPage.css';
import Navbar from './Navbar';
import Typewriter from 'typewriter-effect';
import bg1 from './resource/background4.gif';
import bg2 from './resource/background5.gif';
import bg3 from './resource/background6.gif';
import bg4 from './resource/background7.gif';
import bg5 from './resource/background8.gif';
import bg6 from './resource/background9.gif';
import bg7 from './resource/background1.jpg';

class MainPage extends React.Component {
	componentDidMount() {
		document.body.className = 'body-MainPage';
	}
	render() {
		
		const message = "Welcome to PEC Central Web App. Here in you will find a lot of intersting, meaningful, knowledgable and exciting content that you can leverage in learning new concepts and technologies.                         HAPPY LEARNING !!";
		return (
					<div class='container1' >
					<Navbar loggedIn={false} />
					<div class='container2'>
  <div class="hexagon hexagon1"><div class="hexagon-in"><div class="hexagon-in1" style={{ backgroundImage: "url(" + bg1 + ")" }}></div></div></div>
  <div class="hexagon hexagon2"><div class="hexagon-in"><div class="hexagon-in1" style={{ backgroundImage: "url(" + bg2 + ")" }}></div></div></div>
  <div class="hexagon hexagon3"><div class="hexagon-in"><div class="hexagon-in1" style={{ backgroundImage: "url(" + bg3 + ")" }}></div></div></div>
  <div class="hexagon hexagon4"><div class="hexagon-in"><div class="hexagon-in1" style={{ backgroundImage: "url(" + bg4 + ")" }}></div></div></div>
  <div class="hexagon hexagon5"><div class="hexagon-in"><div class="hexagon-in1" style={{ backgroundImage: "url(" + bg5 + ")" }}></div></div></div>
  <div class="hexagon hexagon6"><div class="hexagon-in"><div class="hexagon-in1" style={{ backgroundImage: "url(" + bg6 + ")" }}></div></div></div>
  <div class='container1'>
	<div class="hexagon hexagonWithText"><div class="hexagon-in"><div class="hexagon-in1" style={{ backgroundImage: "url(" + bg7 + ")" }}></div></div></div>
					<div class="paraline">
					<Typewriter
						options={{
							strings: [message],
							autoStart: true,
							delay: 50,
							loop: true,
							deleteSpeed: 9999999999,
							
						}} />
					</div>
					</div>
					</div>
					</div>
		);
	}
}

export default MainPage;
