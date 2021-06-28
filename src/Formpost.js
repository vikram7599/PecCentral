import React from "react";
import {Editor} from "@tinymce/tinymce-react/lib/cjs/main/ts";
import './Formpost.css';
import Navbar from './Navbar.js';

class Formpost extends React.Component
{
    constructor(props)
    {
		super(props);
		this.state = { username: '' , type:'Project Idea/Demo/Resource' , category:'Web Development' , url:'' , message:'' ,loading:false };
		this.handleChange = this.handleChange.bind(this);
		this.handleEditorChange = this.handleEditorChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) 
    {
		const value = event.target.value;
		this.setState({ ...this.state,
		[event.target.name]: value
		});
    }

    handleEditorChange(message, editor)
    {
        this.setState({...this.state, message})
    }

    handleSubmit(event)
    {
        var arr =[];
        if(this.state.username.length === 0 || this.state.username.replace(/\s/g,"") === "")
        {
            arr.push("username is empty or having bunch of whitespaces. Please specify proper name.");
        }
        if(this.state.message.length === 0 || this.state.message.replace(/\s/g,"") === "")
        {
            arr.push("\n Content is empty or having bunch of whitespaces. Please make content.")
        }
        if(arr.length > 0)
        {
            alert(arr +"\n So, the data can't be stored unless you make changes again.");
            event.preventDefault();
        }
        else
        {
			event.preventDefault();
		fetch('http://127.0.0.1:5002/formpostbackend',
		{
        method: 'POST',
        headers: {
                 'Accept': 'application/json',
                 "Access-Control-Allow-Origin": "*",
                 'Content-Type': 'application/json'
                 },
        body: JSON.stringify({
        'username': this.state.username,
        'type':this.state.type,
        'category':this.state.category,
        'url':this.state.url,
        'message':this.state.message
        })
        }).then(response  => {
        if(!response.ok) throw new Error(response.status);
        else return response.json()
        }).then(json => {
        console.log(json.status);
        var status_code = json.status;
        if(status_code === 1)
        {
          alert("Username credential doesn't match. Please verify your username.'");
          event.preventDefault();
        }
        else if(status_code === 2)
        {
          alert("Your post has been stored successfully.");
          window.location.reload(false);
        }        
      }).catch((error) => {alert("Server isn't responding. Please try later.'")})
       
       }
       
    }

	componentDidMount() {
		document.body.className = 'body-formpost';
	}
	
	render()
	{
    return(
    <div class='container-Formpost'>
	
    <Navbar loggedIn={true}/>
    <form class="formpost" onSubmit={this.handleSubmit}>
    <label for="username" style={{fontFamily:"Times New Roman",color:"white",fontSize:"20px"}}>Username</label>
    <input class='formpost-text' type="text" 
           id ="formpost-username"
           name="username" 
           placeholder="Your username.."
           value={this.state.username}
           onChange={this.handleChange}
     />
     
    <label for="type" style={{fontFamily:"Times New Roman",color:"white",fontSize:"20px"}}>Type of the post</label>
    <select class='formpost-text' id="formpost-type" name="type" value={this.state.type} onChange={this.handleChange}>
      <option value="project">Project Idea/Demo/Resource</option>
      <option value="blogging">Blogging</option>
      <option value="blogging">Learning</option>
      <option value="Others">Others</option>
    </select>

    <label for="category" style={{fontFamily:"Times New Roman",color:"white",fontSize:"20px"}} >Category under which your post falling</label>
    <select class='formpost-text' id="formpost-category" name="category" value={this.state.category} onChange={this.handleChange}>
      <option value="web development">Web Development</option>
      <option value="AI,ML&Data Science">AI,ML&Data Science</option>
      <option value="Cyber Security">Cyber Security</option>
      <option value="IoT">IoT</option>
      <option value="Miscellaneous">Miscellaneous</option>
    </select>

    <label for="url" style={{fontFamily:"Times New Roman",color:"white",fontSize:"20px"}}>Url of resource  <p style={{color: 'white', fontSize: '12px', display:'inline-block'}}>( To upload an image associated with post, visit<a href='https://postimages.org/' style={{textDecoration: 'none'}}> this</a>, upload your image, and mention direct link here.)</p> </label>
    <br/>
    <input class = 'formpost-url' 
			type="url" 
           id="formpost-url"
           name="url" 
           placeholder="Ex - link like http://www.google.com etc..."
           value={this.state.url}
           onChange={this.handleChange}
     />
	 
    <label for="message" style={{fontFamily:"Times New Roman",color:"white",fontSize:"20px"}}>Content of the post</label>
    <p></p>
    <Editor id="formpost-message" name="message" placeholder="Write something.."
    apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
    value={this.state.message}
    outputFormat='text'
    init={{
      height: 200,
      marginTop:6,
      menubar: true,
      statusbar: false,
      toolbar_mode: "sliding",
      plugins: [
                'advlist autolink lists link preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime table paste code help wordcount'
                ],
      toolbar: 'undo redo | image anchor media | \
                alignleft aligncenter alignright alignjustify | \
                outdent indent | bulllist numlist | fullscreen preview | emoticons help',
      contextmenu: "bold italic underline indent outdent help"
    }}
    onEditorChange={this.handleEditorChange}
    />

    <button class="button1" type="submit"><i class="fa fa-fw fa-upload"></i> Post</button>
  </form>
		</div>
		)
	}
}

export default Formpost;