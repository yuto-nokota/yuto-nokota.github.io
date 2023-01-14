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
function clock () {
  let type = 'triangle'
  count++;
  document.getElementById('counter').innerHTML=count;
  if ( count == count_max )     { sound(type,0.15); count=0; return; }
  if ( count == count_max - 5 ) { sound(type,4.99); return; }
  if ( ( count >= count_max - 10 ) && ( count < count_max - 5 ) ) { sound(type,0.15); return; }
  if ( ( count_max - count)%10 == 0 ) { sound(type,0.15); return; }
}

function start () {
  if ( timer ) clearInterval(timer);
  let interval = 1000;
  count_max = document.getElementById('max').value;
  console.log(interval)
  timer=setInterval(clock,interval);
}
function stop () {
  count=0;
  clearInterval(timer);
  if ( oscillator ) oscillator.stop();
}
function onload () {
}

