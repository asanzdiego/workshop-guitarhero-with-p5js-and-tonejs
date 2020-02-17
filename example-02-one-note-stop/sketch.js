let synth;
let y = 0;
let speed = 10;
let isPressed = false;

function setup() {

  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas = createCanvas(width, height);
  synth = new Tone.Synth().toMaster();
}

function draw() {
  
  if (Tone.context.state != 'running') {
    Tone.start();
  }

  background(255)
  line(0, height / 2, width, height / 2);
  fill(127);
  ellipse(width / 2, y, 50, 50);

  if (y < height / 2) {
    y += speed;
  }

  if(isPressed) {

    if (y > height / 2) {
      synth.triggerAttackRelease('D4', '8n');
      y=0
    }
  }
}

function touchStarted() {
  isPressed = true;
}

function touchEnded() {
  isPressed = false;
}

function mousePressed() {
  isPressed = true;
}

function mouseReleased() {
  isPressed = false;
}