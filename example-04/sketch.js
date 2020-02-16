let synth;
let speed = 5;
let distance = 200;
let isStoped = false;
let noteWidth = 50;
let noteRadius = 20;
let notes = [
  { note: 'C4', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C4', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'D4', duration: '4n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C4', duration: '4n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F4', duration: '4n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'E4', duration: '2n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C4', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C4', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'D4', duration: '4n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C4', duration: '4n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'G4', duration: '4n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F4', duration: '2n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C4', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C4', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'C5', duration: '4n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'A4', duration: '4n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F4', duration: '4n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'E4', duration: '4n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'D4', duration: '4n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'Bb4', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'Bb4', duration: '8n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'A4', duration: '4n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F4', duration: '4n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'G4', duration: '4n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false },
  { note: 'F4', duration: '2n', x: 0, y: 0, height: 0, color: 0, tone: 0, played: false }
]
let uniqueNotes = [
  { note: 'A4', color: 0, tone: 220, x: 1 },
  { note: 'Bb4', color: 20, tone: 220, x: 2 },
  { note: 'C4', color: 40, tone: 220, x: 3 },
  { note: 'D4', color: 90, tone: 220, x: 4 },
  { note: 'E4', color: 130, tone: 220, x: 5 },
  { note: 'F4', color: 170, tone: 220, x: 6 },
  { note: 'G4', color: 210, tone: 220, x: 7 },
  { note: 'C5', color: 240, tone: 220, x: 8 }
];

let uniqueDurations = [
  { duration: '2n', y: 4 },
  { duration: '4n', y: 2 },
  { duration: '8n', y: 1 },
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