import React, { useRef, useEffect } from "react";
import Draw from "./Draw";
import { BoardState, movements, blockTypes } from './board-state/board-state';

const Board = () => {
  const canvasRef = useRef();
  const boardRef = useRef();
  const boardStateRef = useRef();
  const myBlockRef = useRef();

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

    const cellWidth = canvas.width / 30;
    const cells = Math.round(canvas.width / cellWidth);
    const board = new Draw(ctx, canvas.width, canvas.height, cellWidth)
    boardRef.current = board;
  
    const boardState = new BoardState(cells, cells);
    boardStateRef.current = boardState;
    const myBlock = boardState.addBlock(blockTypes.I, "red", "greg");
    myBlockRef.current = myBlock;
    
    render();
  }, []);

  return (
    <div>
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
          }
          if(movement === null) return;
          const boardState = boardStateRef.current;
          const myBlock = myBlockRef.current;
          boardState.moveBlock(myBlock, movement);
        }}/>
   </div>);
};

export default Board;
