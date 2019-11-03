import Point from "./point";

class Block {
    constructor(piece, color, user, points) {
        this.piece = piece;
        this.color = color;
        this.finalized = false;
        this.user = user;
        this.points = points;
        this.setRotationPoint();
    }
    setRotationPoint(){
        if(this.piece === 0){
            this.rotationPoint = this.points[1];
        }
        else if(this.piece === 1){
            this.rotationPoint = null;
        }
        else if(this.piece === 2){
            this.rotationPoint = this.points[1];
        }
        else if(this.piece === 3){
            this.rotationPoint = this.points[1];
        }
        else if(this.piece === 4){
            this.rotationPoint = this.points[1];
        }
    }
}

export default Block;
