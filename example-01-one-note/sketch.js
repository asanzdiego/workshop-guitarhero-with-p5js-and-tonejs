let synth;
let y=0;

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
  line(0, height/2, width, height/2);
  if (y < height/2) {
    fill(127);
    ellipse(width/2, y, 50, 50);
    y+=10;
  } else {
    if (y < height/2 + 10) {
      synth.triggerAttackRelease('D4', '8n');
      y+=10;
    }
  }
}