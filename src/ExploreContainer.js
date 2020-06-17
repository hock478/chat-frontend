import React from 'react'

export default class ExploreContainer extends React.Component{
    constructor(){
        super()
        this.state = {
            posts: []
        }
    }

    componentDidMount(){
        
                fetch(`http://localhost:3000/following_posts/${this.props.id}`)
                .then(res => res.json())
                .then(data => this.setState({posts: data}))
            }
        
       
      
        
    
    render(){
        return(

         <>
         <nav class="navbar navbar-light bg-white">
        <form class="form-inline">
            <div class="input-group">
                <input type="text" class="form-control" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                <div class="input-group-append">
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
                        <li class="list-group-item">Vestibulum at eros</li>
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
    <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i> 10 min ago</div>
    <a class="card-link" href="#">
        <h5 class="card-title">{post.header}</h5>
    </a>

    <p class="card-text">
       {post.content}
    </p>
    <div>
        <span class="badge badge-primary">JavaScript</span>
        <span class="badge badge-primary">Android</span>
        <span class="badge badge-primary">PHP</span>
        <span class="badge badge-primary">Node.js</span>
        <span class="badge badge-primary">Ruby</span>
        <span class="badge badge-primary">Paython</span>
    </div>
</div>
<div class="card-footer">
    <a href="#" class="card-link"><i class="fa fa-gittip"></i> Like</a>
    <a href="#" class="card-link"><i class="fa fa-comment"></i> Comment</a>
    <a href="#" class="card-link"><i class="fa fa-mail-forward"></i> Share</a>
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