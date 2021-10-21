let timer = null;
let time_limit     = 0;
let time_remaining = 0;
let score = 0;

function onload () {
  init_progress_bar();
}

function init_progress_bar () {
  var canvas = document.getElementById('progress_bar');
  //canvas.width  = 256;
  //canvas.height =  40;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'gray';
  ctx.fillRect( 0,0, canvas.width, canvas.height );
}

function draw_progress_bar ( ratio ) {
  init_progress_bar();
  var canvas = document.getElementById('progress_bar');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'orange';
  ctx.fillRect( 0, 0, canvas.width*ratio, canvas.height );
}

function startNewGame () {
  if ( timer ) gameOver();
  document.getElementById('score').innerHTML = 'Score : ' + (score=0);
  time_remaining = time_limit = 100;
  createProblem();
  startTimer();
  document.getElementById('color').innerHTML = '　';
}

function startTimer () {
  timer = setInterval ( function(){
    if ( time_remaining > 0 ) {
      time_remaining--;
      draw_progress_bar(time_remaining/time_limit);
    } else {
      gameOver();
    }
  },100 );
}

function stopTimer () {
  clearInterval(timer);
}

function gameOver () {
  stopSound();
  document.getElementById('score').innterHTML = score;
  stopTimer();
  timer = null;
  B1 = B2 = B3 = nop;
  document.getElementById('color').innerHTML = 'Game Over';
}

function createProblem () {
  stopSound();
  let F1;
  let F2;
  let F3;
  do {
    F1=Math.floor(answers.length*Math.random());
    F2=Math.floor(answers.length*Math.random());
    F3=Math.floor(answers.length*Math.random());
  } while ( F1==F2 || F2==F3 || F3==F1 );
  document.getElementById('B1').value=answers[F1].text;
  document.getElementById('B2').value=answers[F2].text;
  document.getElementById('B3').value=answers[F3].text;
  var rnd = Math.floor ( 3 * Math.random() );
  if ( rnd === 0 ) { B1=correct; B2=wrong;   B3=wrong;   startSound(answers[F1].freq); }
  if ( rnd === 1 ) { B1=wrong;   B2=correct; B3=wrong;   startSound(answers[F2].freq); }
  if ( rnd === 2 ) { B1=wrong;   B2=wrong;   B3=correct; startSound(answers[F3].freq); }
}

let oscillator = null;
function startSound (freq) {
  if ( oscillator ) oscillator.stop(0);
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  let context = new AudioContext();
  context.createPeriodicWave = context.createPeriodicWave || context.createWaveTable;

  const TABLE_SIZE=128;
  let reals = new Float32Array(TABLE_SIZE);
  let imags = new Float32Array(TABLE_SIZE);
  reals.fill(0);
  imags.fill(0);
  reals[1] = 1;
  for ( i=2; i<3; i++ ) {
    reals[i] = reals[i-1]/2;
  }
  let periodicwave = context.createPeriodicWave(reals,imags);
  oscillator = context.createOscillator();
  oscillator.setPeriodicWave = oscillator.setPeriodicWave || oscillator.setWaveTable;
  oscillator.setPeriodicWave(periodicwave);
  oscillator.connect(context.destination);
  oscillator.frequency.value=freq;
  oscillator.start();
}

function stopSound ( ) {
  if ( oscillator ) oscillator.stop(0);
  oscillator = null;
}

function correct () {
  stopTimer();
  document.getElementById('score').innerHTML = 'Score : ' + ++score;
  time_limit = time_limit/2 + 10;
  time_remaining = time_limit;
  draw_progress_bar(time_remaining/time_limit);
  createProblem();
  startTimer();
}

function wrong () {
  gameOver();
}

function nop () {
}

var B1 = nop;
var B2 = nop;
var B3 = nop;
