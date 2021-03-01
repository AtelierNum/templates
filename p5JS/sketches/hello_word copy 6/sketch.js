function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255)
}

function draw() {
  if (mouseIsPressed) {
    fill(255);
  } else {
    fill(0);
  }
  ellipse(mouseX, mouseY, 80, 80);
}