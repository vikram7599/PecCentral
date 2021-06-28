import React from 'react';
import './Sidebar.css';
import bg1 from './resource/project.gif';
import bg2 from './resource/blog.gif';
import bg3 from './resource/learning.gif';
import bg4 from './resource/background11.jpg';
import bg5 from './resource/webdev.gif';
import bg6 from './resource/ai.gif';
import bg7 from './resource/iot.gif';
import bg8 from './resource/others.gif';
import bg9 from './resource/background4.gif';


class Sidebar extends React.Component
{
	constructor(props)
	{
	    super(props);
		this.state= {
			postType: '',
			postCategory: ''
		};
		this.setPostCategory = this.setPostCategory.bind(this);
		this.setPostType = this.setPostType.bind(this);
		this.applyFilter = this.applyFilter.bind(this);
	}
	
	setPostType(value) {
		if(value === this.state.postType) {
			this.setState({postType: ''});
		}
		else {
			this.setState({postType: value});
		}
	}
	
	setPostCategory(value) {
		if(value === this.state.postCategory) {
			this.setState({postCategory: ''});
		}
		else {
			this.setState({postCategory: value});
		}
	}
	
	
	applyFilter() {	
		const posts = document.getElementsByClassName('post');
		const tandC = document.getElementsByClassName('postTypeAndCategory'); //tandC is short name for "type and category"
		for(var i=0;i<posts.length;i++) {
			const content = tandC[i].textContent.toLowerCase();
			const filter1 = this.state.postType===''?true:(content.indexOf(this.state.postType.toLowerCase()) > -1?true:false);
			const filter2 = this.state.postCategory===''?true:(content.indexOf(this.state.postCategory.toLowerCase()) > -1?true:false);
			console.log(filter1);
			console.log(filter2);
			if(filter1 && filter2) {
				posts[i].style.display = '';
			}
			else {
				posts[i].style.display = 'none';
			}
		}
		
	}
	
	render() {
		this.applyFilter();
		return(
		<div>
		<div class='sidenav' style={{left: 0}}>
		<div class='bookmark' onClick={()=> {this.setPostType('Project Idea/Demo/Resource')}}>
		<div class='bookmarkCont' ><img alt='' src={bg4} /> <div class='blur' ><p > Projects</p> </div></div>
		<div class="hexagon-comp component"><div class="hexagon-in-comp"><div class="hexagon-in1-comp" style={{ backgroundImage: "url(" + bg1 + ")"}}></div></div></div>
		</div>
		<div class='bookmark' onClick={()=> {this.setPostType('Learning')}}>
		<div class='bookmarkCont' ><img alt='' src={bg4} /> <div class='blur' ><p > Resources</p></div></div>
		<div class="hexagon-comp component"><div class="hexagon-in-comp"><div class="hexagon-in1-comp" style={{ backgroundImage: "url(" + bg3 + ")"}}></div></div></div>
		</div>
		<div class='bookmark' onClick={()=> {this.setPostType('Blogging')}}>
		<div class='bookmarkCont' ><img alt='' src={bg4} /> <div class='blur' ><p > Blogs</p> </div></div>
		<div class="hexagon-comp component"><div class="hexagon-in-comp"><div class="hexagon-in1-comp" style={{ backgroundImage: "url(" + bg2 + ")"}}></div></div></div>
		</div>
		
		<div class='bookmark' onClick={()=> {this.setPostType('Others')}}>
		<div class='bookmarkCont' ><img alt='' src={bg4} /> <div class='blur' ><p > Others</p> </div></div>
		<div class="hexagon-comp component"><div class="hexagon-in-comp"><div class="hexagon-in1-comp" style={{ backgroundImage: "url(" + bg9 + ")"}}></div></div></div>
		</div>
		</div>
		
		
		<div class='sidenav' style={{right: 0, transform: 'scaleX(-1)', paddingTop: '35px' }}>
		<div class='bookmark' onClick={()=> {this.setPostCategory('Web Development')}} style={{marginBottom: '-10px'}} >
		<div class='bookmarkCont' ><img alt='' src={bg4}  /> <div class='blur'  ><p style={{ transform: 'scaleX(-1)'}}> Web Dev</p> </div></div>
		<div style={{transform: 'scaleX(-1)', marginRight: '-100px'}}><div class="hexagon-comp component"  ><div class="hexagon-in-comp"><div class="hexagon-in1-comp" style={{ backgroundImage: "url(" + bg5 + ")", backgroundColor: 'white', backgroundSize: '80% 100%' }}></div></div></div>
		</div>
		</div>
		<div class='bookmark' onClick={()=> {this.setPostCategory('AI,ML&Data Science')}} style={{marginBottom: '-10px'}} >
		<div class='bookmarkCont' ><img alt='' src={bg4} /> <div class='blur' ><p style={{transform: 'scaleX(-1)' }}> AI/ML</p></div></div>
		<div style={{transform: 'scaleX(-1)', marginRight: '-100px'}}><div class="hexagon-comp component"><div class="hexagon-in-comp"><div class="hexagon-in1-comp" style={{ backgroundImage: "url(" + bg6 + ")", backgroundSize: '105% 100%'}}></div></div></div>
		</div>
		</div>
		<div class='bookmark' onClick={()=> {this.setPostCategory('IoT')}} style={{marginBottom: '-10px'}} >
		<div class='bookmarkCont' ><img alt='' src={bg4}  /> <div class='blur' ><p style={{transform: 'scaleX(-1)' }}> IOT</p> </div></div>
		<div style={{transform: 'scaleX(-1)', marginRight: '-100px'}}><div class="hexagon-comp component" ><div class="hexagon-in-comp"><div class="hexagon-in1-comp" style={{ backgroundImage: "url(" + bg7 + ")", backgroundSize: '100% 100%'}}></div></div></div>
		</div>
		</div>
		<div class='bookmark' onClick={()=> {this.setPostCategory('Cyber Security')}} style={{marginBottom: '-10px'}} >
		<div class='bookmarkCont' ><img alt='' src={bg4}  /> <div class='blur' ><p style={{transform: 'scaleX(-1)', marginLeft:'0px'}}>CyberSecurity</p> </div></div>
		<div style={{transform: 'scaleX(-1)', marginRight: '-100px'}}><div class="hexagon-comp component"><div class="hexagon-in-comp"><div class="hexagon-in1-comp" style={{ backgroundImage: "url(" + bg2 + ")"}}></div></div></div>
		</div>
		</div>
		<div class='bookmark' onClick={()=> {this.setPostCategory('Miscellaneous')}} style={{marginBottom: '-10px'}} >
		<div class='bookmarkCont' ><img alt='' src={bg4}  /> <div class='blur' ><p style={{transform: 'scaleX(-1)' }}> Others</p> </div></div>
		<div style={{transform: 'scaleX(-1)', marginRight: '-100px'}}><div class="hexagon-comp component"><div class="hexagon-in-comp"><div class="hexagon-in1-comp" style={{ backgroundImage: "url(" + bg8 + ")"}}></div></div></div>
		</div>
		</div>
		</div>
		
		</div>
		);
	}
}
export default Sidebar;