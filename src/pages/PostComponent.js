import React from 'react';
import axios from 'axios';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import '../styles/PostCompon.css';
import HeaderComponent from '../components/HeaderComponent';
import { withRouter } from 'react-router-dom'

class PostComponent extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            Tag : '',
            Thought : '',
            existlist : []
        }
    }

    componentWillMount(){
        if(this.props.match.params.tag != ' '){
            this.setState({Tag:this.props.match.params.tag});
        }
        if(this.props.loginStatus == "null"){
            this.props.history.push("/login");
        }
    }
    updateTag(newname){
        this.setState({Tag:newname});
    }
    updateThought(newname){
        this.setState({Thought:newname});
    }
    postThought = () =>
    {
        var now = new Date().getTime();
        var time = new Date(now) 
            .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
        axios.post(
            'https://backendtrends.herokuapp.com/exercises/add',
            {   tag: this.state.Tag,
                thought: this.state.Thought,
                username: this.props.loginStatus,
                time: time
            }, 
            { headers: { 'Content-Type': 'application/json' } }
          )
          .then(res => alert("Posted Redirected to Trending :)"))
          .then(res => this.props.history.push("/"))
          .catch(err => alert("Try again may be an error!"));
    }
    render()
    {
        return(
            <div>
                <div>
                    <div  className="field-Container">                   
                        <InputComponent type="text" name="tag" placeholder="Tag" className="middle" value={this.state.Tag} onChange={(event) => this.updateTag(event.target.value)}/>
                        <textarea className="middle" id="thought" placeholder="Write Something!" value={this.state.Thought} onChange={(event) => this.updateThought(event.target.value)}></textarea> 
                        <ButtonComponent type="button" value="Post" id="write" onClick={this.postThought}/>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(PostComponent);