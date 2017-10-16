/** @class asteroid
*
*
**/
export default class Asteroid{
  constructor(){
    this.startAsteroids = 4;
    this.maxAsteroids = 20;
    this.increment = 2;
    this.asteroidLarge = {
      minVelocity: 50,
      maxVelocity: 150,
      minAngVelocity: 0,
      maxAngVelocity: 200,
      score: 20
    }
    this.asteroidMedium = {
      minVelocity: 50,
      maxVelocity: 150,
      minAngVelocity: 0,
      maxAngVelocity: 200,
      score: 50
    }
    this.asteroidSmall = {
      minVelocity: 50,
      maxVelocity: 150,
      minAngVelocity: 0,
      maxAngVelocity: 200,
      score: 100
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

  update(){
    this.checkBounds()
    //Move asteroids
  }

  // Render asteroids to the canvas
  render(ctx){

  }
}
