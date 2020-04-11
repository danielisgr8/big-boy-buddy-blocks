import React, { useRef, useEffect } from "react";
import Draw from "./draw";
import { BoardState, movements } from './board-state/board-state';

import events from "./events";
import Mediator from './board-state/mediator';

const Board = ({wsem, color}) => {
  const canvasRef = useRef();
  const boardRef = useRef();
  const boardStateRef = useRef();
  const myBlockRef = useRef();
  const playerBlocks = useRef({});

  const render = () => {
    const board = boardRef.current;
    const boardState = boardStateRef.current;
    requestAnimationFrame(() => {
      board.drawState(boardState.state);
      render();
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.focus();
    const ctx = canvas.getContext("2d");

    const cellWidth = canvas.width / 20;
    const cells = Math.round(canvas.width / cellWidth);
    const board = new Draw(ctx, canvas.width, canvas.height, cellWidth)
    boardRef.current = board;
  
    const boardState = new BoardState(cells, cells);
    boardStateRef.current = boardState;
    const myBlock = boardState.addBlock(boardState.getRandomType(), color, "greg");
    if(wsem) wsem.sendMessage(events.c_newBlock, { blockType: myBlock.piece, points: myBlock.points });
    myBlockRef.current = myBlock;

    setInterval(() => {
      const myBlock = myBlockRef.current;
      if(boardState.checkIfFinal(myBlock)) {
        boardState.checkRowCompletion(myBlock);
        const nextBlockType = Mediator.requestType();
        myBlockRef.current = boardState.addBlock(nextBlockType, color, "greg");
        if(wsem) wsem.sendMessage(events.c_newBlock, { blockType: myBlockRef.current.piece, points: myBlockRef.current.points });
      } else {
        const movement = movements.softDrop;
        const success = boardState.moveBlock(myBlock, movement);
        if(success && wsem) wsem.sendMessage(events.c_blockMoved, { movement });
      }
    }, 800);
    
    render();

    if(wsem) {
      wsem.addEventHandler(events.s_newBlock, (data) => {
      
      });
  
      wsem.addEventHandler(events.s_blockMoved, (data) => {
        boardState.moveBlock(playerBlocks.current[data.name], data.movement);
      });
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={0.45 * window.innerWidth}
      height={0.45 * window.innerWidth}
      tabIndex={1}
      onKeyDown={(e) => {
        let movement = null;
        switch(e.key) {
          case "ArrowRight":
            movement = movements.right;
            break;
          case "ArrowLeft":
            movement = movements.left;
            break;
          case "ArrowUp":
            movement = movements.rotateCW;
            break;
          case "ArrowDown":
            movement = movements.softDrop;
            break;
        }
        if(movement === null) return;
        const boardState = boardStateRef.current;
        const myBlock = myBlockRef.current;
        const success = boardState.moveBlock(myBlock, movement);
        if(success && wsem) wsem.sendMessage(events.c_blockMoved, { movement });
      }}
    />);
};

export default Board;
