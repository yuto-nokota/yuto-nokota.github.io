let oscillator = null;
function sound ( type, sec ) {
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.connect(ctx.destination);
  osc.start();
  osc.stop(sec);
  oscillator = osc;
}

let timer=null;
let count=0;
let count_max = 10;
let target=null;
let r_target=null;
let l_target=null;
let tunes=0;

function clock () {
  let type = 'triangle'
  count++;
  if ( target ) target.innerHTML=count;
  if ( count == count_max )     { sound(type,0.15); target.innerHTML='END'; stop(); return; }
  if ( count == count_max - 5 ) { sound(type,4.99); return; }
  if ( ( count >= count_max - 10 ) && ( count < count_max - 5 ) ) { sound(type,0.15); return; }
  if ( ( count_max - count)%10 == 0 ) { sound(type,0.15); return; }
}

function start () {
  if ( timer ) clearInterval(timer);
  let interval = 1000;
  count_max = document.getElementById('max').value;
  timer=setInterval(clock,interval);
}

function stop () {
  count=0;
  target=null;
  clearInterval(timer);
  if ( oscillator ) oscillator.stop();
}

function l_click () {
  if ( target == r_target ) return;
  document.getElementById('tunes').innerHTML=tunes++;
  stop();
  target = r_target;
  target.innerHTML = 0;
  r_button.setAttribute('class', 'main-button on-button' );
  l_button.setAttribute('class', 'main-button off-button');
  start();
}

function r_click () {
  if ( target == l_target ) return;
  document.getElementById('tunes').innerHTML=tunes++;
  stop();
  target = l_target;
  target.innerHTML = 0;
  l_button.setAttribute('class', 'main-button on-button' );
  r_button.setAttribute('class', 'main-button off-button');
  start();
}

function onload () {
  l_target = document.getElementById('left');
  r_target = document.getElementById('right');
  l_button = document.getElementById('l-button');
  r_button = document.getElementById('r-button');
}

