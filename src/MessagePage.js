import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import Inbox from './Inbox'
import MessageContainer from './MessageContainer'
export default class MessagePage extends React.Component{
    constructor(){
        super()
        this.state = {
            groups: [],
            groupClick: null,
            input: ""
        }
    }

    componentDidMount(){
        fetch(`http://localhost:3000/groups/${this.props.user.id}`)
        .then(res => res.json())
        .then(data => this.setState({groups: data, groupClick: data[0].id})
    )
        this.getMachineAction()
    }

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
                        <div className="ui button">New Conversation</div>

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
                    {/* <div className="incoming_msg">
                    <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
                    <div className="received_msg">
                        <div className="received_withd_msg">
                        <p>Test which is a new approach to have all
                            solutions</p>
                        <span className="time_date"> 11:01 AM    |    June 9</span></div>
                    </div>
                    </div> */}
                    {/* <div className="outgoing_msg">
                    <div className="sent_msg">
                        <p>Test which is a new approach to have all
                        solutions</p>
                        <span className="time_date"> 11:01 AM    |    June 9</span> </div>
                    </div> */}
                    {/* <div className="incoming_msg">
                    <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
                    <div className="received_msg">
                        <div className="received_withd_msg">
                        <p>Test, which is a new approach to have</p>
                        <span className="time_date"> 11:01 AM    |    Yesterday</span></div>
                    </div>
                    </div> */}
                    {/* <div className="outgoing_msg">
                    <div className="sent_msg">
                        <p>Apollo University, Delhi, India Test</p>
                        <span className="time_date"> 11:01 AM    |    Today</span> </div>
                    </div> */}
                    {/* <div className="incoming_msg">
                    <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
                    <div className="received_msg">
                        <div className="received_withd_msg">
                        <p>We work directly with our designers and suppliers,
                            and sell direct to you, which means quality, exclusive
                            products, at a price anyone can afford.</p>
                        <span className="time_date"> 11:01 AM    |    Today</span></div>
                    </div>
                    </div> */}
                </div>
                <div className="type_msg">
                    <div className="input_msg_write">
                    <input type="text" className="write_msg" placeholder="Type a message" onChange={this.handleMessage} />
                    <button className="msg_send_btn" onClick={this.addMessage} type="button"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                    </div>
                </div>


                </div>
            </div>
            
            
            {/* <p className="text-center top_spac"> Design by <a target="_blank" href="#">Sunil Rajput</a></p> */}
            
            </div>

            </div>

</>
        )
            
        
    }
}