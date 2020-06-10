import React from 'react'
import Message from './Message'
export default class MessageContainer extends React.Component{
    constructor(){
        super()
        this.state = {
            messages: []
        }
    }
    componentDidMount(){
        // fetch(`http://localhost:3000/messages/${this.props.groupClick}`)
        // .then(res => res.json())
        // .then(data => this.setState({messages: data}))
        this.getMachineAction()
    }
    getMachineAction = async () => {
        try {
            const response = await fetch( `http://localhost:3000/messages/${this.props.groupClick}`);
            if (response.status === 200) {
                console.log("Machine successfully found.");
                const myJson = await response.json(); //extract JSON from the http response
                
                this.setState({messages: myJson})
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
    

    render(){
        
        return(
            <div>
            {this.state.messages.map(message => <Message message={message} user={this.props.user}/>)}

            </div>
        )
    }
}