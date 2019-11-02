/*
 * Class for Drawing the Board, Pieces, and Filling Cells
 */
class Draw {
    constructor(ctx, width, height, cellWidth) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.cellWidth = cellWidth;
        this.cells = width / cellWidth;
    }

    drawCell(x, y, color) {
        const pixelX = x*this.cellWidth;
        const pixelY = y*this.cellWidth;
        if (color === 'blue'){
            this.ctx.fillStyle= "#0000FF";
        }
        else if( color === 'red'){
            this.ctx.fillStyle = "#FF0000";
        }
        else if(color === 'orange'){
            this.ctx.fillStyle = "#FF8C00";
        }
        else if(color === 'green'){
            this.ctx.fillStyle = "#006400";
        }
        else{
            this.ctx.fillStyle = "#FFFFFF";
        }
        this.ctx.fillRect(pixelX,pixelY, this.cellWidth,this.cellWidth)
        this.ctx.moveTo(pixelX, pixelY);
        this.ctx.lineTo(pixelX, pixelY+this.cellWidth);
        this.ctx.lineTo(pixelX+this.cellWidth, pixelY+this.cellWidth);
        this.ctx.lineTo(pixelX+this.cellWidth, pixelY);
        this.ctx.lineTo(pixelX, pixelY);
        this.ctx.stroke();
    }

    drawState(state) {
        for(let row = 0; row < state.length; row++) {
            for(let col = 0; col < state[row].length; col++) {
                const block = state[row][col];
                if(block) {
                    this.drawCell(col, row, block.color);
                } else {
                    this.drawCell(col, row, "white");
                }
            }
        }
    }

    drawBoard() {
        for(let i = 0; i<this.cells+1; i++){
            this.ctx.moveTo(this.cellWidth*i, 0);
            this.ctx.lineTo(this.cellWidth*i, this.height);
        }
        for(let i =0; i<this.cells+1; i++){
            this.ctx.moveTo(0, this.cellWidth*i);
            this.ctx.lineTo(this.width, this.cellWidth*i);
        }
        this.ctx.stroke();
    }
}
export default Draw;