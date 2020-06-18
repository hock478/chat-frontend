import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import NavBar from './/NavBar'
import MessagePage from './MessagePage'
import Login from './Login'
import ExploreContainer from './ExploreContainer'
import Profile from './Profile'
import Home from './Home'

class App extends React.Component{

  constructor(){
    super()
    this.state = {
      currentUser: null
    }
  }

    updateCurrentUser = (user) => {
      this.setState({currentUser: user})
    }

    componentDidMount(){
  
      if(localStorage.getItem("token") && localStorage.getItem("token") !== "null"){
        fetch("http://localhost:3000/decode_token", {
          headers: {
            "Authenticate": localStorage.token
          }
        })
        .then(res => res.json())
        .then(userData => {
          this.updateCurrentUser(userData)
        })
      }else{
        console.log("No token found, user is not authenticated")
      }
  
  
    
  
    }

  render(){
    return(
      <div className="App">
        <NavBar user={this.state.currentUser} updateCurrentUser={this.updateCurrentUser}/>
        <Switch>
        <Route exact path="/" render ={() =>  <Home currentUser={this.state.currentUser} />} />
        <Route exact path="/messages" render= {() => this.state.currentUser ? <MessagePage user={this.state.currentUser}/> : <Login updateCurrentUser={this.updateCurrentUser} /> }/>
        <Route exact path="/explore/:id" render ={(routerProps) => this.state.currentUser ? routerProps.match.params.id == this.state.currentUser.id  ? <ExploreContainer user={this.state.currentUser} id={routerProps.match.params.id}  /> : null : null}/>
        <Route exact path="/profile" render ={() => this.state.currentUser ? <Profile currentUser={this.state.currentUser} />: <Login updateCurrentUser={this.updateCurrentUser} />}/>
        <Route exact path="/users/:id" render ={(routerProps) => <Profile id={routerProps.match.params.id} currentUser={this.state.currentUser}/>}/>
        <Route exact path="/login" render ={() => this.state.currentUser ? <Home currentUser={this.state.currentUser} /> : <Login updateCurrentUser={this.updateCurrentUser} />}/>

        {/* <Route exact path="/login" render ={() => <Login />}/> */}


        <Route render={() => ""}/>

        </Switch>


      </div>
  )
  ;
    }
}

export default App;
