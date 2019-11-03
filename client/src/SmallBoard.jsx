import React,{ useRef, useEffect }from 'react';
import Draw from "./Draw";
import { BoardState, blockTypes } from './board-state/board-state';

export const SmallBoard = ({color}) => {
    console.log("Small Board->", color );
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
    
        const cellWidth = canvas.width / 4;
        const cells = Math.round(canvas.width / cellWidth);
        const board = new Draw(ctx, canvas.width, canvas.height, cellWidth)
        boardRef.current = board;
      
        const boardState = new BoardState(cells, cells);
        boardStateRef.current = boardState;
        console.log("SmallBoard Color:", color);
        console.log("SmallBoard Color the Color", color.color);
        const myBlock = boardState.addBlock(blockTypes.S, color, "greg");
        myBlockRef.current = myBlock;
        
        render();
      }, []);

      return (
          <canvas style = {{margin:"auto"}} ref={canvasRef} width={0.05 * window.innerWidth} height={0.05 * window.innerWidth}/>);
};
