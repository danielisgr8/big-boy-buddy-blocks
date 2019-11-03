import React from 'react';
import Board from './Board';
import UserUI from './UserUI';

const Game = ({myName, myScore, myColor}) => {

    return(
        <span>
            <Board drawing="3"/>
            <UserUI myName = {myName} myScore = {myScore} myColor = {myColor} />    
        </span>

    )

}

export default Game;