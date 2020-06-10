import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import NavBar from './/NavBar'
import MessagePage from './MessagePage'
import Login from './Login'
import FriendContainer from './FriendContainer'
import Profile from './Profile'
import NewConvoForm from './NewConvoConfirm';

class App extends React.Component{

  constructor(){
    super()
    this.state = {
      currentUser: null
      // currentUser: {
      //   "id": 23,
      //   "username": "dawit400",
      //   "fullname": "Dawit Gizaw",
      //   "password_digest": "$2a$12$zQMKu1GgXXgxT0ayPapiXOFqN7orCgloPZHAyLwmVjB38RjISpgHC",
      //   "age": 19,
      //   "bio": "Living life",
      //   "profile_pic": null,
      //   "created_at": "2020-06-03T05:20:44.326Z",
      //   "updated_at": "2020-06-03T05:20:44.326Z"
      // }
    }
  }

    updateCurrentUser = (user) => {
      this.setState({currentUser: user})
    }

    componentDidMount(){

      // this.setState({currentUser: JSON.parse(localStorage.user)})
  
      if(localStorage.getItem("token") && localStorage.getItem("token") !== "null"){
        fetch("http://localhost:3000/decode_token", {
          headers: {
            "Authenticate": localStorage.token
          }
        })
        .then(res => res.json())
        .then(userData => {
          this.updateCurrentUser(userData)
          // this.changeLog()
          //if error, don't update the state
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
        <Route exact path="/" render ={() => this.state.currentUser ? "Home" : <Login updateCurrentUser={this.updateCurrentUser} />}/>
        <Route exact path="/about" render ={() => <h1></h1>}/>
        <Route exact path="/messages" render= {() => this.state.currentUser ? <MessagePage user={this.state.currentUser}/> : <Login updateCurrentUser={this.updateCurrentUser} /> }/>
        <Route exact path="/friends" render ={() => <FriendContainer />} />
        <Route exact path="/profile" render ={() => this.state.currentUser ? <Profile user={this.state.currentUser} />: <Login updateCurrentUser={this.updateCurrentUser} />}/>
        <Route exact path="/users/:id" render ={(routerProps) => <Profile id={routerProps.match.params.id}/>}/>

        {/* <Route exact path="/login" render ={() => <Login />}/> */}


        <Route render={() => <div>404 Not Found</div>}/>

        </Switch>


      </div>
  )
  ;
    }
}

export default App;
