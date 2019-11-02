import React from 'react';
import './DrawObject.css';


export default class Object1 extends React.Component {

    componentDidMount() {
        const canvas = this.refs.object1
        const ctx = canvas.getContext("2d")
        drawObject(this.props.drawing, ctx)
      }
     
      render(){
        return (
         <div>
         <canvas ref="object1" width={120} height={160} className="canvas"/>
        </div>);
      }
      
}
function drawObject(drawing, ctx){
  if(drawing == 1){
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 160);
    ctx.lineTo(40, 160);
    ctx.lineTo(40, 0);
    ctx.lineTo(0, 0);
    ctx.moveTo(0, 40);
    ctx.lineTo(40, 40);
    ctx.moveTo(0, 80);
    ctx.lineTo(40, 80);
    ctx.moveTo(0, 120);
    ctx.lineTo(40, 120);
    ctx.stroke();
  }
  if(drawing == 2){
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 80);
    ctx.lineTo(80, 80);
    ctx.lineTo(80, 0);
    ctx.lineTo(0, 0);
    ctx.moveTo(0, 40);
    ctx.lineTo(80, 40);
    ctx.moveTo(40, 0);
    ctx.lineTo(40, 80);
    ctx.stroke();
  }
  if(drawing == 3){
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 120);
    ctx.lineTo(80, 120);
    ctx.lineTo(80, 80);
    ctx.lineTo(40, 80);
    ctx.lineTo(40, 0);
    ctx.lineTo(0, 0);
    ctx.moveTo(0, 40);
    ctx.lineTo(40, 40);
    ctx.moveTo(0, 80);
    ctx.lineTo(40, 80);
    ctx.lineTo(40, 120);
    ctx.stroke();
  }
  if(drawing == 4){
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 80);
    ctx.lineTo(40, 80);
    ctx.lineTo(40, 120);
    ctx.lineTo(80, 120);
    ctx.lineTo(80, 40);
    ctx.lineTo(40, 40);
    ctx.lineTo(40, 0);
    ctx.lineTo(0, 0);
    ctx.moveTo(0, 40);
    ctx.lineTo(40, 40);
    ctx.lineTo(40, 80);
    ctx.lineTo(80, 80);
    ctx.stroke();
  }
  if(drawing == 5){
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 120);
    ctx.lineTo(40, 120);
    ctx.lineTo(40, 80);
    ctx.lineTo(80, 80);
    ctx.lineTo(80, 40);
    ctx.lineTo(40, 40);
    ctx.lineTo(40, 0);
    ctx.lineTo(0, 0);
    ctx.moveTo(0, 40);
    ctx.lineTo(40, 40);
    ctx.lineTo(40, 80);
    ctx.lineTo(0, 80);
    ctx.stroke();
  }
} 