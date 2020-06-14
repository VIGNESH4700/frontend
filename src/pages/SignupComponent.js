import React from 'react';
import '../styles/LoginCompon.css';
import ButtonComponent from '../components/ButtonComponent';
import InputComponent from '../components/InputComponent';
import HeaderComponent from '../components/HeaderComponent';
import axios from 'axios';

export default class SignupComponent extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            existlist : [],
            email : '',
            username : '',
            about : '',
            password : '',
            confirmPassword : '',
            usercheck : ''
        }
    }
    componentWillMount(){
        axios.get('https://backendtrends.herokuapp.com/details/')
        .then(response => {
            this.setState({existlist:response.data});
        })
    }
    updateEmail(newname){
        this.setState({email:newname});
    }
    updateUsername(newname){
        this.setState({username:newname});
        for(let data of this.state.existlist)
        {
            if(data.username === newname){
                this.setState({usercheck:"user exists!"});
                break;                    
            }
            else{
                this.setState({usercheck:''});
            } 
        }
    }
    updateAbout(newname){
        this.setState({about:newname});
    }
    updatePassword(newname){
        this.setState({password:newname});
    }
    updateConfirmPassword(newname){
        this.setState({confirmPassword:newname});
    }

    redirectToLogin = () => {
        if(this.state.password == this.state.confirmPassword){
            axios.post(
                'https://backendtrends.herokuapp.com/details/add',
                { 
                  email: this.state.email,
                  username: this.state.username,
                  about: this.state.about,
                  password: this.state.password 
                },
                { headers: { 'Content-Type': 'application/json' } }
              ).then(res => alert("signed up successfully! :)"))
               .then(res =>this.props.history.push("/login"))
               .catch(err => alert("please check your username or may be network error try again!"))   
        }
        else{
            alert("passwords does not match!");
        }
    }
    togglePassword(){
        var value = document.getElementById("password");
        var val = document.getElementById("con-password");
        if(value.type === "password") {
            value.type = "text";
            val.type = "text";
        } else {
            value.type = "password";
            val.type = "password";
        }
    }
    render()
    {
        return(
            <div>
                <HeaderComponent></HeaderComponent>
            <div>
                <div class="signin-container">
                    <div class="box-cont">
                        <div class="inner-cont">
                            <h3 id="box-head">SIGN IN</h3>
                            <form>
                            <label class="label">Email</label>
                                <InputComponent type="text" placeholder="email" className="details" value={this.state.email} onChange={(event) => this.updateEmail(event.target.value)}></InputComponent>
                                <label class="label">Username</label>
                                <h6 id="warninguserexists">{this.state.usercheck}</h6>
                                <InputComponent type="text" placeholder="username" className="details" id="usercheck" value={this.state.username} onChange={(event) => this.updateUsername(event.target.value)}></InputComponent>
                                <label class="label">About</label>
                                <textarea className="middle" id="about" placeholder="write something about you!" value={this.state.about} onChange={(event) => this.updateAbout(event.target.value)}></textarea> 
                                <label  class="label">Password</label>
                                <InputComponent type="password" placeholder="password" id="password" className="details" value={this.state.password} onChange={(event) => this.updatePassword(event.target.value)}></InputComponent>
                                <label  class="label">Confirm Password</label>
                                <InputComponent type="password" placeholder="confirm password" id="con-password" className="details" value={this.state.confirmPassword} onChange={(event) => this.updateConfirmPassword(event.target.value)}></InputComponent>
                                <h4><input type="checkbox" onClick={() => this.togglePassword()}/> show password</h4>
                                <ButtonComponent type="button" value="Sign in" id="login" onClick = {this.redirectToLogin}></ButtonComponent>                         
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}