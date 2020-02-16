let synth;
let speed = 5;
let distance = 200;
let isStoped = false;
let noteWidth = 50;
let noteRadius = 20;
let notes = [
  { note: 'F3', duration: '2n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C4', duration: '2n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'Bb3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'A3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'G3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F4', duration: '2n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C4', duration: '4n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'Bb3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'A3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'G3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F4', duration: '2n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C4', duration: '4n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'Bb3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'A3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'Bb3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'G3', duration: '2n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F3', duration: '2n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C4', duration: '2n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'Bb3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'A3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'G3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F4', duration: '2n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C4', duration: '4n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'Bb3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'A3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'Bb3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'G3', duration: '2n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C3', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C3', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'D3', duration: '3n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'D3', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'Bb3', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'A3', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'G3', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F3', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'G3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'A3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'G3', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'D3', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'E3', duration: '4n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C3', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C3', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'D3', duration: '3n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'D3', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'Bb3', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'A3', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'G3', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F3', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C4', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'G3', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'G3', duration: '2n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C3', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C3', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'D3', duration: '3n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'D3', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'Bb3', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'A3', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'G3', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F3', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'G3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'A3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'G3', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'D3', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'E3', duration: '4n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C4', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C4', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F4', duration: '2n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F3', duration: '2n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C4', duration: '1n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F3', duration: '2n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C4', duration: '2n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'Bb3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'A3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'G3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F4', duration: '2n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C4', duration: '4n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'Bb3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'A3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'G3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F4', duration: '2n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C4', duration: '4n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'Bb3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'A3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'Bb3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'G3', duration: '2n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F3', duration: '2n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C4', duration: '2n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'Bb3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'A3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'G3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F4', duration: '2n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C4', duration: '4n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'Bb3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'A3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'G3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F4', duration: '2n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C4', duration: '4n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'Bb3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'A3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'Bb3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'G3', duration: '2n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C3', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F4', duration: '4n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F4', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F4', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F4', duration: '8t', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F4', duration: '4n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false }
]
let uniqueNotes = [
  { note: 'A3', color: 0, tone: 220, x: 1 },
  { note: 'Bb3', color: 30, tone: 220, x: 2 },
  { note: 'C3', color: 60, tone: 220, x: 3 },
  { note: 'C4', color: 90, tone: 220, x: 4 },
  { note: 'D3', color: 120, tone: 220, x: 5 },
  { note: 'E3', color: 150, tone: 220, x: 6 },
  { note: 'F3', color: 180, tone: 220, x: 7 },
  { note: 'F4', color: 210, tone: 220, x: 8 },
  { note: 'G3', color: 240, tone: 220, x: 9 }
];

let uniqueDurations = [
  { duration: '1n', y: 4 },
  { duration: '2n', y: 2 },
  { duration: '3n', y: 1.5 },
  { duration: '4n', y: 1 },
  { duration: '8n', y: 0.5 },
  { duration: '8t', y: 0.3 }
]
let isPressed = false;

function setup() {

  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas = createCanvas(width, height);
  synth = new Tone.Synth().toMaster();

  let divX = width / uniqueNotes.length;

  let lastY = 0;
  for (let i = 0; i < notes.length; i++) {
    let note = notes[i];
    let uniqueNote = getUniqueNote(note.note);
    note.x = divX * uniqueNote.x - divX / 2;
    note.y = lastY;
    note.color = uniqueNote.color;
    note.tone = uniqueNote.tone;
    let uniqueDuration = getUniqueDuration(note.duration);
    note.height = uniqueDuration.y * distance;
    lastY = lastY - note.height;
    console.log(note);
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

  for (i = 0; i < notes.length; i++) {
    let note = notes[i];
    fill(note.color, 127, note.tone);
    text(note.note, note.x - noteWidth*1.5, note.y);
    rect(note.x, note.y, noteWidth, -note.height, noteRadius);
    note.y = note.y + speed;
  }
}

function triggerAttack() {

  for (let i = 0; i < notes.length; i++) {
    let note = notes[i];
    if (note.y >= height / 2) {
      if (!note.played) {
        synth.triggerAttack(note.note, note.duration);
        note.played = true;
      }
    }
  }
}

function triggerRelease() {
  synth.triggerRelease();
}

function mousePressed() {
  triggerAttack();
}

function mouseReleased() {
  triggerRelease();
}

function getUniqueNote(note) {

  for (let i = 0; i < uniqueNotes.length; i++) {
    let uniqueNote = uniqueNotes[i];
    if (uniqueNote.note === note) {
      return uniqueNote;
    }
  }
  return {};
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