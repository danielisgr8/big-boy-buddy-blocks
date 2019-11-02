import React, { useState } from 'react';
import {Input, Button, Typography} from 'antd';
import './login.css';
const {Title} = Typography;

const Login = ({onSubmit}) => {
    const [myName, setMyName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting name: " + myName);
        onSubmit(myName);
    }

    return(
        <span className = "login-flex">
        <Title level = {2} className = "bbbb-title">Big Boy Buddy Blocks</Title>
        <form onSubmit = {handleSubmit} className = "login-form">
            <Input onChange = {(e) => setMyName(e.target.value)} values= {myName} className = "username" placeholder = "Enter Username" size = "default" />
            <br/>
           <Button onClick = {handleSubmit} type = "primary" className = "play" value = "Play">Play</Button>
        </form>
        </span>
   )
}

export default Login;
