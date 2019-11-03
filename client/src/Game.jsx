import React, {useState} from 'react';
import Board from './Board';
import UserUI from './UserUI';
import './game.css';

const Game = ({myName, myColor}) => {
    const [playerScore, setPlayerScore] = useState(0);

    
    function incrementPlayerScore(){
        setPlayerScore(playerScore++);
    }
    return(
        <span className = "game">
            <Board drawing="3"/>
            <UserUI myName = {myName} myScore = {playerScore} myColor = {myColor} />    
        </span>

    )

}

export default Game;