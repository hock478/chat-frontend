import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import Inbox from './Inbox'
import MessageContainer from './MessageContainer'
import {Confirm } from 'semantic-ui-react'

export default class MessagePage extends React.Component{
    constructor(){
        super()
        this.state = {
            groups: [],
            groupClick: null,
            input: "",
            open: false,
            users: [],
            addedUsers: [],
            inputUser: "",
            newGroup: null,
            filteredUsers: []
            
        }
    }

    componentDidMount(){
        
        fetch(`http://localhost:3000/groups/${this.props.user.id}`)
        .then(res => res.json())
        .then(data =>             this.setState({groups: data} ))
        .then(() => {
            if(this.state.groups[0]){
                this.setState({groupClick: this.state.groups[0].id})
                }
            }
        ).then(
            fetch("http://localhost:3000/users")
            .then(res => res.json())
            .then(data => this.setState({users: data, addedUsers: [this.props.user]}))
            
        )
       
        this.getMachineAction()
    }


    handleUser = (event) => {
        console.log("hey")
        this.setState({inputUser: event.target.value}); 
        let cloneArr = this.state.users; 
        if(event.target.value !== ""){
            cloneArr = this.state.users.filter(user => user.username.includes(event.target.value)); 
        }else{
            cloneArr = []
        }
        
        this.setState({filteredUsers: cloneArr}) 
  
    }


    show = () => this.setState({ open: true })
    handleConfirm = () => {
        if(this.state.addedUsers.length < 1){
            alert("Add at least one user")
        }else{
                fetch("http://localhost:3000/groups", {
                method: "POST",
                headers: {"Content-Type": "application/json", "Accept": "application/json"},
                body: JSON.stringify({
                    title: null,
                    user_id: this.props.user.id,
                    users: this.state.addedUsers
                })
            })
        }
        this.setState({ open: false })
    
    }
    handleCancel = () => this.setState({ open: false })
    getMachineAction = async () => {
        try {
            const response = await fetch( `http://localhost:3000/groups/${this.props.user.id}`);
            if (response.status === 200) {
                console.log("Machine successfully found.");
                const myJson = await response.json(); //extract JSON from the http response
                this.setState({groups: myJson})
                console.log(myJson);               
            } else {
                console.log("not a 200");
            }
        } catch (err) {
            // catches errors both in fetch and response.json
            console.log(err);
        } finally {
            // do it again in .5 seconds
            setTimeout(this.getMachineAction , 250);
        }
    };
    changeGroup = (id) => {
        this.setState({groupClick: id})
    }
    updateScroll = () => {
        var messageBody = document.getElementById('meg');
        messageBody.scrollTop = messageBody.scrollHeight;
    }

    addUser = (event, user) => {
        
        if(!!!this.state.addedUsers.find(userr => userr.id === user.id)){
        fetch(`http://localhost:3000/users/${user.id}`)
        .then(res => res.json())
        .then(data => { this.setState({addedUsers: [...this.state.addedUsers, data]}); console.log(data)})
        }else{
            alert("You can't add someone more than once")
        }
    }
    addMessage = () => {
        fetch("http://localhost:3000/messages", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                group_id: this.state.groupClick,
                user_id: this.props.user.id,
                content: this.state.input
            })

        })
        .then(res => res.json())
        .then(data => {
            this.updateScroll()
            if(data.error){
                console.log(data.error)
            }else{
                console.log("success")
            }
        })
    }
    handleMessage = (event) => {
        this.setState({input: event.target.value})
    }

    
    render(){
        return (
            <>
        <div className="container">

        <h3 className=" text-center">Messaging</h3>
        <div className="messaging">
            <div className="inbox_msg">
                <div className="inbox_people">
                    <div className="headind_srch">
                        <div className="recent_heading">
                        <div className="ui button" onClick={this.show}>New Conversation</div>

                        </div>
                    <div className="srch_bar">
                        <div className="stylish-input-group">
                            <input type="text" className="search-bar"  placeholder="Search" />
                         </div>
                    </div>
                </div>
                <Inbox groups={this.state.groups} user={this.props.user} changeGroup={this.changeGroup} groupClick={this.state.groupClick}/>
                </div>
                
                <div className="mesgs" id="megs">
                <div className="msg_history" id="meg">
                    <MessageContainer user={this.props.user} groupClick={this.state.groupClick} />
                </div>
                <div className="type_msg">
                    <div className="input_msg_write">
                    <input type="text" className="write_msg" placeholder="Type a message" onChange={this.handleMessage} />
                    <button className="msg_send_btn" onClick={this.addMessage} type="button"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                    </div>
                </div>


                </div>
            </div>
                        
            </div>

           

            </div>
            <Confirm
          open={this.state.open}
          header='Start a New Conversation'
          size='tiny'
          content={
              <>
           <div className="ui form">
 
  <div className="equal width fields">
    <div className="field">
      <label>Enter Username </label>
      <div class="ui search">
     <div class="ui icon input">  
      <input type="text" placeholder="Username..."  value={this.state.inputUser} onChange={this.handleUser }/>
      <i class="search icon"></i>
    </div>
  <div class="results"></div>
    </div>
    </div>
   
 
  </div>
</div>
<div className="ui list">
    {this.state.filteredUsers.filter(user => user.id !== this.props.user.id).map(user => 
         <div className="item">
         <img className="ui avatar image" src={user.profile_pic}/>
         <div className="content">
           <a className="header">{user.fullname} ({user.username})</a>

                <div className="ui button" onClick={(event, id) => this.addUser(event,user)}>Add</div>

         </div>
       </div>
       
       ) }
  
  
</div>

<div className="ui list">
    {this.state.addedUsers.filter(user => user.id !== this.props.user.id).map(user => 
         <div className="item">
         <img className="ui avatar image" src={user.profile_pic}/>
         <div className="content">
           <a className="header">{user.fullname} ({user.username})</a>


         </div>
       </div>
       
       ) }
  
  
</div>


            </>
          }
          onCancel={() => { this.setState({addedUsers: [], filteredUsers: [], inputUser: ""});this.handleCancel() }}
          onConfirm={this.handleConfirm}
        />

</>
        )
            
        
    }
}