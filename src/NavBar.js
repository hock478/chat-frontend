import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { withRouter,Redirect } from 'react-router-dom';


class NavBar extends React.Component{
    constructor(){
        super()
        this.state = {
            active: "/",
            
        }
    
    }

    componentDidMount(){
        let b = window.location.href.split("/")[3]
        

        
        if(b !== "" && localStorage.token){
          this.setState({active: b})
            // document.getElementById(this.state.active).className = "active item"
        }else{
            document.getElementById("/").className = "active item"
            this.setState({active: "/"})
        }

       
    }
    

    makeActive = (event) => {
       if(document.getElementById(this.state.active)){
         if(event.target.id === "explore"){
          document.getElementById(this.state.active).className = "item"
          event.target.className = 'active item'
          this.setState({active: event.target.id})
          this.props.history.location.pathname = "/"
          this.props.history.push(`${event.target.id}/${this.props.user.id}`)
         }else{
        document.getElementById(this.state.active).className = "item"
        event.target.className = 'active item'
        this.setState({active: event.target.id})
        this.props.history.location.pathname = "/"
        this.props.history.push(`${event.target.id}`)
         }
       }else{
        document.getElementById("/").className = "active item"
        this.setState({active: "/"})
       }
       
        
        
    }

    
   
  
    render(){
        

        return (<div>
            <div className="ui huge inverted menu">
  <a className="item" onClick={this.makeActive}id="/">
    Home
  </a>
  {this.props.user ? <a className={this.state.active === "explore" ? "active item" : "item"} onClick={this.makeActive} id="explore">
    Explore
  </a> : null}
  {this.props.user ? <a className={this.state.active === "messages" ? "active item" : "item"} onClick={this.makeActive} id="messages">
    Messages
  </a> : null}
  {this.props.user ? <a className={this.state.active === "profile" ? "active item" : "item"} onClick={this.makeActive} id="profile">
    Profile
        </a> : null }
  <div className="right menu">
    {/* <a className="ui item" onClick={(event) =>  {this.logged(event)}}>
        Log In
    </a> */}
    <div className="item">
  <div className="ui black button" onClick={(event) => event.target.innerText === "Log Out" ? localStorage.clear() : window.location.href = "http://localhost:3001/login"} >{this.props.user ? <a href="/">Log Out</a> : <a href="/login">Log In</a>}</div>
    </div>
  </div>
</div>
        </div>)
    }
}

export default withRouter(NavBar)