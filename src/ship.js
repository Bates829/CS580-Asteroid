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
    this.direction = '';
  }

  // Updates the ship
  update(input){
    this.direction = input.direction;
    switch(this.direction){
      case 'forward':
        this.x += Math.cos(this.angle);
        this.y += Math.sin(this.angle);
        break;
      case 'rotateLeft':
        this.angle -= 0.05;
        break;
      case 'rotateRight':
        this.angle += 0.05;
        break;
      case 'stop':
        this.x += 0;
        this.y += 0;
        break;
      case 'stopRightRotate':
        this.angle += 0;
        break;
      case 'stopLeftRotate':
        this.angle -= 0;
        break;
      default:
        break;
    }

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

  // Render the ship on the canvas
  render(ctx){
    ctx.save();
    ctx.strokeStyle = 'green';
    ctx.fillStyle = 'green';
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.moveTo(15, 0);
    ctx.lineTo(-5, -10);
    ctx.lineTo(-10, 0);
    ctx.lineTo(-5, 10);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
