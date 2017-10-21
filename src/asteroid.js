/** @class asteroid
*
*
**/
export default class Asteroid{
  constructor(screenWidth, screenHeight, x, y, speed, angle, size){
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.size = size;
    this.health = 25;
    if (this.size === "smallAsteroid"){
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.angle = angle;
    }
    else{
      this.x = Math.random() * screenWidth;
      this.y = Math.random() * screenHeight;

      if(this.x > (this.screenWidth / 2) - 30 && this.x < (this.screenWidth / 2) + 30){
         if(this.y > (this.screenHeight / 2) - 30 && this.y < (this.screenHeight / 2) + 30){
           this.x = this.screenWidth / 4;
           this.y = this.screenHeight / 4;
         }
      }
     this.speed = Math.random() * 0.5;
     this.angle = Math.random() * 25;
    }
  }


  checkBounds(screenWidth, screenHeight){
    if(this.x < 0){
      this.x = screenWidth;
    }
    else if(this.x > screenWidth){
      this.x = 0;
    }

    if(this.y < 0){
      this.y = screenHeight;
    }
    else if(this.y > screenHeight){
      this.y = 0;
    }
  }

  update(collide, shipHit, bulletHit){
    if(collide) {
      this.angle *= 1;
    }
    if(shipHit) {
      this.health = 0;
    }
    if(bulletHit) {
      this.health -= 1;
    }

    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed *  Math.sin(this.angle);

    this.checkBounds(this.screenWidth, this.screenHeight)
  }

  // Render asteroids to the canvas
  render(ctx){
    ctx.save();
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'grey';
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    if (this.size === 'smallAsteroid')
    {
      ctx.moveTo(0, -10);
      ctx.lineTo(-10, 0);
      ctx.lineTo(-10, 10);
      ctx.lineTo(5, 25);
      ctx.lineTo(10, 5);
      ctx.lineTo(3, -3);
    }
    else
    {
      ctx.moveTo(0, -10);
      ctx.lineTo(-25, 0);
      ctx.lineTo(-20, 20);
      ctx.lineTo(5, 50);
      ctx.lineTo(15, 20);
      ctx.lineTo(5, 5);
      ctx.lineTo(8, -8);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }
}
