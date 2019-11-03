import React from 'react';
import './userUI.css';
import { Typography } from 'antd';
import Red from './Profiles/Mario.jpg';
import Green from './Profiles/Shrek.png';
import Blue from './Profiles/CookieMonster.jpg';
import Purple from './Profiles/Barney.jpg';
import Yellow from './Profiles/Homer.jpg';
import Board from './Board';
import Draw from "./Draw";
import {SmallBoard} from './SmallBoard';


const { Title } = Typography;

const UserUI = ({myName, myScore, myColor}) => {


    function chooseProfile(){ 
        if(myColor == "Green"){
            return <img src = {Green} className = "profile" alt = "Profile"/>
        }
        else if(myColor == "Red"){
            return <img src = {Red} className = "profile" alt = "Profile"/>
        }
        else if(myColor == "Blue"){
            return <img src = {Blue} className = "profile" alt = "Profile"/>
        }
        else if(myColor == "Purple"){
            return <img src = {Purple} className = "profile" alt = "Profile"/>
        }
        else if(myColor == "Yellow"){
            return <img src = {Yellow} className = "profile" alt = "Profile"/>
        }
    }
    return(
        <span className = "player-flex" style = {{backgroundColor: myColor}}>
            
            <Title level={2}>{chooseProfile()} {myName}<br/>Score: {myScore}</Title>
            <span style = {{display: "flex", backgroundColor: "black", paddingTop: 10, paddingBottom: 10}}>
                <SmallBoard color = {myColor}/>
            </span>
        </span>
    )
}

export default UserUI;