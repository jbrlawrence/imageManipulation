console.log("my first physics simulation");

const ctx = document.getElementById("myCanvas").getContext("2d");
console.log(ctx);
const GRAVITY = .01;
//200, 100, 2, -2, 0, GRAVITY, 20
class Particle {
  constructor(x, y, x_v, y_v, x_a, y_a, size) {
    this.x = x;
    this.y = y;
    this.x_v = x_v;
    this.y_v = y_v;
    this.x_a = x_a;
    this.y_a = y_a;
    this.size = size;
    this.run = true;
    this.m = this.size * this.size * this.size;
    // add properties and set them to inputs here
    // needed properties x, y, x_v, y_v,
  }

  draw() {
    //  console.log(ctx)
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.strokeStyle = "blue"
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }
  // add draw method here, use properties and an input that gives the rendering context
  move() {
    this.x = this.x + this.x_v;
    this.y = this.y + this.y_v;

    this.x_v = this.x_v + this.x_a;
    this.y_v = this.y_v + this.y_a;

  }
  bounce() {
    if (this.y > 500) {
      this.y_v = -.9 * Math.abs(this.y_v);
    }
    if (this.x > 500) {
      this.x_v = -1 * Math.abs(this.x_v);
    }
    if (this.x < 0) {
      this.x_v = Math.abs(this.x_v);
    }
  }
  collide(other) {
    

    let distance_squared = (this.x - other.x) * (this.x - other.x) + (this.y - other.y) * (this.y - other.y);
    if (distance_squared < (this.size + other.size) * (this.size + other.size)) {
      console.log("oh no!");
      console.dir(JSON.parse(JSON.stringify(this)));
      console.dir(JSON.parse(JSON.stringify(other)));
      this.run = false;
      other.run = false;
      // Calculating constant C
      let sumMass = this.m + other.m;
      let elasticConstant = 2 / (sumMass * distance_squared);
      
      // for particle 1
      let delX = this.x - other.x;
      let delY = this.y - other.y;
      let delXV = this.x_v - other.x_v;
      let delYV = this.y_v - other.y_v;
      // new x velocity
      this.x_v = this.x_v - elasticConstant * other.m * (delXV * delX + delYV * delY) * delX;
      // new y velocity
      this.y_v = this.y_v - elasticConstant * other.m * (delXV * delX + delYV * delY) * delY;

      // for particle 2, displacements reversed
      delX = -1 * delX;
      delY = -1 * delY;
      delXV = -1 * delXV;
      delYV = -1 * delYV;
      // new x velocity
      other.x_v = other.x_v - elasticConstant * this.m * (delXV * delX + delYV * delY) * delX;
      // new y velocity
      other.y_v = other.y_v - elasticConstant * this.m * (delXV * delX + delYV * delY) * delY;

      
    }


  }
  // use x, y, size to draw using canvas context methods
  /// add move method here, math is x = x+x_v, x_v = x_v + x_a (same for y)
}

let myPart = new Particle(200, 100, 2, -2.2, 0, GRAVITY, 40);
let part2 = new Particle(100, 100, -1, -1.9, 0, GRAVITY, 20);

let parts = [];

//function triggered by loading page
function setup() {
   for (let i = 0; i < 10; i++){
     parts.push(new Particle(i*30,100,Math.random()*2-1,-1*Math.random(),0,GRAVITY,5+Math.random()*10));
   }
  console.log(myPart.x);
  myPart.draw();
  // activating an animation (runs over and over)
  window.requestAnimationFrame(draw);
}

let counter = 0;

function draw() {
  ctx.clearRect(0, 0, 500, 500);
  counter++;
  // if (true){
  // myPart.move();
  // myPart.draw();
  // myPart.bounce();
  // part2.move();
  // part2.draw();
  // part2.bounce();
  // part2.collide(myPart);}
  for (let i = 0; i<parts.length; i = i+1){
    parts[i].move();
    parts[i].draw();
    parts[i].bounce();
    for (let j = i+1; j<parts.length; j++){
      parts[i].collide(parts[j]);
    }

  }

  // console.log(counter);
  window.requestAnimationFrame(draw);
}
