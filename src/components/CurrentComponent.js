import React from 'react';
import  '../styles/CurrentCompon.css';
export default class CurrentComponent extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            tag: ''
        }
    }

    render()
    {
        return(
            <div className = "Main-Container">
                <div className = "indiv-Container">
                <div className = "thoughtdetails">
                    <h3 id="thoughtowner">{this.props.Tags.username}</h3>
                    <h5 id="date-thought">{(this.props.Tags.createdAt).substring(0,10)}</h5>
                    <h4 id="time-thought">{this.props.Tags.time}</h4>
                </div>
                <h4 id="thoughts">{this.props.Tags.thought}</h4>
                </div>
            </div>
        )
    }
}