import React from 'react';
import {Input, Button} from 'antd';
import './login.css';


export default class Login extends React.Component{
    render(){
        return(
                <>
                    <b>Big Boy Buddy Blocks</b>
                    <Input className = "username" placeholder = "Enter Username" size = "default" />
                    <Button className = "play" type = "primary">Play</Button>
                </>
        )
    }
}