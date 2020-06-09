import React from 'react'
import Group from './Group'
export default class Inbox extends React.Component{
    render(){
        return(
            <div class="inbox_chat">

                {this.props.groups.map(group => {
                    return(
                        <Group group={group} key={group.id} user={this.props.user} changeGroup={this.props.changeGroup}/>
                    )

                })}
          
              </div>
             
        )
    }
}