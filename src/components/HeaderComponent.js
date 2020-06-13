import React from 'react'
import logo from '../Resources/images/logo_two.png';
import '../styles/HeaderCompon.css';
import { BrowserRouter, Route, NavLink, withRouter } from "react-router-dom";

class HeaderComponent extends React.Component{
    constructor()
    {
        super();

        this.state = {
            user : ' ',
            status : ' '
        }
    }
    componentDidMount(){
        if(this.props.match.params.username != undefined){
            if(this.props.match.params.username != "undefined"){
                this.setState({user: this.props.match.params.username})
                this.setState({status: "Logout"})
            }
            else{
                this.setState({user: "Profile"})
                this.setState({status: "Login"})
            }
        }
        else{
            this.setState({user: "Profile"})
            this.setState({status: "Login"})
        }
    }
    redirectToTrending()
    {
        this.props.history.push('/user/'+this.props.match.params.username)
    }
    redirectToPost()
    {
        if(this.props.match.params.username == undefined || this.props.match.params.username == "undefined"){
                this.props.history.push('/login')
        }
        else{
            this.props.history.push('/post/'+this.props.match.params.username)
        }
    }
    redirectToProfile()
    {
        if(this.props.match.params.username == undefined || this.props.match.params.username == "undefined"){
                this.props.history.push('/login')
        }
        else{
            this.props.history.push('/profile/'+this.props.match.params.username)
        }
    }
    redirectToLogin()
    {
        this.props.history.push('/login')
    }
    openNav() {
        document.getElementById("mySidepanel").style.width = "300px";
    }

    closeNav() {
        document.getElementById("mySidepanel").style.width = "0";
    }
    render(){
        return(
            <div class="Container">
                <div class="top-container">
                    <div class="top-one">
                        <img src={logo} alt="Logo" id="white" onClick={() => {this.redirectToTrending()}}/><h3 id="app-name">trendMate</h3>
                    </div>
                    <div class="top-two">
                        <button class="openbtn" onClick={() => this.openNav()}>☰</button>
                    </div>
                    <div id="mySidepanel" class="sidepanel">
                        <a href="javascript:void(0)" class="closebtn" onClick={() => this.closeNav()}>×</a>
                        <h3 id="nav-trend" className="trendmenu" onClick={() => {this.redirectToTrending()}}><i class="fas fa-hashtag"></i>Trending</h3>
                        <h3 id="nav-post" className="trendmenu" onClick={() => {this.redirectToPost()}}><i class="far fa-envelope"></i>Post</h3>
                        <h3 id="nav-user" className="trendmenu" onClick={() => {this.redirectToProfile()}}><i class="far fa-user-circle"></i>{this.state.user}</h3>
                        <h3 id="nav-status" className="trendmenu" onClick={() => {this.redirectToLogin()}}><i class="fas fa-user-plus"></i>{this.state.status}</h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(HeaderComponent);