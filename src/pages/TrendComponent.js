import React from 'react';
import axios from 'axios';
import TrendpageComponent from '../components/TrendpageComponent';
import '../styles/TrendCompon.css';
import HeaderComponent from '../components/HeaderComponent';
import '../styles/LoaderCompon.css';

export default class TrendComponent extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            tags : [],
            isloading : '1'
        }
    }
    componentDidMount()
    {
        axios.get('https://backendtrends.herokuapp.com/exercises/top')
        .then(response => {
            this.setState({tags:response.data})
            this.setState({isloading:'0'})
        })       
    }
    printTags()
    {
        let arrayofCards = []
        let count = 1;
            for(let d of this.state.tags)
            {
                arrayofCards.push(<TrendpageComponent Tags = {d} count={count} navigation={this.props.history}></TrendpageComponent>)
                count = count+1;
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
                        <div className = "trendCont">
                                <h1 id="heading">What's Happening Now!</h1>
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
                        <div className = "trendCont">
                                <h1 id="heading">What's Happening Now!</h1>
                                {this.printTags()}
                        </div>
                    </div>
                )
            }
    }
}