import React from 'react';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router';
import './Login.css';
import Navbar from './Navbar.js';

class Login extends React.Component
{
    constructor(props)
	{
		super(props);
        this.state = { username :'' , password:'', redirect: false}
        this.currentPathname = null;
        this.currentSearch = null;
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

    componentDidMount() {
    /*const { history } = this.props;
    history.listen((newLocation, action) => {
      if (action === "PUSH") {
        if (
          newLocation.pathname !== this.currentPathname ||
          newLocation.search !== this.currentSearch
        ) {
          this.currentPathname = newLocation.pathname;
          this.currentSearch = newLocation.search;
          history.push({
            pathname: newLocation.pathname,
            search: newLocation.search
          });
        }
      } else {
        history.go(1);
      }
    });
	*/
	document.body.className = 'body-login';
  }

    handleSubmit(event)
    {
        var arr =[];
        if(this.state.username.length === 0 || this.state.username.replace(/\s/g,"") === "")
        {
            arr.push("username is empty or having bunch of whitespaces. Please specify proper name.");
        }
        if(this.state.password.length === 0 || this.state.password.replace(/\s/g,"") === "")
        {
            arr.push("\n"+"Password is empty. Please make ensure the password field isn't empty.")
        }
        if(arr.length > 0)
        {
            alert(arr +"\n" + "So, you can't be logged in...");
            event.preventDefault();
        }
        else
        {
        event.preventDefault();
        fetch('http://127.0.0.1:5000/login',
        {
        method: 'POST',
        headers: {
                 'Accept': 'application/json',
                 "Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json'
                 },
        body: JSON.stringify({
        'username': this.state.username,
        'password':this.state.password
        })
        }).then(response  => {
        if(!response.ok) throw new Error(response.status);
        else return response.json()
        }).then(json => {
        console.log(json.status);
        var status_code = json.status;
        if(status_code === 0)
        {
            alert("The combination of username and password doesn't match.")
            event.preventDefault();
        }
        else if(status_code === 1)
        {
			this.setState({
			redirect: true
			});
        }
      }).catch((error) => {alert("Server isn't responding. Please try later.")})
       
       }
       
    }

	render()
	{
		
		if(this.state.redirect) {
			return <Redirect to="/Newsfeed" />;
		}
		
        return(
            
            <div class='container-login'>
            <Navbar loggedIn={false} />
            <div class='container-form'>
			<form class="formlogin" onSubmit={this.handleSubmit}>
            <h1 style={{textAlign: "center"}}>Login</h1>
            <label for="username" style={{fontSize:"20px"}}>Username</label>
            <input type="text" class="login"
             id ="username"
             name="username" 
             placeholder="Your username.."
             value={this.state.username}
             onChange={this.handleChange}
     />
	        <label for="password" style={{fontSize:"20px"}}>Password</label>
            <input type="password" class ="login" 
             id ="password"
             name="password" 
             placeholder="Enter your password"
             value={this.state.password}
             onChange={this.handleChange}
      />
      
            <Link to="/Reset" style={{ textDecoration: 'none'}}>Reset Password </Link>
            <Link to="/Forgot" style={{ marginLeft: 150 , textDecoration: 'none'}}>Forgot Password?</Link>
            <button class='loginButton' type="submit">Submit</button>
            </form> 
            </div>            
	        </div>
            
		)
        
	}

}

export default Login;