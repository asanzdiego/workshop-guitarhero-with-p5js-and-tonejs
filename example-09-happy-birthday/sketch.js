let synth;
let speed = 5;
let distance = 200;
let isStoped = false;
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
let uniqueColors = [0, 20, 40, 90, 130, 170, 210, 0, 20, 40, 90, 130, 170, 210];
let uniqueTones = [255, 255, 255, 255, 255, 255, 255, 195, 195, 195, 195, 195, 195, 195];
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
let padWidth = 0;
let score = 0;
let activeNote = null;

function setup() {

  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas = createCanvas(width, height);
  synth = new Tone.Synth().toMaster();

  divX = width / uniqueNotes.length;
  padWidth = divX*1.5;

  let lastY = 0;
  for (let i = 0; i < notes.length; i++) {
    let note = notes[i];
    let uniqueNote = getUniqueNote(note.note);
    note.x = divX * (uniqueNote + 1) - divX / 2;
    note.y = lastY;
    note.color = uniqueColors[uniqueNote];
    note.tone = uniqueTones[uniqueNote];
    note.played = false;
    let uniqueDuration = getUniqueDuration(note.duration);
    note.height = uniqueDuration.y * distance;
    lastY = lastY - note.height;
    note.visible = true;
  }

  colorMode(HSB, 255);
  textSize(32);
}

function draw() {

  if (Tone.context.state != 'running') {
    Tone.start();
  }

  background(255);
  line(0, height / 2, width, height / 2);
  for (let i = 0; i < uniqueNotes.length; i++) {
    line(divX * i, 0, divX * i, height);
  }

  let isStopedLoop = false;
  for (i = 0; i < notes.length; i++) {
    let note = notes[i];
    fill(note.color, 127, note.tone);
    if (note.visible) {
      text(note.note, note.x - noteWidth * 1.5, note.y);
      rect(note.x, note.y, noteWidth, -note.height, noteRadius);
    }
    if (!isStoped) {
      if (note.y >= height / 2 && !note.played) {
        isStopedLoop = true;
      } else {
        note.y = note.y + speed;
      }
    }
  }
  if (isStopedLoop) {
    isStoped = true;
  }

  noFill();
  stroke('black');
  if (mouseY < height / 2) {
    stroke(0, 255, 255);
  }
  text(score, noteWidth, noteWidth);
  rect(mouseX - padWidth, mouseY, padWidth * 2, noteWidth, noteRadius);

  if (isPressed) {
    fill(127);
    if (mouseY < height / 2) {
      fill(0, 127, 255);
    }
    rect(mouseX - padWidth, mouseY, padWidth * 2, noteWidth, noteRadius);
    if (!oldIsPressed) {
      oldIsPressed = true;
      triggerAttack();
    }
    if (noteToPlay > 0 && noteToPlay < notes.length && !isStoped && oldIsPressed) {
      let delta = 0;
      if (mouseX > activeNote.x) {
        delta = padWidth - (mouseX - activeNote.x);
      } else {
        delta = padWidth - (activeNote.x - mouseX);
      }
      delta = Math.round(delta/10);
      //text(delta, noteWidth, noteWidth*2);
      score+=delta;
    }
  } else {
    if (oldIsPressed) {
      oldIsPressed = false;
      triggerRelease();
    }
    let delta = 10;
    if (noteToPlay > 0 && isStoped && !oldIsPressed && score > delta) {
      score-=delta;
    }
  }
}

function triggerAttack() {

  activeNote = notes[noteToPlay];
  if (activeNote && activeNote.y >= height / 2
    && !activeNote.played
    && activeNote.x > mouseX - padWidth
    && activeNote.x < mouseX + padWidth
    && mouseY >= height / 2) {
    synth.triggerAttack(activeNote.note, activeNote.duration);
    activeNote.played = true;
    isStoped = false;
    noteToPlay++;
  }
}

function triggerRelease() {
  if (noteToPlay > 0) {
    notes[noteToPlay-1].visible = false;
  }
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
