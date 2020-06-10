import React from  'react';
import 'semantic-ui-css/semantic.min.css'


class Profile extends React.Component {

    constructor(){
        super()
        this.state = {
            user: {followers: [], following: []}
        }
    }
    
    componentDidMount(){
        if(!this.props.user){
            fetch(`http://localhost:3000/users/${this.props.id}`)
            .then(res => res.json())
            .then(data => this.setState({user: data}))
        }
    }
    
    render(){
        
        return (
            <>
        <div class="container">
	<div class="row">
		<div class="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
    	 <div class="well profile">
         <img class="ui large image" src={this.props.user ? this.props.user.profile_pic : this.state.user.profile_pic}/>          

            <div class="col-sm-12">
                <div class="col-xs-12 col-sm-8">
                    <h2>{this.props.user ? this.props.user.fullname : this.state.user.fullname}</h2>
                    <p><strong>Bio: </strong> {this.props.user ? this.props.user.bio : this.state.user.bio}</p>
                    <p><strong>Age: </strong> {this.props.user ? this.props.user.age : this.state.user.age}</p>
                    
                </div>             
                <div class="col-xs-12 col-sm-4 text-center">
                    <figure>                    
                    </figure>
                </div>
            </div>            
            <div class="col-xs-12 divider text-center">
                <div class="col-xs-12 col-sm-4 emphasis">
                    <h2><strong>{this.props.user ? this.props.user.followers.length : this.state.user.followers.length} </strong></h2>                    
                    <p><small>Followers</small></p>
                     <button class="btn btn-info btn-block"><span class="fa fa-user"></span> View Profile </button>
        {/* {this.props.user.id ? null : <button class="btn btn-success btn-block"><span class="fa fa-plus-circle"></span> Follow </button> }  */}
                </div>
                <div class="col-xs-12 col-sm-4 emphasis">
            <h2><strong>{this.props.user ? this.props.user.following.length : this.state.user.following.length}</strong></h2>                    
                    <p><small>Following</small></p>
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown button
  </button>
                </div>
                <div class="col-xs-12 col-sm-4 emphasis">
                    
                <div class="ui floating labeled icon dropdown button">
  <i class="add user icon"></i>
  <span class="text">Add User</span>
  <div class="menu">
    <div class="header">
      People You Might Know
    </div>
    <div class="item">
      <img class="ui avatar image" src="/images/avatar/small/jenny.jpg"/>
      Jenny Hess
    </div>
    <div class="item">
      <img class="ui avatar image" src="/images/avatar/small/elliot.jpg"/>
      Elliot Fu
    </div>
    <div class="item">
      <img class="ui avatar image" src="/images/avatar/small/stevie.jpg"/>
      Stevie Feliciano
    </div>
    <div class="header">
      Your Friends' Friends
    </div>
    <div class="item">
      <img class="ui avatar image" src="/images/avatar/small/christian.jpg"/>
      Christian
    </div>
    <div class="item">
      <img class="ui avatar image" src="/images/avatar/small/matt.jpg"/>
      Matt
    </div>
    <div class="item">
      <img class="ui avatar image" src="/images/avatar/small/justen.jpg"/>
      Justen Kitsune
    </div>
  </div>
</div>
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