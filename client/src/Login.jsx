import React, { useState } from 'react';
import {Menu, Icon, Input, Button, Typography, message, Dropdown, Layout} from 'antd';
import './login.css';
const {Title} = Typography;
const {Header, Footer, Content} = Layout;

const Login = ({onSubmit}) => {
    const [myName, setMyName] = useState("I Forgot My Name");
    const [myColor, setMyColor] = useState("Select a Color");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting name: " + myName);
        console.log("Submitting color: " + myColor);
        onSubmit(myName, myColor);
    }
    
    function handleMenuClick(e){
        setMyColor(e.key);
    }

    const colorMenu = (
        <Menu onClick = {handleMenuClick}>
            <Menu.Item key="Red">
                Red
            </Menu.Item>
            <Menu.Item key="Blue">
                Blue
            </Menu.Item>
            <Menu.Item key="Green">
                Green
            </Menu.Item>
            <Menu.Item key="Yellow">
                Yellow
            </Menu.Item>
            <Menu.Item key="Purple">
                Purple
            </Menu.Item>
        </Menu>
    );


    return(
        <>
        <Layout>
            <Layout>
                <Header style = {{backgroundColor: "#367BA3", textAlign: "center",}}><Title style ={{color: "white"}}>Big Boy Buddy Blocks</Title></Header>
                <Content>
                <span className = "login-flex">
                    <form onSubmit = {handleSubmit} className = "login-form">
                        <br/>
                            <Input onChange = {(e) => setMyName(e.target.value)} 
                                values= {myName} 
                                className = "username" 
                                placeholder = "Enter Username"
                                size = "default" />
                    <br/>
                    <Dropdown className="color-dropdown" overlay={colorMenu}>
                        <Button>
                            <Icon type="bg-colors"/>
                                {myColor}
                        </Button>
                    </Dropdown>
                    <br/>
                    <Button onClick = {handleSubmit} type = "primary" className = "play" value = "Play">Play</Button>
                    <br/>
                    </form>
                </span>
                </Content>
                <Footer style = {{backgroundColor: "#367BA3", textAlign: "right", bottom: "0px"}}>
                    ©Code Monkeys. Developed by Daniel Schubert, Jake Tener, Isaac Spanier
                </Footer>
            </Layout>
        </Layout> 
           
        </>
   )
}


export default Login;
