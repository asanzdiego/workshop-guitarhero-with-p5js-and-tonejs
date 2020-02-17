let synth;
let speed = 10;
let distance = 100;
let isStoped = false;
let notes = [
  { note: 'C4', duration: '8n', y: 0 },
  { note: 'E4', duration: '4n', y: 0 }
]

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

  for (i = 0; i < notes.length; i++) {
    let note = notes[i];
    let noteY = note.y - distance * i;
    ellipse(width / 2, noteY, 50, 50);
    if (!isStoped && noteY < height / 2) {
      note.y = note.y + speed;
    } else {
      isStoped = true;
    }
  }
}

function mousePressed() {

  for (i = 0; i < notes.length; i++) {
    let note = notes[i];
    let noteY = note.y - distance * i;
    if (noteY > height / 2) {
      synth.triggerAttackRelease(note.note, note.duration);
      note.y = 0;
      isStoped = false
    }
  }
}