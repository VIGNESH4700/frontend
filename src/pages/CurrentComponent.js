import React from 'react';
import axios from 'axios';
import CurrentCompon from '../components/CurrentComponent';
import HeaderComponent from '../components/HeaderComponent';
import '../styles/TrendCompon.css';
import { NavLink } from 'react-router-dom';

export default class CurrentComponent extends React.Component
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
    render()
    {
        if(this.state.isloading == '1')
            {
                return(
                    <div>
                        <HeaderComponent></HeaderComponent>
                        <div className = "currentCont">
                        <NavLink to={"/post/"+this.props.match.params.username+"/"+this.props.match.params.tag}><h1 id="thoughtheading">{this.props.match.params.tag}</h1></NavLink>
                                <div class="loader"></div>
                        </div>
                    </div>
                )
            }
            else
            {   
                return(
                    <div>
                        <HeaderComponent></HeaderComponent>
                        <div className = "currentCont">
                        <NavLink to={"/post/"+this.props.match.params.username+"/"+this.props.match.params.tag}><h1 id="thoughtheading">{this.props.match.params.tag}</h1></NavLink>
                                {this.printThoughts()}
                        </div>
                    </div>
                )
            }
    }
}