import React, { useState, useRef, useEffect } from 'react';
import Board from './Board';
import UserUI from './UserUI';
import WebSocketEventManager from "./websocket-event-manager";
import events from "./events";
import './game.css';

const Game = ({myName, myColor}) => {
    const [playerScore, setPlayerScore] = useState(0);
    // `true` if the game is currently running, `false` otherwise
    const [playState, setPlayState] = useState(false);
    const [players, setPlayers] = useState([]);

    const wsemRef = useRef(new WebSocketEventManager("ws://localhost:1234", () => {
        wsemRef.current.sendMessage(events.c_join, { name: myName });
    }));

    useEffect(() => {
        const wsem = wsemRef.current;

        // TODO: need to consider when player joins after someone else, they need a list of players before
        // TODO: server has to maintain list of users (wss.clients?)
        wsem.addEventHandler(events.s_playersJoined, (data) => {
            setPlayers([...players, ...data.names]);
        });

        wsem.addEventHandler(events.s_playerLeft, (data) => {
            setPlayers(players.some((player) => player !== data.player));
        });
    });
    
    function incrementPlayerScore(){
        setPlayerScore(playerScore++);
    }

    return(
        <span classname="game">
            {playState && <Board drawing="3" wsem={wsemRef.current} />}
            <UserUI myName={myName} myScore={playerScore} myColor={myColor} />    
        </span>

    )

}

export default Game;