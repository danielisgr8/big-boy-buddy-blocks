import Point from "./point";
import {blockTypes} from './board-state';

class Block {
    constructor(piece, color, user, points) {
        this.piece = piece;
        this.color = color;
        this.finalized = false;
        this.user = user;
        this.points = points;
        this.setRotationPoint();
        this.touchedGroundLastTick = false;
    }

    setRotationPoint(){
        if(this.piece === blockTypes.I){
            this.rotationPoint = this.points[1];
        }
        else if(this.piece === blockTypes.O){
            this.rotationPoint = null;
        }
        else if(this.piece === blockTypes.T){
            this.rotationPoint = this.points[1];
        }
        else if(this.piece === blockTypes.S){
            this.rotationPoint = this.points[1];
        }
        else if(this.piece === blockTypes.L){
            this.rotationPoint = this.points[1];
        }
    }
}

export default Block;
