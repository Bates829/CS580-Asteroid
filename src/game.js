import Ship from './ship';
import Asteroid from './asteroid';
import Bullet from './bullet';

/** @class game
*
*
**/
export default class Game{
  constructor(){
    //Get all the objects

    //Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.width = 300;
    this.canvas.height = 300;
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);

    //Create ship and bullets
    this.ship = new Ship(this.canvas.width, this.canvas.height);
    this.bullets = [];

    //Create asteroids
    this.asteroids = [];
    for(var i = 0; i < 10; i++){
      var asteroid = new Asteroid(this.canvas.width, this.canvas.height);
      this.asteroids.push(asteroid);
    }
    //Bind functions
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.loop = this.loop.bind(this);

    window.onkeydown = this.handleKeyDown;
    window.onkeyup = this.handleKeyUp;

    setInterval(this.loop, 1);
  }


  // Handle a key press to move ship
  handleKeyDown(event){
    event.preventDefault();
    switch(event.keyCode){
      case 87:
        //w key Move up
        break;
      case 83:
        //s key move down
        break;
      case 65:
        //a key rotate left
        break;
      case 68:
        //d key rotate right
        break;
      case 32:
        //space shoot bullet
    }
  }

  // Handle a key release
  handleKeyUp(event){
    event.preventDefault();
    switch(event.keyCode){
      case 87:
        //w key Move up
        break;
      case 83:
        //s key move down
        break;
      case 65:
        //a key rotate left
        break;
      case 68:
        //d key rotate right
        break;
      case 32:
        //space shoot bullet
    }
  }

  update(){
    //Handle collison

    var numAsteroids = this.asteroids.length;
    for(var i = 0; i < numAsteroids; i++){
      var current = this.asteroids[i];
      if(current.health < 1){continue};
      //Check if asteroids hits ship

      //If ship is hit destroy it otherwise update ship

      for(var i = 0; i < numAsteroids; i++){
        var current = this.asteroids[i];
        if(current.health < 1) continue;
        //Check if asteroid is hit by bullet

      }

      //Check if bullets are hitting asteroids
    }
  }

  render(){
    //Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //Render ship
    this.ship.render(this.ctx);

    //Render asteroids
    var num = this.asteroids.length;
    for(var i = 0; i < num; i++){
      this.asteroids[i].render(this.ctx);
    }
    //Render bullets

  }

  loop(){
    this.update();
    this.render();
  }
}
