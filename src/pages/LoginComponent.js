import React from 'react';
import '../styles/LoginCompon.css';
import { NavLink, withRouter } from 'react-router-dom';
import ButtonComponent from '../components/ButtonComponent';
import InputComponent from '../components/InputComponent';
import HeaderComponent from '../components/HeaderComponent';
import axios from 'axios';
import disableBrowserBackButton from 'disable-browser-back-navigation';

class LoginComponent extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            username : '',
            password : '',
            email : '',
            otp : '',
            recvotp : '',
            update : '',
            confirm : ''        
        }
    }

    componentWillMount(){
        disableBrowserBackButton();
    }
    componentDidMount(){
        disableBrowserBackButton();
        this.toggleForgot();
    }

    updateUsername(newname){
        this.setState({username:newname});
    }
    updatePassword(newname){
        this.setState({password:newname});
    }
    updateEmail(newname){
        this.setState({email:newname});
    }
    updateOTP(newname){
        this.setState({otp:newname});

        if(this.state.recvotp == newname)
        {
            var y = document.getElementById("hide-otp");
            y.style.display = "none";
            var z = document.getElementById("hide-pass");
            z.style.display = "block";
        }
    }
    updateSecurityCode(newname){
        this.setState({update:newname});
    }
    updateConfirmCode(newname){
        this.setState({confirm:newname});
    }


    redirectToHome = () =>
    {
        axios.get('https://backendtrends.herokuapp.com/details/')
        .then(response => {
            const datas = response.data;
            for(let data of datas)
            {
                if(data.username==this.state.username){
                    if(data.password==this.state.password){
                        let encrypted = window.btoa(this.state.username);
                        this.props.history.replace("/user/"+window.btoa(encrypted));
                        return;
                    }
                    else{
                        alert('please verify username or password!');
                        this.props.history.push("/login");
                        return;
                    } 
                }
            }
            alert('please verify username or password!');
            return;
        })  
    }
    sendOTP = () => {
        var x = document.getElementById("hide-forgot");
        var y = document.getElementById("hide-otp");
        axios.post(
            'https://backendtrends.herokuapp.com/details/send',
            { 
              email: this.state.email
            },
            { headers: { 'Content-Type': 'application/json' } }
          ).then(res => this.setState({recvotp : res.data}))
           .then( x.style.display = "none" )
           .then( y.style.display = "block" )
           .catch(err => alert("please check your email or may be network error try again!"))
    }
    modifyPassword = () => {
        var y = document.getElementById("hide-pass");
        if(this.state.update == this.state.confirm){
            axios.post(
                'https://backendtrends.herokuapp.com/details/modify/'+this.state.email,
                { 
                  password: this.state.update
                },
                { headers: { 'Content-Type': 'application/json' } }
              ).then(y.style.display =  "none")
               .catch(err => alert("Network error or Server error"))
        }
        else{
            alert("passwords doesn't match");
        }
    }
    togglePassword(){
        var value = document.getElementById("password");
        if(value.type === "password") {
            value.type = "text";
        } else {
            value.type = "password";
        }
    }
    togglePassCode(){
        var x = document.getElementById("modify");
        var y = document.getElementById("confirm");
        if(x.type === "password") {
            x.type = "text";
            y.type = "text";
        } else {
            x.type = "password";
            y.type = "password";
        }
    }       
    toggleForgot = () => {
        var x = document.getElementById("hide-forgot");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
    }

    render()
    {
        return(
            <div>
                <HeaderComponent></HeaderComponent>
            <div>
                <div class="login-container">
                    <div class="box-cont">
                        <div class="inner-cont">
                            <h3 id="box-head">LOGIN</h3>
                            <form>
                                <label class="label">Username</label>
                                <InputComponent type="text" placeholder="username" className="details" value={this.state.username} onChange={(event) => this.updateUsername(event.target.value)}></InputComponent>
                                <label  class="label">Password</label>
                                <InputComponent type="password" placeholder="password" className="details" id="password" value={this.state.password} onChange={(event) => this.updatePassword(event.target.value)}></InputComponent>
                                <h4><input type="checkbox" onClick={() => this.togglePassword()}/> show password</h4>
                                <a id="forgot" onClick={this.toggleForgot}>Forgot Password?</a>
                                <div id="hide-forgot">
                                    <InputComponent type="text" placeholder="email" className="details" value={this.state.email} onChange={(event) => this.updateEmail(event.target.value)}></InputComponent>
                                    <ButtonComponent type="button" value="Send OTP" className="otp" onClick = {this.sendOTP}></ButtonComponent>
                                </div>
                                <div id="hide-otp">
                                <InputComponent type="text" placeholder="Enter your OTP" className="details" value={this.state.otp} onChange={(event) => this.updateOTP(event.target.value)}></InputComponent>
                                </div>
                                <div id="hide-pass">
                                    <InputComponent type="password" id="modify" placeholder="Update your password" className="details" value={this.state.update} onChange={(event) => this.updateSecurityCode(event.target.value)}></InputComponent>
                                    <InputComponent type="password" id="confirm" placeholder="Confirm your password" className="details" value={this.state.confirm} onChange={(event) => this.updateConfirmCode(event.target.value)}></InputComponent>
                                    <h4><input type="checkbox" onClick={() => this.togglePassCode()}/> show password</h4>
                                    <ButtonComponent type="button" value="Update" className="otp" onClick = {this.modifyPassword}></ButtonComponent>
                                </div>
                                <ButtonComponent type="button" value="Login" id="login" onClick = {this.redirectToHome}></ButtonComponent>                         
                            </form>
                        </div>
                    </div>
                    
                    <div class="last-cont">
                        <h4 id="sign-up">Don't have an account? <NavLink to='/signup' id="newSignup">Sign up</NavLink></h4>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default withRouter(LoginComponent);