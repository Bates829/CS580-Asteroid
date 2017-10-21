import Ship from './ship';
import Asteroid from './asteroid';
import Bullet from './bullet';

/** @class game
* Creates the game and its objects
**/
export default class Game{
  constructor(){
    this.input = {
      direction: ''
    }
    this.score = 0;
    this.gameover = false;
    this.shipHealth = 3;

    //Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.width = 500;
    this.canvas.height = 500;
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);

    //Create ship and bullets
    this.ship = new Ship(this.canvas.width, this.canvas.height);
    this.bullets = [];
    this.shot = false;
    this.round = 1;

    //Create asteroids
    this.asteroids = [];
    this.amount = 9;
    for(var i = 0; i < this.amount; i++){
      this.asteroid = new Asteroid(this.canvas.width, this.canvas.height, 0, 0, 0, 0, 'largeAsteroid');
      this.asteroids.push(this.asteroid);
    }

    //Game sounds
    var shipSound = document.createElement('audio');
    shipSound.id = 'shipSound';
    shipSound.type = 'audio/wav';
    shipSound.src = 'Explosion.wav';
    document.body.appendChild(shipSound);

    var bulletSound = document.createElement('audio');
    bulletSound.id = 'bulletSound';
    bulletSound.type = 'audio/wav';
    bulletSound.src = 'Bullet.wav';
    document.body.appendChild(bulletSound);

    var collisionSound = document.createElement('audio');
    collisionSound.id = 'collisionSound';
    collisionSound.type = 'audo/wav';
    collisionSound.src = 'Collision.wav';
    document.body.appendChild(collisionSound);

    //Bind functions
    this.shipHit = this.shipHit.bind(this);
    this.bulletHit = this.bulletHit.bind(this);
    this.asteroidHit = this.asteroidHit.bind(this);
    this.shipDestroyed = this.shipDestroyed.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.nextRound = this.nextRound.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
    this.loop = this.loop.bind(this);

    window.onkeydown = this.handleKeyDown;
    window.onkeyup = this.handleKeyUp;

    setInterval(this.loop, 10);
  }


  // Handle a key press to move ship
  handleKeyDown(event){
    event.preventDefault();
    switch(event.key){
      case "w":
      case 'ArrowUp':
        //w key Move up
        this.input.direction = 'forward'
        break;
      case "a":
      case 'ArrowLeft':
        //a key rotate left
        this.input.direction = 'rotateLeft';
        break;
      case "d":
      case 'ArrowRight':
        //d key rotate right
        this.input.direction = 'rotateRight';
        break;
      case " ":
        //space shoot bullet
        this.shot = true;
        break;
      default:
        break;
    }
  }


  // Handle a key release
  handleKeyUp(event){
    event.preventDefault();
    switch(event.key){
      //W key: move forward
      case 'w':
      case 'ArrowUp':
        this.input.direction = 'stop';
        break;
      //A key: rotate left
      case 'a':
      case 'ArrowLeft':
        this.input.direction = 'stopLeftRotate';
        break;
      //D key: rotate right
      case 'd':
      case 'ArrowRight':
        this.input.direction = 'stopRightRotate';
        break;
      //Space key: shoot bullet
      case " ":
        this.shot = false;
        break;
      default:
        break;
    }
  }

  //Draw controls to canvas
  drawControls(){
    this.ctx.fillStyle = 'green';
    this.ctx.font = 'bold 12px sans serif';
    this.ctx.fillText("Forward: W/↑ | Turn Right: D/→ | Turn Left: A/← | Shoot: SpaceBar", 5, 15);
  }

  //Draw player info to canvas
  drawInfo(){
    this.ctx.fillStyle = "green";
    this.ctx.font = "bold 14px sans serif";
    this.ctx.fillText('Health: ' + this.shipHealth, 5, 495);
    this.ctx.fillText('Round: ' + this.round, 75, 495);
    this.ctx.fillText('Score: ' + this.score, 145, 495);
  }

  //Game over message
  gameOver(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "green";
    this.ctx.font = 'bold 30px sans serif';
    this.ctx.fillText("GAME OVER!", 150, 250);
    this.ctx.fillText("Your Final Score: " + this.score , 110, 300);
  }

  //Checks if new round should start
  newRound(){
    var numAsteroids = this.asteroids.length;
    var empty = true;
    for(var i = 0; i < numAsteroids; i++){
      if(this.asteroids[i].health > 0){
        empty = false;
        break;
      }
    }
    if(empty) {this.nextRound(); }
  }

  //Starts a new round
  nextRound(){
    if(this.shipHealth === 0 ){
      this.gameOver = true;
    }
    else{
      this.round += 1;
      this.amount += 5;
      for(var i = 0; i < this.amount; i++){
        this.asteroid = new Asteroid(this.canvas.width, this.canvas.height, 0, 0, 0, 0, 'largeAsteroid');
        this.asteroids.push(this.asteroid);
      }
    }
  }

  //Checks if the ship is out of health or died
  shipDestroyed(){
    if(this.shipHealth === 0){
      this.gameover = true;
    }
    else{
      this.ship = new Ship(this.canvas.width, this.canvas.height);
      this.bullets = [];
      this.shipHealth -= 1;
      var shipSound = document.getElementById('shipSound');
      shipSound.play();
    }
  }

  //Checks if ship is hit by an asteroid
  shipHit(){
    var hit = false;
    var numAsteroids = this.asteroids.length;
    for(var i = 0; i < numAsteroids; i++){
      var current = this.asteroids[i];
      if(current.health < 1) continue;
      if(current.x > this.ship.x - 22 && current.x < this.ship.x + 22){
          if(current.y > this.ship.y - 23 && current.y < this.ship.y + 23){
            hit = true;
            break;
        }
      }
    }

    //Destory ship
    if(hit){this.shipDestroyed();}
    else {this.ship.update(this.input);}
  }

  //Checks if asteroids hit each other
  asteroidHit(){
    var numAsteroids = this.asteroids.length;
    for(var i = 0; i < numAsteroids; i++){
      var current = this.asteroids[i];
      if(current.health < 1) continue;
      var hit = false
      for(var j = 0; j < numAsteroids; j++){
        if(i !== j){
          var newAsteroid = this.asteroids[i];
          if(newAsteroid.health < 1) continue;
          if(current.x > newAsteroid.x && current.x < newAsteroid.x){
              if(current.y > newAsteroid.y && current.y < newAsteroid.y)
              {
                hit = true;
                var collisionSound = document.getElementById('collisionSound');
                collisionSound.play();
              }
          }
        }
      }
      this.asteroids[i].update(hit, false, false);
    }
  }

  //Checks if bullet hits an asteroid
  bulletHit(){
    if(this.shot){
      var bullet = new Bullet(this.canvas.width, this.canvas.height);
      this.bullets.push(bullet);
      var bulletSound = document.getElementById('bulletSound');
      bulletSound.play();
    }

    var numBullets = this.bullets.length;
    var numAsteroids = this.asteroids.length;

    for(var b = 0; b < numBullets; b++){
      var currBullet = this.bullets[b];
      var hit = false;
      var destroy = false;
      var splitAsteroid = null;
      var splitAsteroid2 = null;
      if(currBullet.hit) {continue;}
      for(var i = 0; i < numAsteroids; i++){
        var currAsteroid = this.asteroids[i];
        //console.log(currAsteroid.x);
        //console.log(currBullet.x);
        if(currAsteroid.health < 1 ) {continue;}
        if(currAsteroid.x >= currBullet.x - 15 && currAsteroid.x <= currBullet.x + 15){
           if(currAsteroid.y <= currBullet.y + 20 &&  currAsteroid.y >= currBullet.y - 20){
               hit = true;
               var shipSound = document.getElementById('shipSound');
               shipSound.play();
               currAsteroid.update(false, false, true);
               if(currAsteroid.size === "smallAsteroid" && currAsteroid.health < 1){
                 this.score += 5;
               }
            if(currAsteroid.size === "largeAsteroid" && currAsteroid.health < 1){
              this.score += 3;
              destroy = true;
              var splitX = currAsteroid.x;
              var splitY = currAsteroid.y;
              var splitSpeed = currAsteroid.speed * 0.85;
              var splitAngle = Math.random() * 10;
              var splitAngle2 = splitAngle * 0.25;
              splitAsteroid = new Asteroid(this.canvas.width, this.canvas.height, splitX, splitY, splitSpeed, splitAngle, 'smallAsteroid');
              splitAsteroid2 = new Asteroid(this.canvas.width, this.canvas.height, splitX, splitY, splitSpeed, splitAngle2, 'smallAsteroid');
            }
        }
        }
      }
      if(destroy){
        //Push smaller asteroids
        this.asteroids.push(splitAsteroid);
        this.asteroids.push(splitAsteroid2);
      }
      this.bullets[b].update(this.ship.x, this.ship.y, this.ship.angle, hit);
    }
  }

  //Updates the game
  update(){
    this.shipHit();
    this.asteroidHit();
    this.bulletHit();
    this.newRound();
  }

  //Renders objects to canvas
  render(){
    //Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //Render ship and bullets
    this.ship.render(this.ctx);

    var numBullets = this.bullets.length;
    for(var j = 0; j < numBullets; j++){
      if(this.bullets[j].hit) {continue;}
      this.bullets[j].render(this.ctx);
    }

    //Render asteroids
    var numAsteroids = this.asteroids.length;
    for(var i = 0; i < numAsteroids; i++){
      if(this.asteroids[i].health < 1) {continue;}
      this.asteroids[i].render(this.ctx);
    }

    this.drawInfo();
    this.drawControls();
  }

  //Game loop
  loop(){
    if(this.gameover){
      this.gameOver();
    }
    else{
      this.update();
      this.render();
    }
  }
}
