let theta=0; // [deg]
let freq=0.1;  // [Hz]
const T=40;// [msec]

function speedOnChange () {
  freq = 0.01 * document.getElementById("speed").value;
}

function rotate () {
  theta = (theta + 360*freq*T/1000) % 360;
  document.getElementById("sushi").style.transform = "rotate(" + theta + "deg)";
}

function onload () {
  setInterval(rotate,T);
}
