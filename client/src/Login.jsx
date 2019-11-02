import React from 'react';
import {Input, Button, Typography} from 'antd';
import './login.css';
const {Title} = Typography;


export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {myName: ''}

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
        handleChange(event){
            this.setState({myName: event.target.value});
            console.log(this.state.myName);
        }

        handleSubmit(event){
            console.log('A name was submitted: ' + this.state.myName);
            event.preventDefault();
        }

    render(){
        return(
            
                     <span className = "login-flex">
                     <Title level = {2} className = "bbbb-title">Big Boy Buddy Blocks</Title>
                     <form onSubmit = {this.handleSubmit} className = "login-form">
                         <Input onChange = {this.handleChange} values= {this.state.myName} className = "username" placeholder = "Enter Username" size = "default" />
                         <br/>
                        <Button onClick = {this.handleSubmit} type = "primary" className = "play" value = "Play">Play</Button>
                     </form>
                     </span>
                )}
}

