// JavaScript source code
import React from 'react';
import './resetpassword.css';
import './App.css';
import Navbar from './navbar';
class ResetPassword extends React.Component
{
	constructor(props)
	{
		super(props);
        this.state = { username:'', oldpassword :'' , newpassword:'' , confirmpassword:''};
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
        /*alert('Name is: ' + this.state.username + '\n' + 'Type of the post: ' + this.state.type + '\n' +
              'Category of the post: '+ this.state.category + '\n' +
              'Url: ' + this.state.url + '\n' + 
              'Content of the post: ' + this.state.message) ;*/
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
        } 
      }).catch((error) => {alert("Server isn't responding. Please try later.'")})
       
       }
    }

	render()
	{
		return(
		    <div id="resetbackground-image">
            <Navbar/>
            <div>
			<form class="formlogin" onSubmit={this.handleSubmit}>
            <h1 style={{marginLeft:"100px"}}>Reset Password</h1>
            <label for="username" style={{fontWeight:"bold",fontFamily:"Times New Roman",color:"black",fontSize:"20px"}}>Username</label>
            <input type="text" class="reset"
             id ="username"
             name="username" 
             required
             placeholder="Your username.."
             value={this.state.username}
             onChange={this.handleChange}
     />
            <label for="oldpassword" style={{fontWeight:"bold",fontFamily:"Times New Roman",color:"black",fontSize:"20px"}}>Enter Old Password</label>
            <input type="password" class="reset"
             id ="oldpassword"
             name="oldpassword" 
             required
             placeholder="Your Old Password ..."
             value={this.state.oldpassword}
             onChange={this.handleChange}
     />
	        <label for="newpassword" style={{fontWeight:"bold",fontFamily:"Times New Roman",color:"black",fontSize:"20px"}}>Enter your New Password</label>
            <input type="password"  class="reset"
             id ="newpassword"
             name="newpassword" 
             required
             placeholder="Enter your new password."
             value={this.state.newpassword}
             onChange={this.handleChange}
      />
            <label for="confirmpassword" style={{fontWeight:"bold",fontFamily:"Times New Roman",color:"black",fontSize:"20px"}}>Confirm your New Password</label>
            <input type="password" class="reset"
            id ="confirmpassword"
             name="confirmpassword" 
             required
             placeholder="Confirm your new password."
             value={this.state.confirmpassword}
             onChange={this.handleChange}
      />
      
            <button type="submit">Submit</button>
            </form>   
	        </div>
            </div>
		)
	}
}

export default ResetPassword;