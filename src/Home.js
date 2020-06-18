import React from 'react'

export default class Home extends React.Component{
   render(){
       return(
        <div class="ui inverted vertical center aligned segment">
        <nav class="ui container">
          <h1 class="ui inverted header">ChatCord</h1>
          <div class="ui borderless inverted compact menu">
            <a class="item">Contact</a>
          </div>
        </nav>
        <div class="ui content container">
          <h1 class="ui inverted header">Stay Connected</h1>
          <p>
            ChatCord is an application intended to connect gamers and friends of any sort to connect in a safe environment.
          </p>
          {!this.props.currentUser ? <a href="/login"><div class="ui huge button">Start Connecting</div></a> : null}
        </div>
        <footer class="ui inverted vertical segment">
          <a href="/">ChatCord</a>, by
          <a href={"https://www.linkedin.com/in/dawit-gizaw"}>Dawit Gizaw</a>.
        </footer>
      </div>
       )
   }
}