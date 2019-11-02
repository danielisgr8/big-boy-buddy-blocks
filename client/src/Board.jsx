import React from 'react';
import Draw from './Draw'

export default class Board extends React.Component {
  
    componentDidMount() {
        const canvas = this.refs.board

        const ctx = canvas.getContext("2d")

        const board = new Draw(ctx, canvas.width, canvas.height)
        
        board.drawBoard();

        var i;
        for(i = 0; i<4; i++){
            const x = Math.floor(Math.random() * 27);
            const y = 0;
            
            board.drawPiece(Math.floor((Math.random() * 5) +1), x, y)
        }
      }
     
     
      render(){
        return (
         <div>
         <canvas ref="board" width={.45*window.innerWidth} height={.45*window.innerWidth} className="canvas"/>
        </div>);
      }
}