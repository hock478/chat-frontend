import React from 'react'
let allUsers = []
export default class Group extends React.Component{
    names = () => {
        let users = this.props.group.users
        // let owner = this.props.group.user
         allUsers = [...users]
            allUsers = allUsers.filter(user => user.id !== this.props.user.id)
            
            return allUsers.map(user => user.fullname).join(", ")
        
        
        // return this.props.group.users.map(user => user.fullname).join(", ")
    }
    render(){
        return(
            
            <div className={this.props.group.id === this.props.groupClick ? "chat_list active_chat" : "chat_list"} onClick={() => this.props.changeGroup(this.props.group.id)}>
                    <div className="chat_people">
                    <div className="chat_img"><img className="ui large circular image" src={this.props.group.users.filter(user => user.id !== this.props.user.id)[0].profile_pic}/>
 </div>
                    <div className="chat_ib">
                        <h5>{this.names()}<span className="chat_date">Dec 25</span></h5>
                        <p>{this.props.group.messages[this.props.group.messages.length - 1] ? this.props.group.messages[this.props.group.messages.length - 1].content : null}</p>
                    </div>
                    </div>
                    </div>
                  
        )
    }
}