
let x, y; 
let currentangle = 0; 
let step = 6; 
let angle = 74;
let isTimeToDraw = false;

let cnv;

// LINDENMAYER STUFF (L-SYSTEMS)
let thestring = 'M'; // "axiom" or start of the string

// How many generations of the alphabet we have
let generations = 5;
let rules = new Map();

rules.set('M', 'M-M-M++M+M-M');

let whereinstring = 0; // where in the L-system are we?



function setup() {
  const parentDiv = document.getElementById('container').getBoundingClientRect()
  cnv = createCanvas(parentDiv.width, parentDiv.height);
  cnv.parent('container');
  cnv.background(255);

  stroke(0, 0, 0, 255);

  // start the x and y position at lower-left corner
  x = width / 2;
  y = height - height / 2;

  // COMPUTE THE L-SYSTEM
  for (let i = 0; i < generations; i++) {
    thestring = lindenmayer(thestring);
  }
  console.log(thestring);
  console.log(thestring.length);
  drawTree(thestring);
}

function draw() {
  if (isTimeToDraw) {
    drawRealTime(thestring[whereinstring]);
    // increment the point for where we're reading the string.
    // wrap around at the end.
    whereinstring++;
    if (whereinstring > thestring.length - 1) {
      whereinstring = 0;
      // console.log('Real time chegou ao fim');
      noLoop();
    }
  }
}

function drawTree(outputstring) {
  resetMatrix();
  translate(width / 2, height);

  for (let letter of outputstring) {
    if (letter == 'M') {
      line(0, 0, 0, -step);
      let r = random(198, 200);
      let g = random(50, 217);
      let b = random(0, 50);
      let a = random(50, 100);

      let radius = 0;
      radius += random(0, 8);
      radius += random(0, 8);
      radius += random(0, 8);
      radius = radius / 3;

      fill(r, g, b, a);

      ellipse(0, -step, radius, radius);
      translate(0, -step);
    } else if (letter == '+') {
      rotate(radians(angle));
    } else if (letter == '-') {
      rotate(radians(-angle));
    } else if (letter == '[') {
      push();
    } else if (letter == ']') {
      pop();
    }
  }
}

