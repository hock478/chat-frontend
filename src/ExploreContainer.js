import React from 'react'

export default class ExploreContainer extends React.Component{
    constructor(){
        super()
        this.state = {
            posts: [],
        }
    }

    componentDidMount(){
        
                fetch(`http://localhost:3000/following_posts/${this.props.id}`)
                .then(res => res.json())
                .then(data => this.setState({posts: data }))
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


        
       dateToTime = (t) => {
           
        let time = t.split(/[- : T]/);
        
        time[5] = time[5].split(".")[0]
        let d = new Date(Date.UTC(time[0], time[1]-1, time[2], time[3], time[4], time[5]));
        let messageTime = this.timeSince(d)
        return messageTime

       }
      
        
       handleLike = (event, post) => {

        
        if(event.target.innerText === "Like"){
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
            fetch(`http://localhost:3000/likes/${like.id}`, {
                method: "DELETE",    
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
    
    render(){
        return(

         <>
         <nav class="navbar navbar-light bg-white">
        <form class="form-inline">
            <div class="input-group">
                <div class="input-group-append">
                <input type="text" class="form-control" placeholder="Search for a user..." aria-label="Recipient's username" aria-describedby="button-addon2"/>
                    <button class="btn btn-outline-primary" type="button" id="button-addon2">
                        <i class="fa fa-search"></i>
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

<div class="card gedf-card">
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
        {post.hash_tags.map(h =>  <span class="badge badge-primary">#{h}</span>
)}
       
    </div>
</div>
<div class="card-footer">
    <a href="#" class="card-link" onClick={(event) => this.handleLike(event,post)}><i class="fa fa-gittip"></i>{post.likes.find(like => like.user_id === this.props.id) ? "Unlike" : "Like"}</a>
    <a href="#" class="card-link"><i class="fa fa-comment"></i> Comment</a>
    <a href="#" class="card-link"><i class="fa fa-gittip"></i>{post.likes.length === 1 ? 1 : post.likes.length > 1 ? post.likes.length : 0} likes</a>
</div>
</div>

                
)}
            </div>
            <div class="col-md-3">
                <div class="card gedf-card">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                            card's content.</p>
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div>
                </div>
                <div class="card gedf-card">
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                                card's content.</p>
                            <a href="#" class="card-link">Card link</a>
                            <a href="#" class="card-link">Another link</a>
                        </div>
                    </div>
            </div>
        </div>
    </div>
         </>

        )
    }
}