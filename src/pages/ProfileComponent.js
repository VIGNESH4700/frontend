import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import '../styles/ProfileCompon.css';
import HeaderComponent from '../components/HeaderComponent';

class ProfileComponent extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            details : [],
            email : '',
            username : '',
            about : '',
            password : ''
        }
    }
    componentDidMount()
    {
        axios.get('https://backendtrends.herokuapp.com/details/')
        .then(response => {
            this.setState({details:response.data})
            for(let detail of this.state.details)
            {
                if(detail.username == this.props.match.params.username)
                {
                    this.setState({email: detail.email, username: detail.username, about: detail.about})
                }
            }
        })       
    }

    render()
    {
        return(
            <div>
                <HeaderComponent></HeaderComponent>
                <div class="card">
                    <div>
                        <img src="data:image/png;base64,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"
                        alt="John" id="pro-photo"/>
                    </div>
                    <p className="pro-label">Username</p>
                    <h1 id="pro-name">{this.state.username}</h1>
                    <p className="pro-label">Email</p>
                    <h1 id="pro-email">{this.state.email}</h1>
                    <p className="pro-label">About</p>
                    <p id="pro-about">{this.state.about}</p>
                    <button id="pro-edit">Edit</button>
                </div>
            </div>
        )
    }
}

export default withRouter(ProfileComponent);