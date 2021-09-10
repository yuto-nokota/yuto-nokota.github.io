let t=0;   // [msec]
let timer;
const T=40;// [msec]

function speedOnChange () {
  freq = 0.01 * document.getElementById("speed").value;
}

function extend () {
  let e=document.getElementsByName('time');
  let time=180;
  for ( let i=0; i<e.length; i++ ) {
    if ( e.item(i).checked ) {
      time = e.item(i).value; break;
    }
  }
  t+=T;
  w= t/(time*1000)*0.9+0.1;
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
  let e=document.getElementsByName('time');
  let time=180;
  for ( let i=0; i<e.length; i++ ) {
    if ( e.item(i).checked ) {
      time = e.item(i).value; break;
    }
  }
  t=0;
  w= t/(time*1000)*0.9+0.1;
  document.getElementById("men").style.transform = "scale(" + w + ",1.0)";
}
