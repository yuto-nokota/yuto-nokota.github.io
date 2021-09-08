let t=0;   // [msec]
let timer;
const T=40;// [msec]

function speedOnChange () {
  freq = 0.01 * document.getElementById("speed").value;
}

function extend () {
  t+=T;
  w= t/180000*0.9+0.1;
  document.getElementById("men").style.transform = "scale(" + w + ",1.0)";
}

function onload () {
  reset();
}

function start() {
  if ( timer !== null ) stop();
  timer=setInterval(extend,T);
}

function stop () {
  if ( timer !== null ) clearInterval(timer);
  timer=null;
}

function reset () {
  t=0;
  w= t/180000*0.9+0.1;
  document.getElementById("men").style.transform = "scale(" + w + ",1.0)";
}
