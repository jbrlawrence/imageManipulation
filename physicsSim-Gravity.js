console.log("my first physics simulation");
const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
console.log(ctx);
const G = .1;
let canvasScale = 1;
 
document.body.addEventListener("keydown", (e) => {
  
      shifter(e.key);

 
    console.log(`Key "${e.key}" repeating [event: keydown]`);
  
});

function shifter(keyCode){
  ctx.scale(1,1);
  ctx.fillStyle = "rgb(0,0,0)"
  
  ctx.fillRect(0,0,canvas.width, canvas.height);
  console.log(keyCode)
  let shiftSize = 10;
  if (keyCode === "ArrowUp"){
    for (let i in parts){
      parts[i].y = parts[i].y + shiftSize;
    }

  }
  if (keyCode === "ArrowDown"){
    for (let i in parts){
      parts[i].y = parts[i].y - shiftSize;
    }

  }
  if (keyCode === "ArrowLeft"){
    for (let i in parts){
      parts[i].x = parts[i].x + shiftSize;
    }

  }
  if (keyCode === "ArrowRight"){
    for (let i in parts){
      parts[i].x = parts[i].x - shiftSize;
    }

  }
  if (keyCode === "i"){
    canvasScale = canvasScale*1.1;
    console.log(canvasScale);
    ctx.scale(1.1,1.1);
    // let shiftX = (canvas.width/2)*(1-1/canvasScale);
    // let shiftY = (canvas.height/2)*(1-1/canvasScale);
    // ctx.translate(shiftX,shiftY);
  }
  if (keyCode === "o"){
    canvasScale = canvasScale*0.9;
    console.log(canvasScale);
    ctx.scale(0.9,0.9);
    let shiftX = (canvas.width/2)*(1-1/0.9);
    let shiftY = (canvas.height/2)*(1-1/0.9);
    // ctx.translate(shiftX,shiftY);
  }
  if (keyCode === "0"){
    canvasScale = 1/canvasScale;
    console.log(canvasScale);
    ctx.scale(0.9,0.9);
    // let shiftX = (canvas.width/2)*(1-1/0.9);
    // let shiftY = (canvas.height/2)*(1-1/0.9);
    // // ctx.translate(shiftX,shiftY);
  }
 
  // ctx.clearRect(0, 0, 500, 500);

}


class Particle {
  constructor(x, y, x_v, y_v, size) {
    this.x = x;
    this.y = y;
    this.x_v = x_v;
    this.y_v = y_v;
    this.x_a = 0;
    this.y_a = 0;
    this.size = size;
    // setting mass to be proportional the cube of the size
    this.mass = this.size * this.size * this.size;
    // add properties and set them to inputs here
    // needed properties x, y, x_v, y_v,
  }

  draw() {
    //  console.log(ctx)
    ctx.beginPath();
    ctx.fillStyle = `hsl(${250-this.size*20},100%,50%)`;
    ctx.strokeStyle = "white"
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }
  // add draw method here, use properties and an input that gives the rendering context
  move() {

    this.x_v = this.x_v + this.x_a;
    this.y_v = this.y_v + this.y_a;
    this.x = this.x + this.x_v;
    this.y = this.y + this.y_v;
    // setting acceleration to 0 to allow addition from attract method.
    this.x_a = 0;
    this.y_a = 0;
  }
  attract(otherParticle) {
    let x_dist = otherParticle.x - this.x;
    let y_dist = otherParticle.y - this.y;
    let dist = Math.pow(x_dist * x_dist + y_dist * y_dist, 0.5);
    let x_factor = G * (x_dist) / (dist * dist * dist);
    let y_factor = G * (y_dist) / (dist * dist * dist);

    this.x_a += x_factor * otherParticle.mass;
    this.y_a += y_factor * otherParticle.mass;

    otherParticle.x_a += -1 * x_factor * this.mass;
    otherParticle.y_a += -1 * y_factor * this.mass;

    if (dist < this.size+otherParticle.size){
      let initialmomentumX = this.x_v*this.mass + otherParticle.x_v*otherParticle.mass;
      let initialmomentumY = this.y_v*this.mass + otherParticle.y_v*otherParticle.mass;

      if (this.size > otherParticle.size){
        this.mass = this.mass + otherParticle.mass;
        this.x_v = initialmomentumX/this.mass;
        this.y_v = initialmomentumY/this.mass;
        this.size = Math.pow(this.mass, 1/3);

        otherParticle.mass = 0;
        otherParticle.size = 0;
      }
      else{
        otherParticle.mass = this.mass + otherParticle.mass;
        otherParticle.x_v = initialmomentumX/otherParticle.mass;
        otherParticle.y_v = initialmomentumY/otherParticle.mass;
        otherParticle.size = Math.pow(otherParticle.mass, 1/3);
        this.mass = 0;
        this.size = 0;
      }

    }
  }

  // use x, y, size to draw using canvas context methods
  /// add move method here, math is x = x+x_v, x_v = x_v + x_a (same for y)
}


// let parts = [];

//function triggered by loading page
function setup() {
  let centerX = canvas.width/2;
  let centerY = canvas.height/2
  let spread = 1000;
  let number = 4000;
  ctx.fillStyle = "rgba(0,0,0,1)"
  ctx.fillRect(0,0,window.innerWidth, window.innerHeight);
  for (let i = 0; i < number; i++) {
    let r = Math.sqrt(Math.random())*spread;
    let dir = Math.random()*Math.PI*2;



    let x = centerX + r*Math.cos(dir);
    let y = centerY + r*Math.sin(dir);
    console.log(`${r} and ${dir} is ${x} and ${y}`);
    
    parts.push(new Particle(x, y,Math.random()*.1-0.05, Math.random()*.1-0.05  , 1));
  }
  //   console.log(myPart.x);

  // activating an animation (runs over and over)
  window.requestAnimationFrame(draw);
}

let counter = 0;
// let p1 = new Particle(300, 300, 0, 0, 30);
// let p2 = new Particle(500, 200, 1, 3, 5);
// let p3 = new Particle(600, 400, 2, 2, 3);
let parts = [];

function draw() {
 
  ctx.fillStyle = "rgba(0,0,0,0.1)"
  ctx.fillRect(0,0,canvas.width, canvas.height);
  // ctx.scale(canvasScale,canvasScale);
  // ctx.clearRect(0, 0, 500, 500);

  for (let i = 0; i < parts.length; i = i + 1) {
    for (let j = i + 1; j < parts.length; j = j + 1) {
      if (parts[i].size > 0 && parts[j].size >0){
      parts[i].attract(parts[j]);}
    }
  }


  for (let i = 0; i < parts.length; i = i + 1) {
    parts[i].move();
    parts[i].draw();
  }
  // p1.attract(p2);
  // p1.attract(p3);
  // p2.attract(p3);
  // p1.move();
  // p1.draw();
  // p2.move();
  // p2.draw();
  // p3.move();
  // p3.draw();


  window.requestAnimationFrame(draw);
}
