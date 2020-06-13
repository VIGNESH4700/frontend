import React from 'react';
import  '../styles/TrendpageComponent.css';
import { withRouter } from 'react-router-dom'
class TrendpageComponent extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            tag: ' '
        }
    }
    render()
    {
        return(
            <div>
                <div className = "TrendPageMain">
                    <h2 onClick={() => this.props.navigation.push("/current/"+this.props.match.params.username+"/"+this.props.Tags._id)} id="tweets">{this.props.count}. {this.props.Tags._id}</h2>
                    <h6 id = "thoughts-count">{this.props.Tags.count} tweets</h6>
                </div>
            </div>
        )
    }
}
export default withRouter(TrendpageComponent);