import React from 'react';
import axios from 'axios';
import  '../styles/ProfileThoughts.css';
export default class ProfileThoughts extends React.Component
{
    constructor()
    {
        super();
    }
    modifyThoughts(){
        let decision = window.confirm("You want to remove this thought!");
        if(decision){
            axios.delete('https://backendtrends.herokuapp.com/exercises/remove/'+this.props.Tags._id)
            .then(response => {
                alert(response.data);
            })
            .then(response => {window.location.reload()})
        }
    }
    render()
    {
        return(
            <div className = "personal-Container">
                <div className = "personalContainer">
                <div className = "personaldetails">
                    <h3 id="personalowner">{this.props.Tags.username}<button id="removethought" onClick = {() => this.modifyThoughts()}>remove</button></h3>
                    <h5 id="personal-thought">{(this.props.Tags.createdAt).substring(0,10)}</h5>
                    <h4 id="personal-time">{this.props.Tags.time}</h4>
                </div>
                <h4 id="personalthoughts">{this.props.Tags.thought}</h4>
                </div>
            </div>
        )
    }
}