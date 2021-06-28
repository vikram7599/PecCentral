import React from 'react';
import Navbar from './Navbar';
import { Redirect } from 'react-router-dom';

class Forgot extends React.Component
{
	constructor(props)
	{
		super(props);
        this.state = { username:'', email:'', redirect: false};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	}

    handleChange(event) 
    {
    const value = event.target.value;
    this.setState({ ...this.state,
    [event.target.name]: value
    });
    }

    handleSubmit(event)
    {
        event.preventDefault();
        fetch('http://127.0.0.1:5000/forgotpassword',
        {
        method: 'POST',
        headers: {
                 'Accept': 'application/json',
                 "Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json'
                 },
        body: JSON.stringify({
        'username': this.state.username,
        'email':this.state.email
        })
        }).then(response  => {
        if(!response.ok) throw new Error(response.status);
        else return response.json()
        }).then(json => {
        console.log(json.status);
        var status_code = json.status;
        if(status_code == 1){
        alert("The email has been sent successfully.");
		this.setState({ ...this.state,
			redirect: true
		});
		}
      }).catch((error) => {alert("Server isn't responding. Please try later.'")})
       
       
    }

	render()
	{
		if(this.state.redirect) {
			return <Redirect to="/Login" />;
		}
		return(
			<div class='container-login'>
            <Navbar loggedIn={false} />
            <div class='container-form'>
			<form class="formlogin" onSubmit={this.handleSubmit}>
            <h1 style={{textAlign: 'center'}}>Forgot Password</h1>
            <label for="username" style={{fontSize:"20px"}}>Username</label>
            <input class="login" type="text"  
             id ="username" 
             name="username"
             required
             placeholder="Your username.."
             value={this.state.username}
             onChange={this.handleChange}
			/>
            <label for="email" style={{fontSize:"20px"}}>Enter Your Email ID</label>
            <input class="login" type="email" 
             id ="email" 
             name="email"
             required
             placeholder="Your Email-ID ..."
             value={this.state.email}
             onChange={this.handleChange}
     />
      
            <button class='loginButton' type="submit">Submit</button>
            </form>   
	        </div>
            </div>
		)
	}
}

export default Forgot;