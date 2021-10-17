let oscillator = null;

let keyDownState = {};
let keyLayout = jp106;

let frequencies = Array(64).fill().map((_,i)=>442*Math.pow(2,(i-keyLayout.SoundA)/12));
let oscillators = Array(64).fill(null);
let oscillatorsStarted = Array(64).fill(false);

let tone = sine;

window.AudioContext = window.AudioContext || window.webkitAudioContext;
let context = new AudioContext();
context.createPeriodicWave = context.createPeriodicWave || context.createWaveTable;

function toneChange () {
  for ( var e of document.getElementsByName('tone') ) {
    if ( e.checked ) tone = eval(e.value);
  }
  for ( var i=0; i<oscillators.length; i++ ) {
    initOscillator(i);
  }
}

function keylayoutChange () {
  for ( var e of document.getElementsByName('keylayout') ) {
    if ( e.checked ) keyLayout = eval(e.value);
  }
  for ( var i=0; i<oscillators.length; i++ ) {
    stop(i);
  }
}

document.onkeydown = function ( e ) {
  if ( !e ) e = window.event;
  if ( e.code in keyLayout ) {
    if ( keyDownState[e.key] ) return;
    keyDownState[e.key] = true;
    start(keyLayout[e.code]);
  }
}

document.onkeyup = function ( e ) {
  if ( !e ) e = window.event;
  if ( e.code in keyLayout ) {
    keyDownState[e.key] = false;
    stop(keyLayout[e.code]);
  }
}

document.onblur = function () {
  for ( var key in keyDownState ) {
    keyDownState[key] = false;
  }
  for ( var i=0; i<oscillators.length; i++ ) {
    stop(i);
  }
}

function initOscillator ( i ) {
  let periodicwave = context.createPeriodicWave(tone.reals,tone.imags);
  oscillators[i] = context.createOscillator();
  oscillators[i].setPeriodicWave = oscillators[i].setPeriodicWave || oscillators[i].setWaveTable;
  oscillators[i].setPeriodicWave(periodicwave);
  oscillators[i].connect(context.destination);
  oscillators[i].frequency.value=frequencies[i]/tone.MainFrequencyIndex;
  oscillatorsStarted[i] = false;
}

function start ( i ) {
  oscillators[i].start();
  oscillatorsStarted[i] = true;
}

function stop ( i ) {
  if( oscillatorsStarted[i] ) oscillators[i].stop(0);
  initOscillator(i);
}

function onload_function () {
  for ( var i=0; i<oscillators.length; i++ ) {
    initOscillator(i);
  }
}

