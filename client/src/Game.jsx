import React, { useState, useRef, useEffect } from 'react';
import Board from './Board';
import UserUI from './UserUI';
import WebSocketEventManager from "./websocket-event-manager";
import events from "./events";
import './game.css';

const Game = ({myName, myColor, local}) => {
    const [playerScore, setPlayerScore] = useState(0);
    // `true` if the game is currently running, `false` otherwise
    const [playState, setPlayState] = useState(false);
    const [players, setPlayers] = useState([]);
    const [wsReady, setWsReady] = useState(false);

    const wsemRef = useRef();

    useEffect(() => {
        if(local) return;

        const wsem = new WebSocketEventManager(`ws://${window.location.hostname}:1234`, () => {
            setWsReady(true);
            wsemRef.current.sendMessage(events.c_join, { name: myName });
        });
        wsemRef.current = wsem;

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
            {(local || wsReady) && <Board color={myColor} wsem={local ? undefined : wsemRef.current} />}
            <UserUI myName={myName} myScore={playerScore} myColor={myColor} />    
        </span>
    )
}

export default Game;