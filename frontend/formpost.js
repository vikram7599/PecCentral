// JavaScript source code
import React from "react";
import {Editor} from "@tinymce/tinymce-react/lib/cjs/main/ts";
import './formpost.css';
import Navbar from './navbar';
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
            arr.push("\n"+"Content is empty or having bunch of whitespaces. Please make content.")
        }
        if(arr.length > 0)
        {
            alert(arr +"\n" + "So, the data can't be stored unless you make changes again.");
            event.preventDefault();
        }
        else
        {
        /*alert('Name is: ' + this.state.username + '\n' + 'Type of the post: ' + this.state.type + '\n' +
              'Category of the post: '+ this.state.category + '\n' +
              'Url: ' + this.state.url + '\n' + 
              'Content of the post: ' + this.state.message) ;*/
        event.preventDefault();
        fetch('http://127.0.0.1:5000/formpostbackend',
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

	render()
	{
    return(
    <div class="formpostbackground-image">
    <Navbar/>
    <div >
    <form class="formpost" onSubmit={this.handleSubmit}>
    <label for="username" style={{fontWeight:"bold",fontFamily:"Times New Roman",color:"white",fontSize:"20px"}}>Username</label>
    <input type="text" 
           id ="username"
           name="username" 
           placeholder="Your username.."
           value={this.state.username}
           onChange={this.handleChange}
     />
     
    <label for="type" style={{fontWeight:"bold",fontFamily:"Times New Roman",color:"white",fontSize:"20px"}}>Type of the post</label>
    <select id="type" name="type" value={this.state.type} onChange={this.type}>
      <option value="project">Project Idea/Demo/Resource</option>
      <option value="blogging">Blogging</option>
      <option value="blogging">Learning</option>
      <option value="Others">Others</option>
    </select>

    <label for="category" style={{fontWeight:"bold",fontFamily:"Times New Roman",color:"white",fontSize:"20px"}} >Category under which your post falling</label>
    <select id="category" name="category" value={this.state.category} onChange={this.handleChange}>
      <option value="web development">Web Development</option>
      <option value="AI,ML&Data Science">AI,ML&Data Science</option>
      <option value="Software Engg.">Software Engg.</option>
      <option value="Cyber Security">Cyber Security</option>
      <option value="IoT">IoT</option>
      <option value="Miscellaneous">Miscellaneous</option>
    </select>

    <label for="url" style={{fontWeight:"bold",fontFamily:"Times New Roman",color:"white",fontSize:"20px"}}>Url of resource</label>
    <br/>
    <input type="url" 
           id="url"
           name="url" 
           placeholder="Ex - link like http://www.google.com etc..."
           value={this.state.url}
           onChange={this.handleChange}
     />
    <label for="message" style={{fontWeight:"bold",fontFamily:"Times New Roman",color:"white",fontSize:"20px"}}>Content of the post</label>
    <p></p>
    <Editor id="message" name="message" placeholder="Write something.."
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

    <button class="button1" type="submit">Post</button>
  </form>
		</div>
        </div>
		)
	}
}

export default Formpost;