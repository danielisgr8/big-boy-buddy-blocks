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

    const wsemRef = useRef();

    useEffect(() => {
        wsemRef.current = new WebSocketEventManager(`ws://${window.location.hostname}:1234`, () => {
            console.log("runing')");
            wsemRef.current.sendMessage(events.c_join, { name: myName });
        });
        const wsem = wsemRef.current;

        // TODO: need to consider when player joins after someone else, they need a list of players before
        // TODO: server has to maintain list of users (wss.clients?)
        wsem.addEventHandler(events.s_playersJoined, (data) => {
            setPlayers([...players, ...data.names]);
        });

        wsem.addEventHandler(events.s_playerLeft, (data) => {
            setPlayers(players.some((player) => player !== data.player));
        });
    }, []);
    
    function incrementPlayerScore(){
        setPlayerScore(playerScore++);
    }

    return(
        <span className = "game">
            {playState && <Board color = {myColor} wsem={wsemRef.current} />}
            <UserUI myName={myName} myScore={playerScore} myColor={myColor} />    
        </span>

    )

}

export default Game;