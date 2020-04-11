import React,{ useRef, useEffect }from 'react';
import Draw from "./draw";
import { BoardState } from '../../shared/src/board-state/board-state';
import Mediator from '../../shared/src/board-state/mediator';

// TODO: make common Board component. Has displayOnly, as well as width and height (in number of cells) props
export const SmallBoard = ({ color }) => {
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
    const ctx = canvas.getContext("2d");

    const cellWidth = canvas.width / 4;
    const cells = Math.round(canvas.width / cellWidth);
    const board = new Draw(ctx, canvas.width, canvas.height, cellWidth)
    boardRef.current = board;
  
    const boardState = new BoardState(cells, cells);
    boardStateRef.current = boardState;
    const myBlock = boardState.addBlock(boardState.getRandomType(), color, "greg", false);
    myBlockRef.current = myBlock;
    
    Mediator.setPreviewCallback(() => {  
      const blockType = myBlockRef.current.piece;
      boardState.clear();
      myBlockRef.current = boardState.addBlock(boardState.getRandomType(), color, "greg", false);
      return blockType;
    });

    render();
  }, []);

  return (
    <canvas style = {{margin:"auto"}} ref={canvasRef} width={0.05 * window.innerWidth} height={0.05 * window.innerWidth}/>
  );
};
