import React, { useState } from 'react';
import {Menu, Icon, Input, Button, Typography, Dropdown, Layout, Checkbox} from 'antd';
import './login.css';
const {Title} = Typography;
const {Header, Footer, Content} = Layout;

const placeholderColor = "Select a Color";

const Login = ({onSubmit}) => {
    const placeholderColor = "Select a Color";
    const defaultColor = "Orange";

    const [myName, setMyName] = useState("John Doe");
    const [myColor, setMyColor] = useState(placeholderColor);
    const [local, setLocal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(myName, myColor === placeholderColor ? defaultColor : myColor, local);
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
            <Menu.Item key="Orange">
                Orange
            </Menu.Item>
        </Menu>
    );


    return(
        <>
            <Layout className = "layout">
                <Header style = {{ backgroundColor: "#367BA3", textAlign: "center"}}><Title style ={{color: "white"}}>Big Boy Buddy Blocks</Title></Header>
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
                    <Checkbox onChange={(e) => setLocal(e.target.checked)}>Local?</Checkbox>
                    <br/>
                    <Button onClick = {handleSubmit} type = "primary" className = "play" value = "Play">Play</Button>
                    <br/>
                    </form>
                </span>
                </Content>
                <Footer style = {{ backgroundColor: "#367BA3", textAlign: "right", bottom: "0px"}}>
                    ©Code Monkeys. Developed by Daniel Schubert, Jake Tener, Isaac Spanier
                </Footer>
            </Layout>
           
        </>
   )
}
export default Login;
