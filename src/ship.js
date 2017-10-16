/** @class Ship
*
*
**/
export default class Ship{
  constructor(screenWidth, screenHeight){
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.x = screenWidth / 2;
    this.y = screenHeight / 2;
    this.angle = -90;
    this.health = 3;
  }

  // Updates the ship
  update(){
    this.x += Math.cos(this.angle);
    this.y += Math.sin(this.angle);

    //Handle rotate

    // Screen wrap
    this.checkBounds();
  }

  // Check ships position and wraps around when hitting boundaries
  checkBounds(){
    if(this.x < 0){
      this.x = this.screenWidth;
    }
    else if(this.x > this.screenWidth){
      this.x = 0;
    }

    if(this.y < 0){
      this.y = this.screenHeight;
    }
    else if(this.y > this.screenHeight){
      this.y = 0;
    }
  }

  shoot(){

  }

  // Render the ship on the canvas
  render(ctx){
    ctx.save();
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.rotate(this.angle);
    ctx.translate(this.x, this.y);
    ctx.moveTo(0, -5);
    ctx.lineTo(2, 5);
    ctx.lineTo (2, -5);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}
