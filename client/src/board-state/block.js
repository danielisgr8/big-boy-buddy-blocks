class Block {
    constructor(piece, color, user, points) {
        this.piece = piece;
        this.color = color;
        this.finalized = false;
        this.user = user;
        this.points = points;
        this.rotationPoint = null; // TODO: figure this out
    }
}

export default Block;
