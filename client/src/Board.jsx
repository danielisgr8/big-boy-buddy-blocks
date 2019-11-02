import React from 'react';
import Draw from './Draw'
import { BoardState, movements, blockTypes } from './board-state/board-state';

export default class Board extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  
    componentDidMount() {
        const canvas = this.refs.board
        const ctx = canvas.getContext("2d")

        const cellWidth = canvas.width / 30;
        const cells = canvas.width / cellWidth;
        const board = new Draw(ctx, canvas.width, canvas.height, cellWidth)
        
        board.drawBoard();

        const boardState = new BoardState(cells, cells);
        const myBlock = boardState.addBlock(blockTypes.I, "red", "greg");
        board.drawState(boardState.state);

        this.setState({ board, boardState, myBlock });
      }

      handleClick(event) {
        this.state.boardState.moveBlock(this.state.myBlock, movements.right);
        this.state.board.drawState(this.state.boardState.state);
      }
     
      render(){
        return (
         <div>
         <canvas ref="board"
          width={.45*window.innerWidth}
          height={.45*window.innerWidth}
          className="canvas"
          onClick={this.handleClick}/>
        </div>);
      }
}