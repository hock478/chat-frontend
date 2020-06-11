import React from  'react';
import 'semantic-ui-css/semantic.min.css'


class Profile extends React.Component {

    constructor(){
        super()
        this.state = {
            user: null
        }
    }
    
    componentDidMount(){
        if(this.props.id){
            fetch(`http://localhost:3000/users/${this.props.id}`)
            .then(res => res.json())
            .then(data => this.setState({user: data}))
        }else{
            fetch(`http://localhost:3000/users/${this.props.currentUser.id}`)
            .then(res => res.json())
            .then(data => this.setState({user: data}))
        }
    }
    addFollow = (event) => {
        if(event.target.innerText === "Follow"){
            console.log("hey")
            fetch("http://localhost:3000/follows", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    user_id: this.props.currentUser.id,
                    following_id: this.props.id
                })
            }).then(document.getElementById("fol").innerText = "Unfollow")
            
        }
    }

    
    
    render(){
        
        return (
            <>
        <div className="container">
	<div className="row">
		<div className="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
    	 <div className="well profile">
         <img className="ui large image" src={this.state.user ? this.state.user.profile_pic : null}/>          

            <div className="col-sm-12">
                <div className="col-xs-12 col-sm-8">
                    <h2>{this.state.user ? this.state.user.fullname : null}</h2>
                    <p><strong>Bio: </strong> {this.state.user ? this.state.user.bio : null}</p>
                    <p><strong>Age: </strong> {this.state.user ? this.state.user.age : null}</p>
                    
                </div>             
                <div className="col-xs-12 col-sm-4 text-center">
                    <figure>                    
                    </figure>
                </div>
            </div>            
            <div className="col-xs-12 divider text-center">
                <div className="col-xs-12 col-sm-4 emphasis">
                    <h2><strong>{this.state.user ? this.state.user.followers.length : null} </strong></h2>                    
                    <p><small>Followers</small></p>
        {this.props.currentUser && this.state.user ? this.props.currentUser.id === this.state.user.id ? null : <button className="btn btn-success btn-block" id="fol" onClick={this.addFollow}><span className="fa fa-plus-circle"></span>{this.state.user.followers.map(user => user.id).includes(this.props.currentUser.id) ? "Unfollow" : "Follow"} </button> : null}
                </div>
                <div className="col-xs-12 col-sm-4 emphasis">
            <h2><strong>{this.state.user ? this.state.user.following.length : null}</strong></h2>                    
                    <p><small>Following</small></p>
                </div>
                <div className="col-xs-12 col-sm-4 emphasis">
                {this.props.currentUser && this.state.user ? this.props.currentUser.id === this.state.user.id ?  <div className="ui red button">Delete Account</div> : null : null}
 
</div>
                </div>
            </div>
    	 </div>                 
		</div>
	</div>
    
        </>
            )
    }
}

export default Profile