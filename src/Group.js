import React from 'react'
let allUsers = []
export default class Group extends React.Component{
    names = () => {
        let users = this.props.group.users
        let owner = this.props.group.user
         allUsers = [...users,owner]
            allUsers = allUsers.filter(user => user.id !== this.props.user.id)
            
            return allUsers.map(user => user.fullname).join(", ")
        
        
        // return this.props.group.users.map(user => user.fullname).join(", ")
    }
    render(){
        return(
            
            <div class={this.props.group.id === this.props.groupClick ? "chat_list active_chat" : "chat_list"} onClick={() => this.props.changeGroup(this.props.group.id)}>
                    <div class="chat_people">
                    <div class="chat_img"><img class="ui large circular image" src={this.props.group.users.filter(user => user.id !== this.props.user.id)[0].profile_pic}/>
 </div>
                    <div class="chat_ib">
                        <h5>{this.names()}<span class="chat_date">Dec 25</span></h5>
                        <p>{this.props.group.messages[this.props.group.messages.length - 1].content}</p>
                    </div>
                    </div>
                    </div>
                  
        )
    }
}