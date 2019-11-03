import Point from "./point";
import Block from "./block";

export const movements = {
  left: 0,
  right: 1,
  rotateCW: 2,
  rotateCCW: 3,
  softDrop: 4,
  inPlace: 5,
};

export const blockTypes = {
  I: 0,
  O: 1,
  T: 2,
  S: 3,
  //Z: 4,
  //J: 5,
  L: 6
}

export class BoardState {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.state = new Array(height);
    for(let i = 0; i < height; i++) {
      this.state[i] = new Array(width);
    }
  }

  clear(){
    for(let i = 0; i < this.height; i++) {
      this.state[i] = new Array(this.width);
    }
  }
  /**
   * 
   * @param {*} blockType 
   * @returns {boolean} `true` if you block was added, `false` otherwise
   */
  addBlock(blockType, color, user, smallScreen) {
    //TODO: update documentation
    const points = this.getStartPoints(blockType, smallScreen);
    if(!points) return null;
    const block = new Block(blockType, color, user, points);
    //if(!this.checkCollision(block, movements.inPlace)) return null;
    block.points.forEach((point) => {
      this.state[point.y][point.x] = block;
    });
    return block;
  }

  /**
   * Attempts to move the given block
   * @param {*} block 
   * @param {*} movement 
   * @returns {boolean} `true` if the block was moved, `false` otherwise
   */
  moveBlock(block, movement) {
    if(!this.checkCollision(block, movement)) return false;
    switch(movement) {
      case movements.left:
        block.points.forEach((point) => {
          this.state[point.y][point.x] = null;
          point.x--;
        });
        block.points.forEach((point) => {
          this.state[point.y][point.x] = block;
        });
        break;
      case movements.right:
        block.points.forEach((point) => {
          this.state[point.y][point.x] = null;
          point.x++;
        });
        block.points.forEach((point) => {
          this.state[point.y][point.x] = block;
        });
        break;
        case movements.rotateCW:
          block.points.forEach((point) => {
            this.state[point.y][point.x] = null;
          });
          block.points.forEach((point) => {
            let difx = point.x - block.rotationPoint.x;
            let dify = point.y - block.rotationPoint.y;
            point.x = (dify*(-1)) + block.rotationPoint.x;
            point.y = difx + block.rotationPoint.y;
            this.state[point.y][point.x] = block;
          });
          break;
      case movements.softDrop:
        block.points.forEach((point)=> {
          this.state[point.y][point.x] = null;
          point.y++;
        });
        block.points.forEach((point)=> {
          this.state[point.y][point.x] = block;
        });
        break;
    }
    block.touchedGroundLastTick = false;
    return true;
  }

  /**
   * Checks if the given movement is valid.
   * @param {Block} block 
   * @param {number} movement 
   * @returns {boolean} `true` if the movement is valid, `false` otherwise
   */
  checkCollision(block, movement) {
    switch(movement) {
      case movements.left:
        return block.points.every((point) => {
          const shiftedBlock = this.state[point.y][point.x - 1];
          return point.x > 0 && (!shiftedBlock || shiftedBlock === block);
        });
      case movements.right:
        return block.points.every((point) => {
          const shiftedBlock = this.state[point.y][point.x + 1];
          return point.x < this.width - 1 && (!shiftedBlock || shiftedBlock === block);
        });
      case movements.rotateCW:
        if (block.rotationPoint == null) return false;
         return block.points.every((point) => {
          let difx = point.x - block.rotationPoint.x;
          let dify = point.y - block.rotationPoint.y;
          let phantomX = (dify*(-1)) + block.rotationPoint.x;
          let phantomY = difx + block.rotationPoint.y;
          if(phantomX > this.width - 1 || phantomY > this.height - 1 || phantomX < 0 || phantomY < 0) return false;
          const shiftedBlock = this.state[phantomY][phantomX];
          return (!shiftedBlock || shiftedBlock === block);
         });
        break;
      case movements.softDrop:
        return block.points.every((point)=> {
          if(point.y >= this.height-1){
            return false;
          }
          const shiftedBlock = this.state[point.y + 1][point.x];
          return (!shiftedBlock || shiftedBlock === block);
        });
      case movements.inPlace:
        return block.points.every((point) => {
          const currentBlock = this.state[point.y][point.x];
          return (!currentBlock || currentBlock === block);
        });
        break;
      // TODO: movements.rotateCCW
    }
    return false;
  }

  /**
   * Returns an array of valid start points for the given piece type
   * @param {number} pieceType 
   * @returns {number[]}
   */
  getStartPoints(pieceType, queued) {
    const points = [];
    let xs, ys;
    let rand = Math.floor((Math.random() * 29));
    if(queued) rand = 0;
    switch(pieceType) {
      case blockTypes.I:
        xs = [0+rand, 0+rand, 0+rand, 0+rand];
        ys = [0, 1, 2, 3];
        xs.forEach((_el, i) => {
          points.push(new Point(xs[i], ys[i]));
        });
        break;
      case blockTypes.O:
        xs = [0+rand, 0+rand, 1+rand, 1+rand];
        ys = [0, 1, 0, 1];
        xs.forEach((_el, i) => {
          points.push(new Point(xs[i], ys[i]));
        });
        break;
      case blockTypes.L:
        xs = [0+rand, 0+rand, 0+rand, 1+rand];
        ys = [0, 1, 2, 2];
        xs.forEach((_el, i) => {
          points.push(new Point(xs[i], ys[i]));
        });
        break;
      case blockTypes.S:
        xs = [0+rand, 0+rand, 1+rand, 1+rand];
        ys = [0, 1, 1, 2];
        xs.forEach((_el, i) => {
          points.push(new Point(xs[i], ys[i]));
        });
        break;
      case blockTypes.T:
        xs = [0+rand, 0+rand, 0+rand, 1+rand];
        ys = [0, 1, 2, 1];
        xs.forEach((_el, i) => {
          points.push(new Point(xs[i], ys[i]));
        });
        break;
    }

    return points;
  }

  checkIfFinal(block) {
    const touchingGroundThisTick = block.points.some((point) => {
      return point.y >= this.height - 1 || (point.y <= this.height - 1 && this.state[point.y + 1][point.x]);
    });
    const final = touchingGroundThisTick && block.touchedGroundLastTick;
    block.touchedGroundLastTick = touchingGroundThisTick;
    return final;
  }

  getRandomType() {
    const blockTypesArr = Object.keys(blockTypes);
    const index = Math.floor(Math.random() * blockTypesArr.length);
    return blockTypes[blockTypesArr[index]];
  }
}
