function sound ( type, sec ) {
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.connect(ctx.destination);
  osc.start();
  osc.stop(sec);
}
let timer=null;
let count=0;
function clock () {
  let type = 'triangle'
  count++;
  document.getElementById('counter').innerHTML=count;
  if ( count == 10 ) sound(type,0.15);
  if ( count >= 20 && count <= 24 ) sound(type,0.15);
  if ( count == 25 ) sound(type,4.99);
  if ( count == 30 ) { sound(type,0.15); count=0; }
}

function start () {
  if ( timer ) clearInterval(timer);
  let interval = 1000;
  console.log(interval)
  timer=setInterval(clock,interval);
}
function stop () {
  count=0;
  clearInterval(timer);
}
function onload () {
}

