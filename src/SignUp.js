import React, { Component } from 'react';
import './SignUp.css';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar.js';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({formErrors, ...rest}) =>{
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid =false);
  });

  Object.values(rest).forEach(val => {
    val === null && (valid = false)
  });

  return valid;
}

class SignUp extends Component{


  constructor(props){
    super (props);

    this.state = {
      name : null,
      email: null,
      password : null,
	  username : null,
	  branch: null,
	  mobileNumber: null,
	  confirmPassword: null,
	  redirect: false,
      formErrors : {
        name: "",
        email : "",
        password : "",
		username : "",
		mobileNumber: "",
		confirmPassword: "",
		branch: ""
      }
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if(formValid(this.state)){
        fetch('http://127.0.0.1:5001/signup',
        {
        method: 'POST',
        headers: {
                 'Accept': 'application/json',
                 "Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json'
                 },
        body: JSON.stringify({
        'username': this.state.username,
        'password':this.state.password,
		'name': this.state.name,
		'email_id': this.state.email,
		'branch': this.state.branch,
		'mobile_number': this.state.mobileNumber
        })
        }).then(response  => {
        if(!response.ok) throw new Error(response.status);
        else return response.json()
        }).then(json => {
        console.log(json.status);
        var status_code = json.status;
        if(status_code === 0)
        {
            alert("Username and Password already Exists.")
        }
        else if(status_code === 1)
        {
			alert("Username Already exists.");
        }
		else if(status_code === 2) {
			alert("Its Recommended to change the password.");
		}
		else {
			this.setState({
			redirect: true
		});
		}
      }).catch((error) => {alert("Server isn't responding. Please try later.")})
       
    }
    else{
      console.error('Form Invalid');
    }
  }

  handleChange = (e) =>{
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case 'name':
        formErrors.name = 
        value.length < 3 
        ? 'Minimum 3 characters are required !' 
        : "";
        break;

        case 'email':
          formErrors.email = 
          emailRegex.test(value) 
          ? ""
          : "Invalid Email Exp";
          break;

        case 'password':
          formErrors.password = 
          value.length < 3 
          ? 'Minimum 3 characters are required !' 
          : "";
          break;
        
		case 'confirmPassword': 
		  formErrors.confirmPassword = 
          this.state.password !== value 
          ? 'Passwords do not match !' 
          : "";
          break;
		  
		case 'mobileNumber':
		  formErrors.mobileNumber = 
          value.length !== 10 
          ? 'Invalid Mobile Number !' 
          : "";
          break;
		
		case 'branch':
		  formErrors.branch = 
          value.length < 2 
          ? 'Minimum 2 characters are required !' 
          : "";
          break;
		
        default:
          break;
    }


    this.setState({formErrors, [name]: value }, () => console.log(this.state));

  }

  
  componentDidMount() {
	document.body.className = 'body-signUp';
  }
  
  render(){

    const {formErrors} = this.state;

		if(this.state.redirect) {
			return <Redirect to="/Newsfeed" />;
		}
		
    return (
	<div class='container-SignUp'>
            <Navbar loggedIn={false} />
			
	<div className = "wrapper">
      <div className = "form-wrapper">
        <h1>Create Account</h1>
        <form class= 'form-signUp' onSubmit= {this.handleSubmit} noValidate>
		
          <div className="nameInput">
            <label htmlFor="nameInput">Name</label>
            <input   
            className = {formErrors.name.length > 0 ? "error": null} 
            placeholder="Name" 
            type="text"
            name = "name"
            noValidate 
            onChange = {this.handleChange}  
            />
            {formErrors.name.length > 0 && (
            <span className ="errorMessage">{formErrors.name}</span>
          )}
          </div>
		
		<div className="username">
            <label htmlFor="username">Username</label>
            <input   
            className = {formErrors.username.length > 0 ? "error": null} 
            placeholder="Username" 
            type="text"
            name = "username"
            noValidate 
            onChange = {this.handleChange}  
            />
            {formErrors.username.length > 0 && (
            <span className ="errorMessage">{formErrors.username}</span>
          )}
          </div>
		  
		  
          <div className="email">
            <label htmlFor="email">Email</label>
            <input 
            className = {formErrors.email.length > 0 ? "error": null} 
            placeholder="Email Id" 
            type="email"
            name = "email"
            noValidate 
            onChange = {this.handleChange}  
            />

          {formErrors.email.length > 0 && (
            <span className ="errorMessage">{formErrors.email}</span>
          )}
          </div>
          

          <div className="password">
            <label htmlFor="password">Password</label>
            <input 
            className = {formErrors.password.length > 0 ? "error": null} 
            placeholder="Password" 
            type="password"
            name = "password"
            noValidate 
            onChange = {this.handleChange}  
            />
          {formErrors.password.length > 0 && (
            <span className ="errorMessage">{formErrors.password}</span>
          )}
          </div>
          
		  <div className="confirmPassword">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input   
            className = {formErrors.confirmPassword.length > 0 ? "error": null} 
            placeholder="Confirm Password" 
            type="password"
            name = "confirmPassword"
            noValidate 
            onChange = {this.handleChange}  
            />
            {formErrors.confirmPassword.length > 0 && (
            <span className ="errorMessage">{formErrors.confirmPassword}</span>
          )}
          </div>
		  
		  <div className="branch">
            <label htmlFor="branch">Branch</label>
            <input  
			className = {formErrors.branch.length > 0 ? "error": null}  
            placeholder="Branch eg: Computer Science, Electronics etc" 
            type="text"
            name = "branch"
            noValidate 
            onChange = {this.handleChange}  
            />
			{formErrors.branch.length > 0 && (
            <span className ="errorMessage">{formErrors.branch}</span>
          )}
          </div>
		  

		  <div className="mobileNumber">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input   
            className = {formErrors.mobileNumber.length > 0 ? "error": null} 
            placeholder="Mobile Number" 
            type="number"
            name = "mobileNumber"
            noValidate 
            onChange = {this.handleChange}  
            />
            {formErrors.mobileNumber.length > 0 && (
            <span className ="errorMessage">{formErrors.mobileNumber}</span>
          )}
          </div>
		  
		  
          <div className = "createAccount">
            <button type = "submit">Create Account</button>
            <Link to="/Login" style={{textDecoration: 'none'}}><small>Already have an account?</small></Link>
          </div>

        </form>

      </div>
    </div>
	</div>);
  }


}

export default SignUp;
