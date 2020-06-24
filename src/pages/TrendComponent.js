import React from 'react';
import axios from 'axios';
import TrendpageComponent from '../components/TrendpageComponent';
import '../styles/TrendCompon.css';
import HeaderComponent from '../components/HeaderComponent';
import '../styles/LoaderCompon.css';
import coverimage from '../Resources/images/background.jpg';
import { withRouter } from 'react-router-dom'

class TrendComponent extends React.Component
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
                    <div className = "HomeCont">
                    <div className = "trendCont">
                            <h1 className="heading">What's Happening Now!</h1>
                            <div class="loader"></div>
                    </div>
                    <div className = "coverCont">
                        <img src={coverimage}
                        alt="Cover Picture" id="cover-photo"/>
                    </div>
                </div>
                )
            }
            else
            {   
                return(
                    <div className = "HomeCont">
                        <div className = "trendCont">
                                <h1 className="heading">What's Happening Now!</h1>
                                {this.printTags()}
                        </div>
                        <div className = "coverCont">
                            <img src={coverimage}
                            alt="Cover Picture" id="cover-photo"/>
                        </div>
                    </div>
                )
            }
    }
}
export default withRouter(TrendComponent);
