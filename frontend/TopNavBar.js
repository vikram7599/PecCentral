import React from 'react';
import Navbar from 'reactjs-navbar';
import 'reactjs-navbar/dist/index.css';
import Logo from './resource/logo.png';
import './App.css';
import {
  faSignInAlt,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";
 

class TopNavBar extends React.Component {
	
	render() {
		return( 
			<Navbar
				logo={Logo}
				helpCallback={() => {
					alert("I need help...");
				}}
				menuItems={[
				{
					title: "Sign Up",
					icon: faUserPlus,
					isAuth: true,
					onClick: () => {
						alert("Its coffee time...");
					},
				},
				{
					title: "Sign In",
					icon: faSignInAlt,
					isAuth: true,
					onClick: () => {
						alert("Its coffee time...");
					},
				}
				]}
			/>
		);
	}
}

export default TopNavBar;