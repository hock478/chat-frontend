import React from 'react'
import {Confirm } from 'semantic-ui-react'


export default class ExploreContainer extends React.Component{
    constructor(){
        super()
        this.state = {
            posts: [],
            input: "",
            filteredUsers: [],
            users: [],
            
            inputUser: "",
            header: "",
            hash_input: [],
            open: false,
            add: false
        }
    }

    componentDidMount(){
        
                fetch(`http://localhost:3000/following_posts/${this.props.id}`)
                .then(res => res.json())
                .then(data => this.setState({posts: data }))
                .then(() => {
                    fetch("http://localhost:3000/users")
                    .then(res => res.json())
                    .then(data => this.setState({users: data}))
                
            })   
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


        
              show = () => {
                  this.setState({open: true})
              }

              handleCancel = () => {
                  this.setState({open: false})
              }
        
       dateToTime = (t) => {
           
        let time = t.split(/[- : T]/);
        
        time[5] = time[5].split(".")[0]
        let d = new Date(Date.UTC(time[0], time[1]-1, time[2], time[3], time[4], time[5]));
        let messageTime = this.timeSince(d)
        return messageTime

       }
      
       showAdd = () => {
           this.setState({add: true})
       }

       handleConfirm = () => {
        let hash = this.state.hash_input.split(" ")


           fetch("http://localhost:3000/posts",{
               method: "POST",
               headers: {"Content-Type": "application/json"},
               body: JSON.stringify({
                   user_id: this.props.id,
                   header: this.state.header,
                   content: this.state.input,
                   hash_tags: hash
               })
           }).then(res => res.json())
           .then(data => {
               this.setState({posts: [data, ...this.state.posts], open: false})
           })
       }

       
      
        
       handleLike = (event, post) => {

        
        if(!post.likes.find(l => l.user_id === this.props.user.id) && event.target.innerText === "Like"){
            fetch("http://localhost:3000/likes", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({user_id: this.props.id, post_id: post.id})
            }).then(res => res.json())
            .then(data => {
                let postArr = [...this.state.posts]
                let i = postArr.indexOf(postArr.find(p => p.id === post.id))
                postArr[i].likes.push(data)
                this.setState({posts: postArr})
            })
        }else{

            let like = post.likes.find(l => l.user_id === this.props.id)
            fetch(`http://localhost:3000/like_destroy`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    post_id: post.id,
                    user_id: this.props.id
                })
             }).then(res => res.json())
             .then(data => {
                let postArr = [...this.state.posts]
                let i = postArr.indexOf(postArr.find(p => p.id === post.id))
                let likesArr = postArr[i].likes
                let ind = likesArr.indexOf(likesArr.find(l => l.id === data.id))
                likesArr.splice(ind, 1)
                postArr[i].likes = likesArr
                this.setState({posts: postArr})

             })


        }
       }

       handleUser = (event) => {
        console.log("hey")
        this.setState({inputUser: event.target.value}); 
        let cloneArr = this.state.users; 
        if(event.target.value !== ""){
            cloneArr = this.state.users.filter(user => user.username.includes(event.target.value)); 
        }else{
            cloneArr = []
        }
        
        this.setState({filteredUsers: cloneArr}) 
  
    }
    
    render(){
        return(

         <>
         <nav class="navbar navbar-light bg-white">
        <form class="form-inline">
            <div class="input-group">
                <div class="input-group-append">
                <div className="ui button" onClick={this.show}>New Post</div>
                    <button class="btn btn-outline-primary" onClick={this.showAdd} type="button" id="button-addon2">
                        <i class="fa fa-search"> Search For a User</i>
                    </button>

                </div>
            </div>
        </form>
    </nav>


    <div class="container-fluid gedf-wrapper">
        <div class="row">
            <div class="col-md-3">
                <div class="card">
                    <div class="card-body">
                        <div class="h5">@{this.props.user ? this.props.user.username : null }</div>
                        <div class="h7 text-muted">Fullname : {this.props.user ? this.props.user.fullname : null}</div>
                        <div class="h7">{this.props.user ? this.props.user.bio : null}
                        </div>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <div class="h6 text-muted">Followers</div>
                            <div class="h5">{this.props.user ? this.props.user.followers.length : null}</div>
                        </li>
                        <li class="list-group-item">
                            <div class="h6 text-muted">Following</div>
                            <div class="h5">{this.props.user? this.props.user.following.length : null}</div>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="col-md-6 gedf-main">
            {this.state.posts.map(post => 

<div class="card gedf-card" key={post.id}>
<div class="card-header">
    <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex justify-content-between align-items-center">
            <div class="mr-2">
                <a href={`/users/${post.user.id}`}><img class="rounded-circle" width="45" src={post.user.profile_pic} alt=""/> </a>
            </div>
            <div class="ml-2">
                <div class="h5 m-0">@{post.user.username}</div>
                <div class="h7 text-muted">{post.user.fullname}</div>
            </div>
        </div>
        <div>

                <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fa fa-ellipsis-h"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                    
                    <a class="dropdown-item" onClick={(event) => alert("This post has been reported and will be reviewed. Thank you!")} href="#">Report</a>
                </div>
        </div>
    </div>
</div>
<div class="card-body">
    <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i> {this.dateToTime(post.created_at)} ago</div>
    <a class="card-link" style={{cursor: "pointer"}}>
        <h5 class="card-title">{post.header}</h5>
    </a>

    <p class="card-text">
       {post.content}
    </p>
    <div>
        {post.hash_tags.map(h =>  <span class="badge badge-primary" key={h}>#{h}</span>
)}
       
    </div>
</div>
<div class="card-footer">
    <a style={{cursor: "pointer"}}class="card-link" onClick={(event) => this.handleLike(event,post)}><i class="fa fa-gittip" onClick={(event) => this.handleLike(event,post)}></i>{post.likes.find(like => like.user_id === this.props.id) ? "Unlike" : "Like"}</a>
    {/* <a href="#" class="card-link" onClick={(event) => this.handleLike(event,post)}><i class="fa fa-gittip"></i>{post.likes.find(like => like.user_id === this.props.id) ? "Unlike" : "Like"}</a> */}
    <a style={{cursor: "pointer"}} class="card-link"><i class="fa fa-gittip"></i>{post.likes.length === 1 ? 1 : post.likes.length > 1 ? post.likes.length : 0} likes</a>
</div>

</div>

                
)}
            </div>
            <div class="col-md-3">
                <div class="card gedf-card">
                    <div class="card-body">
                        <h5 class="card-title">Tip #1</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Help us report pussies</h6>
                        <p class="card-text">If you click on the 3 dots on the top right of a post, you can report a post for misconduct</p>
                    </div>
                </div>
            </div>
        </div>
        
    </div>

    <Confirm
          open={this.state.open}
          header='Start a New Conversation'
          size='tiny'
          content={
              <>
           <div className="ui form">
 
  <div className="equal width fields">
    <div className="field">
      <label>Enter Header </label>
      <div class="ui search">
     <div class="ui icon input">  
      <input type="text" placeholder="Enter your header.."  value={this.state.header} onChange={(event) => {this.setState({header: event.target.value})} }/>
    </div>
    <div class="field">
        <label>Short Text</label>
        <textarea rows="2"></textarea>
    </div>  
    <div class="ui icon input">
    <label>Enter your hashtags(seperate by spaces)</label>
      <input type="text" placeholder="Enter hashtags..."  value={this.state.hash_input} onChange={(event) => {this.setState({hash_input: event.target.value})} }/>
    </div>  
  </div>
    </div>
   
 
  </div>
</div>

            </>
          }
          onCancel={() => this.handleCancel() }
          onConfirm={this.handleConfirm}
        />
        <Confirm
          open={this.state.add}
          header='Search by username'
          size='tiny'
          content={
              <>
           <div className="ui form">
 
  <div className="equal width fields">
    <div className="field">
      <label>Enter Username </label>
      <div class="ui search">
     <div class="ui icon input">  
      <input type="text" placeholder="Username..."  value={this.state.inputUser} onChange={this.handleUser}/>
      <i class="search icon"></i>
    </div>
  <div class="results"></div>
    </div>
    </div>
   
 
  </div>
</div>
<div className="ui list">
    {this.state.filteredUsers.filter(user => user.id !== this.props.user.id).map(user => 
         <div className="item">
         <img className="ui avatar image" src={user.profile_pic}/>
         <div className="content">
           <a href={`/users/${user.id}`}className="header">{user.fullname} ({user.username})</a>

                {/* <div className="ui button" onClick={(event, id) => this.addUser(event,user)}>Add</div> */}

         </div>
       </div>
       
       ) }
  
  
</div>

            </>
          }
          onCancel={() => { this.setState({filteredUsers: [], inputUser: "", add: false}) }}
          onConfirm={() => this.setState({add: false})}
        />
         </>

        )
    }
}