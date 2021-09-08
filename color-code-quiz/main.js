let timer = null;
let time_limit     = 0;
let time_remaining = 0;
let score = 0;
let colorcode="#000000"

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
  createColorCode();
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
  document.getElementById('score').innterHTML = score;
  stopTimer();
  timer = null;
  B1 = B2 = B3 = nop;
  document.getElementById('color').innerHTML = 'Game Over';
}

function createColorCode () {
  let colorcode="#000000"
  let C1="#" + Number(Math.floor(16777216*Math.random())).toString(16);
  let C2="#" + Number(Math.floor(16777216*Math.random())).toString(16);
  let C3="#" + Number(Math.floor(16777216*Math.random())).toString(16);
  document.getElementById('B1').value=C1;
  document.getElementById('B2').value=C2;
  document.getElementById('B3').value=C3;
  var rnd = Math.floor ( 3 * Math.random() );
  if ( rnd === 0 ) { B1=correct; B2=wrong;   B3=wrong;   document.getElementById('color').style.backgroundColor=C1; }
  if ( rnd === 1 ) { B1=wrong;   B2=correct; B3=wrong;   document.getElementById('color').style.backgroundColor=C2; }
  if ( rnd === 2 ) { B1=wrong;   B2=wrong;   B3=correct; document.getElementById('color').style.backgroundColor=C3; }
}

function correct () {
  stopTimer();
  document.getElementById('score').innerHTML = 'Score : ' + ++score;
  time_limit = time_limit/2 + 10;
  time_remaining = time_limit;
  draw_progress_bar(time_remaining/time_limit);
  createColorCode();
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
