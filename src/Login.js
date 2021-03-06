import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react'

export default class Login extends React.Component{


    state = {
        username: "",
        password: "",
        fullname: "",
        bio: "",
        image_url: "",
        password_confirmation: "",
        signIn: true,
        age: ""
      };

    
      handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
      //When form is submitted, make a fetch to "log in the user"
      handleLoginSubmit = (e) => {
          e.preventDefault()
          if(this.state.signIn){
            fetch("http://localhost:3000/login", {
          method:"POST",
          headers: {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
          })
        }).then(res => res.json())
        .then(userData => {
          console.log("response from the server", userData)
          if(userData.error_message){
            alert(userData.error_message)
          }else{
            localStorage.setItem("token", userData.token)
            
            localStorage.setItem("userId", userData.user_data.id)   //added this to store current user 
            this.props.updateCurrentUser(userData.user_data)   
            // this.props.changeLog()
          }
        })
          }else{
            fetch("http://localhost:3000/users", {
          method:"POST",
          headers: {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify({
            "user": {
            username: this.state.username,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
            fullname: this.state.fullname,
            bio: this.state.bio,
            profile_pic: this.state.image_url,
            age: this.state.age
            }
          })
        }).then(res => res.json())
        .then(userData => {
          console.log("response from the server", userData)
          if(userData.error_message){
            alert("There are errors in the form, fix them")
          }else{
            // debugger
            localStorage.setItem("token", userData.token)
            // localStorage.setItem("userId", userData.user_data.id)   //added this to store current user 
            
            this.props.updateCurrentUser(userData.user_data.user)   
            window.location.href = "http://localhost:3001/"
            // this.props.changeLog()
          }
        })
          }
        console.log("attempting to log in")
        
      };

      handleSign = (event) => {
        this.setState({signIn: !this.state.signIn})
      }


    render(){
        if(this.state.signIn){
        return (
         
          <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='black' textAlign='center'>
            <Icon name='game' /> Log-in to your account
            </Header>

            <Form className="ui form" onSubmit={this.handleLoginSubmit} size='large'>
              <Segment stacked>
            
           
              <Form.Input fluid icon='user' iconPosition='left' name="username" placeholder='Enter your username...' value={this.state.username} onChange={this.handleChange} />
              <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    name="password"
                    value={this.state.password} onChange={this.handleChange}
                  />
                    <Button color='black' fluid size='large' type="submit">
                       Login
                    </Button>
              </Segment> 
            </Form>

            <Message>
               New to us? <a href='#' onClick={this.handleSign}>Sign Up</a>
            </Message>

          </Grid.Column>
      </Grid> 

        )
        }
        else{
          return(

            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='black' textAlign='center'>
            <Icon name='game' /> Create Your Account!
            </Header>

            <Form className="ui form" onSubmit={this.handleLoginSubmit} size='large'>
              <Segment stacked>
            
           
              <Form.Input fluid icon='user' iconPosition='left' name="fullname" placeholder='Enter your full name...' value={this.state.fullname} onChange={this.handleChange} />
              <Form.Input fluid icon='user' iconPosition='left' name="username" placeholder='Enter your username...' value={this.state.username} onChange={this.handleChange} />

              <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    name="password"
                    value={this.state.password} onChange={this.handleChange}
                  />
                   <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password Confirmation'
                    type='password'
                    name="password_confirmation"
                    value={this.state.password_confirmation} onChange={this.handleChange}
                  />
                    <Form.Input fluid icon='user' iconPosition='left' name="age" placeholder='Enter your age...' value={this.state.age} onChange={this.handleChange} />

                  
                   <Form.Input fluid icon='user' iconPosition='left' name="image_url" placeholder='Enter your image...' value={this.state.image_url} onChange={this.handleChange} />
                   <Form.Input fluid icon='user' iconPosition='left' name="bio" placeholder='Enter your bio...' value={this.state.bio} onChange={this.handleChange} />

                    <Button color='black' fluid size='large' type="submit">
                       Sign Up
                    </Button>
              </Segment> 
            </Form>

            <Message>
               Have an Account? <a href='#' onClick={this.handleSign}>Log In</a>
            </Message>

          </Grid.Column>
      </Grid> 


          )
        }
    }
}