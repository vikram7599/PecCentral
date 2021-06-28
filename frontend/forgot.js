// JavaScript source code
// JavaScript source code
import React from 'react';
import './forgot.css';
import './App.css';
import Navbar from './navbar';
class Forgot extends React.Component
{
	constructor(props)
	{
		super(props);
        this.state = { username:'', email:''};
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
        
        
        /*alert('Name is: ' + this.state.username + '\n' + 'Type of the post: ' + this.state.type + '\n' +
              'Category of the post: '+ this.state.category + '\n' +
              'Url: ' + this.state.url + '\n' + 
              'Content of the post: ' + this.state.message) ;*/
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
        alert("The email has been sent successfully.");}
      }).catch((error) => {alert("Server isn't responding. Please try later.'")})
       
       
    }

	render()
	{
		return(
		    <div >
            <Navbar/>
            <div>
			<form class="formlogin" onSubmit={this.handleSubmit}>
            <h1 style={{marginLeft:"100px"}}>Forgot Password</h1>
            <label for="username" style={{fontWeight:"bold",fontFamily:"Times New Roman",color:"black",fontSize:"20px"}}>Username</label>
            <input class="forgot" type="text"  
             id ="username" 
             name="username"
             required
             placeholder="Your username.."
             value={this.state.username}
             onChange={this.handleChange}
     />
            <label for="email" style={{fontWeight:"bold",fontFamily:"Times New Roman",color:"black",fontSize:"20px"}}>Enter Your Email ID</label>
            <input class="forgot" type="email" 
             id ="email" 
             name="email"
             required
             placeholder="Your Email-ID ..."
             value={this.state.email}
             onChange={this.handleChange}
     />
      
            <button type="submit">Submit</button>
            </form>   
	        </div>
            </div>
		)
	}
}

export default Forgot;
