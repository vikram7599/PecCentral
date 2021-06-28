import React from 'react';
import Navbar from './Navbar';
import { Redirect } from 'react-router-dom';

class ResetPassword extends React.Component
{
	constructor(props)
	{
		super(props);
        this.state = { username:'', oldpassword :'' , newpassword:'' , confirmpassword:'', redirect: false};
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
        
        if(this.state.newpassword !== this.state.confirmpassword)
        {
            alert("Confirm Password isn't matching with new password. PLease confirm your new password.");
            event.preventDefault();
        }
        else
        {
        event.preventDefault();
        fetch('http://127.0.0.1:5000/resetpassword',
        {
        method: 'POST',
        headers: {
                 'Accept': 'application/json',
                 "Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json'
                 },
        body: JSON.stringify({
        'username': this.state.username,
        'oldpassword':this.state.oldpassword,
        'newpassword':this.state.newpassword,
        'confirmpassword':this.state.confirmpassword
        })
        }).then(response  => {
        if(!response.ok) throw new Error(response.status);
        else return response.json()
        }).then(json => {
        console.log(json.status);
        var status_code = json.status;
        if(status_code === 0)
        {
            alert("The combination of username and password is incorrect and the new password is already in use.")
            event.preventDefault();
        }
        else if(status_code === 1)
        {
          alert("The combination of username and password is incorrect.");
          event.preventDefault();
        }
        else if(status_code === 2)
        {
          alert("The new password already exists.");
          event.preventDefault();
        }
        else if(status_code === 3)
        {
          alert("The password has been reset successfully.");
		  this.setState({ ...this.state,
			redirect: true
		});
        } 
      }).catch((error) => {alert("Server isn't responding. Please try later.'")})
       
       }
    }

	render()
	{
		if(this.state.redirect) {
			return <Redirect to="/Login" />;
		}
		return(
		    <div class='container-login'>
            <Navbar loggedIn={false} />
            <div class='container-form' style={{marginTop: '-50px'}}>
			<form class="formlogin" onSubmit={this.handleSubmit}>
            <h1 style={{textAlign: 'center'}}>Reset Password</h1>
            <label for="username" style={{fontSize:"20px"}}>Username</label>
            <input type="text" class="login"
             id ="username"
             name="username" 
             required
             placeholder="Your username.."
             value={this.state.username}
             onChange={this.handleChange}
     />
            <label for="oldpassword" style={{fontSize:"20px"}}>Enter Old Password</label>
            <input type="password" class="login"
             id ="oldpassword"
             name="oldpassword" 
             required
             placeholder="Your Old Password ..."
             value={this.state.oldpassword}
             onChange={this.handleChange}
     />
	        <label for="newpassword" style={{fontSize:"20px"}}>Enter your New Password</label>
            <input type="password"  class="login"
             id ="newpassword"
             name="newpassword" 
             required
             placeholder="Enter your new password."
             value={this.state.newpassword}
             onChange={this.handleChange}
      />
            <label for="confirmpassword" style={{fontSize:"20px"}}>Confirm your New Password</label>
            <input type="password" class="login"
            id ="confirmpassword"
             name="confirmpassword" 
             required
             placeholder="Confirm your new password."
             value={this.state.confirmpassword}
             onChange={this.handleChange}
      />
      
            <button class='loginButton' type="submit">Submit</button>
            </form>   
	        </div>
            </div>
		)
	}
}

export default ResetPassword;