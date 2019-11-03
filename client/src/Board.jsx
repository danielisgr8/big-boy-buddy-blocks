import React, { useRef, useEffect } from "react";
import Draw from "./Draw";
import { BoardState, movements } from './board-state/board-state';
import events from "./events";
import Callback from './Callback';

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
    const myBlock = boardState.addBlock(boardState.getRandomType(), color, "greg", false);
    myBlockRef.current = myBlock;

    setInterval(function() {
      const myBlock = myBlockRef.current;
      if(boardState.checkIfFinal(myBlock)) {
        boardState.checkRowCompletion(myBlock);
        const nextBlockType = Callback.requestType();
        myBlockRef.current = boardState.addBlock(nextBlockType, color, "greg", false);
      } else {
        boardState.moveBlock(myBlock, movements.softDrop);
      }
    }, 800);
    
    render();

    wsem.addEventHandler(events.s_newBlock, (data) => {
      
    });

    wsem.addEventHandler(events.s_blockMoved, (data) => {
      boardState.moveBlock(playerBlocks.current[data.name], data.movement);
    });
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
          boardState.moveBlock(myBlock, movement);
        }}/>);
};

export default Board;
