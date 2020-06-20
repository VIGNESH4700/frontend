import React from 'react';
import axios from 'axios';
import CurrentCompon from '../components/CurrentComponent';
import HeaderComponent from '../components/HeaderComponent';
import '../styles/TrendCompon.css';
import { withRouter } from 'react-router-dom';

class CurrentComponent extends React.Component
{
    constructor()
    {
        super();
        this.state = {
                thoughts : [],
                isloading : '1'
        }
    }
    componentDidMount()
    {
        axios.get('https://backendtrends.herokuapp.com/exercises/')
        .then(response => {
            this.setState({thoughts:response.data})
            this.setState({isloading:'0'})
        })
    }
    printThoughts()
    {
        let arrayofCards = []
            for(let d of this.state.thoughts)
            {
                if(d.tag == this.props.match.params.tag) {
                    arrayofCards.push(<CurrentCompon Tags = {d}></CurrentCompon>)
                }
            }
            return arrayofCards;
    }
    redirectToPost()
    {
        if(this.props.loginStatus == "null"){
                this.props.history.push('/login')
        }
        else{
            if(this.props.match.params.tag == undefined || this.props.match.params.tag == "undefined")
                this.props.history.push('/post/ ');
            else
                this.props.history.push('/post/'+this.props.match.params.tag);
        }
    }

    render()
    {
        if(this.state.isloading == '1')
            {
                return(
                    <div>
                        <div className = "currentCont">
                                <h1 id="thoughtheading" onClick={() => {this.redirectToPost()}}>{this.props.match.params.tag}</h1>
                                <div class="loader"></div>
                        </div>
                    </div>
                )
            }
            else
            {   
                return(
                    <div>
                        <div className = "currentCont">
                                <h1 id="thoughtheading" onClick={() => {this.redirectToPost()}}>{this.props.match.params.tag}</h1>
                                {this.printThoughts()}
                        </div>
                    </div>
                )
            }
    }
}


export default withRouter(CurrentComponent);