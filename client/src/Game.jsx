import React, {useState} from 'react';
import Board from './Board';
import {Layout, Typography} from 'antd';
import UserUI from './UserUI';
import './game.css';

const {Title} = Typography;
const {Header, Footer, Content, Sider} = Layout;

const Game = ({myName, myColor}) => {
    const [playerScore, setPlayerScore] = useState(0);

    
    function incrementPlayerScore(){
        setPlayerScore(playerScore++);
    }
    function checkMyColor(){
        if(myColor === "Select a Color"){
            myColor = "Orange";
        }
    }
    return(
        <span className = "game">
                    {checkMyColor()}
                    <Board color = {myColor}/>
                    <UserUI myName = {myName} myScore = {playerScore} myColor = {myColor} /> 
                    <UserUI myName = "Daniel" myScore = {playerScore} myColor = "Red" /> 
                    <UserUI myName = "Jake" myScore = "69" myColor = "Green" /> 
                    <UserUI myName = "Isaac" myScore = {playerScore} myColor = "Blue" /> 
                
        </span>
    )
}

export default Game;