import React from 'react';
import logo from './logo.svg';
import './App.css';
import TrendComponent from './pages/TrendComponent';
import CurrentComponent from './pages/CurrentComponent';
import PostComponent from './pages/PostComponent';
import HeaderComponent from './components/HeaderComponent';
import LoginComponent from './pages/LoginComponent';
import SignupComponent from './pages/SignupComponent';
import ProfileComponent from './pages/ProfileComponent';
import { BrowserRouter, Route } from "react-router-dom";

class App extends React.Component {
  constructor()
  {
    super();
    this.state = {
      loggedUsername : "null"
    }
  }
  componentWillMount(){
    let userName = this.getSavedValue("userName");
    if(userName == ''){
        this.setState({loggedUsername : "null"});
    }
    else{
      this.setState({loggedUsername : userName});
    }
  }
  saveValue(newname){
      var id = "userName";  
      var val = newname;  
      localStorage.setItem(id, val);
      let userName = this.getSavedValue("userName");
      this.setState({loggedUsername : userName});
  }

  getSavedValue(value){
      if (!localStorage.getItem(value)) {
        return "";
      }
      return localStorage.getItem(value);
  }
  render()
  {
    return (
      <BrowserRouter>

        <HeaderComponent loginStatus={this.state.loggedUsername} callBack={this.saveValue.bind(this)}></HeaderComponent>
        <Route exact path={"/"} render={() => <TrendComponent loginStatus={this.state.loggedUsername}/>} />
        <Route exact path={"/login"} render={() => <LoginComponent loginStatus={this.state.loggedUsername} callBack={this.saveValue.bind(this)}/>} />
        <Route exact path={"/signup"} render={() => <SignupComponent loginStatus={this.state.loggedUsername}/>} />
        <Route exact path={"/current/:tag"} render={() => <CurrentComponent loginStatus={this.state.loggedUsername} /> } />
        <Route exact path={"/post/:tag"} render={() => <PostComponent loginStatus={this.state.loggedUsername} />} />
        <Route exact path={"/profile"} render={() => <ProfileComponent loginStatus={this.state.loggedUsername} />} />

      </BrowserRouter>
     );
  }
}

export default App;