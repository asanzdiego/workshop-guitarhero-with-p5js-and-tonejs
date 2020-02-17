let synth;
let speed = 5;
let distance = 200;
let noteWidth = 50;
let noteRadius = 20;
let noteToPlay = 0;
let notes = [
  { note: 'C4', duration: '8n' },
  { note: 'C4', duration: '8n' },
  { note: 'D4', duration: '4n' },
  { note: 'C4', duration: '4n' },
  { note: 'F4', duration: '4n' },
  { note: 'E4', duration: '2n' },
  { note: 'C4', duration: '8n' },
  { note: 'C4', duration: '8n' },
  { note: 'D4', duration: '4n' },
  { note: 'C4', duration: '4n' },
  { note: 'G4', duration: '4n' },
  { note: 'F4', duration: '2n' },
  { note: 'C4', duration: '8n' },
  { note: 'C4', duration: '8n' },
  { note: 'C5', duration: '4n' },
  { note: 'A4', duration: '4n' },
  { note: 'F4', duration: '4n' },
  { note: 'E4', duration: '4n' },
  { note: 'D4', duration: '4n' },
  { note: 'Bb4', duration: '8n' },
  { note: 'Bb4', duration: '8n' },
  { note: 'A4', duration: '4n' },
  { note: 'F4', duration: '4n' },
  { note: 'G4', duration: '4n' },
  { note: 'F4', duration: '2n' }
]
let uniqueNotes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'Bb4', 'C5'];
let uniqueDurations = [
  { duration: '1n', y: 4 },
  { duration: '2n', y: 2 },
  { duration: '3n', y: 1.5 },
  { duration: '4n', y: 1 },
  { duration: '8n', y: 0.5 },
  { duration: '8t', y: 0.3 }
]
let isPressed = false;
let oldIsPressed = false;
let divX = 0;

function setup() {

  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas = createCanvas(width, height);
  synth = new Tone.Synth().toMaster();

  divX = width / uniqueNotes.length;

  let lastY = 0;
  for (let i = 0; i < notes.length; i++) {
    let note = notes[i];
    let uniqueNote = getUniqueNote(note.note);
    note.x = divX * (uniqueNote + 1) - divX / 2;
    note.y = lastY;
    note.played = false;
    let uniqueDuration = getUniqueDuration(note.duration);
    note.height = uniqueDuration.y * distance;
    lastY = lastY - note.height;
  }

  textSize(32);
}

function draw() {

  if (Tone.context.state != 'running') {
    Tone.start();
  }

  background(255);
  line(0, height / 2, width, height / 2);

  for (i = 0; i < notes.length; i++) {
    let note = notes[i];
    fill(127);
    text(note.note, note.x - noteWidth * 1.5, note.y);
    rect(note.x, note.y, noteWidth, -note.height, noteRadius);
    note.y = note.y + speed;
  }

  if (isPressed) {
    if (!oldIsPressed) {
      oldIsPressed = true;
      triggerAttack();
    }
  } else {
    if (oldIsPressed) {
      oldIsPressed = false;
      triggerRelease();
    }
  }
}

function triggerAttack() {

  let note = notes[noteToPlay];
  if (note.y >= height / 2
    && !note.played) {
    synth.triggerAttack(note.note, note.duration);
    note.played = true;
    noteToPlay++;
  }
}

function triggerRelease() {
  synth.triggerRelease();
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

function getUniqueNote(note) {

  for (let i = 0; i < uniqueNotes.length; i++) {
    if (uniqueNotes[i] === note) {
      return i;
    }
  }
  return 0;
}

function getUniqueDuration(duration) {

  for (let i = 0; i < uniqueDurations.length; i++) {
    let uniqueDuration = uniqueDurations[i];
    if (uniqueDuration.duration === duration) {
      return uniqueDuration;
    }
  }
  return {};
}