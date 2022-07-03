/// <reference path="../TSDef/p5.global-mode.d.ts" />

"use strict";

//Constants
const rho = 28,
  sigma = 10,
  beta = 8 / 3;

//Positions
const x = 0.8,
  y = 0,
  z = 0;

//Holds all Vectors
let allPositions = [];

let slider;

function setup() {



  createCanvas(650, 650, WEBGL);
  noFill();

  //DX-Slider
  slider = createSlider(0.005, 0.01, 0.008, 0);
  slider.position(10, 10);
  slider.style('width', '80px');
  slider.mouseReleased(initAnimation);

  initAnimation();

  createEasyCam();
}

function draw() {

  background(0);

  translate(0, 0, -80);

  //Calculates next Position
  calcNextPos(allPositions[allPositions.length - 1]);

  scale(6) //Scale drawing bigger

  //Draw Line
  stroke(0, 200, 0);
  beginShape();
  allPositions.forEach(v => vertex(v.x, v.y, v.z))
  endShape();

  //Draw Dot
  stroke(0, 255, 0);
  translate(allPositions[allPositions.length - 1].x, allPositions[allPositions.length - 1].y, allPositions[allPositions.length - 1].z)
  sphere(0.5);
}

//Initializes & Resets the Animation
function initAnimation() {
  allPositions = [];
  //Initial Vector
  allPositions.push(createVector(x, y, z));
}

//Calculates the next X, Y and Z Coordinates
function calcNextPos(v) {

  //Calculate the Difference from the current to the next Point
  const diffX = (sigma * (v.y - v.x)) * slider.value();
  const diffY = (v.x * (rho - v.z) - v.y) * slider.value();
  const diffZ = ((v.x * v.y) - (beta * v.z)) * slider.value();

  //Create a new Vector(X,Y,Z) by adding the calculated Differences to the current Vector
  allPositions.push(createVector(v.x + diffX, v.y + diffY, v.z + diffZ));
}