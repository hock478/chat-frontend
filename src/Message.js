import React from 'react'

export default class Message extends React.Component{

     timeSince(date) {
    
        var seconds = Math.floor((new Date() - date) / 1000);
        
        
        var interval = Math.floor(seconds / 31536000);
      
        if (interval >= 1) {
          return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
          return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
          return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
            if(interval === 1){
                return "1 hour"
            }
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval >= 1) {
            if(interval === 1){
                return "1 minute"
            }
            return interval + " minutes";
        }
        return "less than a minute";
      }
    
    render(){
        var t = this.props.message.created_at.split(/[- : T]/);
        t[5] = t[5].split(".")[0]
        var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
        let messageTime = this.timeSince(d)
        if(this.props.message.user.id === this.props.user.id){
            return(
                <div class="outgoing_msg">
                    <div class="sent_msg">
                        <p>{this.props.message.content}</p>
                        <span class="time_date">{messageTime} ago</span> </div>
                    </div>
            )
        }else{
            return(
                <div class="incoming_msg">
                    <span class="name_mes"> {this.props.message.user.fullname}</span>
                    <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
                    <div class="received_msg">
                    
                        <div class="received_withd_msg">
                        <p>{this.props.message.content}</p>
                        <span class="time_date">{messageTime} ago</span></div>
                    </div>
                    </div>
            )
        }
       
    }
}