/*
 * Class for Drawing the Board, Pieces, and Filling Cells
 */
class Draw {

    constructor(ctx, width, height){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.cellWidth = width / 30;
        this.cells = width / this.cellWidth;
    }

     drawPiece(drawing, x, y){
        if(drawing == 1){
            this.drawCell(x+0,y+0, 'blue');
            this.drawCell(x+0,y+1, 'blue');
            this.drawCell(x+0,y+2, 'blue');
            this.drawCell(x+0,y+3, 'blue');
        }
        if(drawing == 2){
            this.drawCell(x+0,y+0, 'red');
            this.drawCell(x+0,y+1, 'red');
            this.drawCell(x+1,y+1, 'red');
            this.drawCell(x+1,y+0, 'red');
        }
        if(drawing == 3){
            this.drawCell(x+0,y+0, 'orange');
            this.drawCell(x+0,y+1, 'orange');
            this.drawCell(x+0,y+2, 'orange');
            this.drawCell(x+1,y+2, 'orange');
        }
        if(drawing == 4){
            this.drawCell(x+0,y+0, 'green');
            this.drawCell(x+0,y+1, 'green');
            this.drawCell(x+1,y+1, 'green');
            this.drawCell(x+1,y+2, 'green');
        }
        if(drawing == 5){
            this.drawCell(x+0,y+0, 'yellow');
            this.drawCell(x+0,y+1, 'yellow');
            this.drawCell(x+0,y+2, 'yellow');
            this.drawCell(x+1,y+1, 'yellow');
        }
    } 
    drawCell(x, y, color){
        const pixelX = x*this.cellWidth;
        const pixelY = y*this.cellWidth;
        if (color == 'blue'){
            this.ctx.fillStyle= "#0000FF";
        }
        else if( color == 'red'){
            this.ctx.fillStyle = "#FF0000";
        }
        else if(color == 'orange'){
            this.ctx.fillStyle = "#FF8C00";
        }
        else if(color == 'green'){
            this.ctx.fillStyle = "#006400";
        }
        else{
            this.ctx.fillStyle = "#FFFF00";
        }
        this.ctx.fillRect(pixelX,pixelY, this.cellWidth,this.cellWidth)
        this.ctx.moveTo(pixelX, pixelY);
        this.ctx.lineTo(pixelX, pixelY+this.cellWidth);
        this.ctx.lineTo(pixelX+this.cellWidth, pixelY+this.cellWidth);
        this.ctx.lineTo(pixelX+this.cellWidth, pixelY);
        this.ctx.lineTo(pixelX, pixelY);
        this.ctx.stroke();
    }

    drawBoard(){
        var i;
        for(i = 0; i<this.cells+1; i++){
            this.ctx.moveTo(this.cellWidth*i, 0);
            this.ctx.lineTo(this.cellWidth*i, this.height);
        }
        for(i =0; i<this.cells+1; i++){
            this.ctx.moveTo(0, this.cellWidth*i);
            this.ctx.lineTo(this.width, this.cellWidth*i);
        }
        this.ctx.stroke();
    }
}
export default Draw;