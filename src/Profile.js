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

    dateToTime = (t) => {
           
        let time = t.split(/[- : T]/);
        
        time[5] = time[5].split(".")[0]
        let d = new Date(Date.UTC(time[0], time[1]-1, time[2], time[3], time[4], time[5]));
        let messageTime = this.timeSince(d)
        return messageTime

       }

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
            if(interval < 2){
                return "1 day"
            }
          return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
            if(interval < 2){
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
        
        return (
            <>
        <div className="container">
	<div className="row">
		<div className="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
    	 <div className="well profile" style={{centered: true}}>
         <img className="ui medium circular image" src={this.state.user ? this.state.user.profile_pic : null}/>          

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
        {this.state.user && this.state.user.posts.length >= 1 ? this.state.user.posts.map(post => 

<div class="card gedf-card">
<div class="card-header">
    <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex justify-content-between align-items-center">
            <div class="mr-2">
                <a href={`/users/${post.user_id}`}><img class="rounded-circle" width="45" src={this.state.user.profile_pic} alt=""/> </a>
            </div>
            <div class="ml-2">
                <div class="h5 m-0">@{this.state.user.username}</div>
                <div class="h7 text-muted">{this.state.user.fullname}</div>
            </div>
        </div>
        <div>
            <div class="dropdown">
                <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fa fa-ellipsis-h"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                    <div class="h6 dropdown-header">Configuration</div>
                    <a class="dropdown-item" href="#">Save</a>
                    <a class="dropdown-item" href="#">Hide</a>
                    <a class="dropdown-item" href="#">Report</a>
                </div>
            </div>
        </div>
    </div>

</div>
<div class="card-body">
    <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i> {this.dateToTime(post.created_at)} ago</div>
    <a class="card-link" href="#">
        <h5 class="card-title">{post.header}</h5>
    </a>

    <p class="card-text">
       {post.content}
    </p>
    <div>
        {post.hash_tags.map(h =>  <span class="badge badge-primary">#{h}</span>)}
       
       
    </div>
</div>
<div class="card-footer">
    <a href="#" class="card-link"><i class="fa fa-gittip"></i> Like</a>
    <a href="#" class="card-link"><i class="fa fa-comment"></i> Comment</a>
    <a href="#" class="card-link"><i class="fa fa-mail-forward"></i> Share</a>
</div>
</div>

                
) : null }
	</div>
    
        </>
            )
    }
}

export default Profile