import React from 'react'

export default class Group extends React.Component{
    
    names = () => {
        let users = this.props.group.users
            users = users.filter(user => user.id !== this.props.user.id)
            return users.map(user => user.fullname).join(", ")
        
        
        // return this.props.group.users.map(user => user.fullname).join(", ")
    }
    render(){
        return(
            <a href="#">
            <div class="chat_list active_chat" onClick={() => this.props.changeGroup(this.props.group.id)}>
                    <div class="chat_people">
                    <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
                    <div class="chat_ib">
                        <h5>{this.names()}<span class="chat_date">Dec 25</span></h5>
                        <p>{this.props.group.messages[this.props.group.messages.length - 1].content}</p>
                    </div>
                    </div>
                    </div>
                    </a>
        )
    }
}