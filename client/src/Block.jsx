import Draw from './Draw'


class Block{

    constructor(piece, color, user){
        this.piece = piece;
        this.color = color;
        this.finalized = false;
        this.user = user;
        this.points = null;
    }
    initializePoints(){
        if(this.piece == 1){
            this.points = [(0,0),(0,1),(0,2),(0,3)]
        }
        else if(this.piece == 2){
            this.points = [(0,0),(0,1),(1,1),(1,0)]
        }
        else if(this.piece == 3){
            this.points = [(0,0),(0,1),(0,2),(1,2)]
        }
        else if(this.piece == 4){
            this.points = [(0,0),(0,1),(1,1),(1,2)]
        }
        else if(this.piece == 5){
            this.points = [(0,0),(0,1),(0,2),(1,1)]
        }
    }

}