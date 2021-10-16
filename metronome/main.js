function sound ( type, sec ) {
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.connect(ctx.destination);
  osc.start();
  osc.stop(sec);
}
let timer=null;
function start () {
  if ( timer ) clearInterval(timer);
  let interval = 60000/document.getElementById("speed").value;
  console.log(interval)
  timer=setInterval(function(){sound("sine",0.15);},interval);
}
function stop () {
  clearInterval(timer);
}
function onload () {
}

