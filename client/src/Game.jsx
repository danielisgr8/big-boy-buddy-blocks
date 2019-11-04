import React, {useState} from 'react';
import Board from './Board';
import UserUI from './UserUI';
import './game.css';

const Game = ({myName, myColor}) => {
    const [playerScore, setPlayerScore] = useState(0);

    return(
        <span className = "game">
                <Board color = {myColor}/>
                <UserUI myName = {myName} myScore = {playerScore} myColor = {myColor} />
        </span>
    )
}

export default Game;