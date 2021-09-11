let score = 0;
const T=100;// [msec]
const sakura_str = 
[ "桜", "櫻", "嬰", "鸚", "嚶", "瓔", "纓", "蘡", "癭", "攖", "孆", "孾", "巊", "廮", "瀴", "蠳", "䑍", "䙬", "䨉"];
// 00    01    02    03    04    05    06    07    08    09    10    11    12    13    14    15    16    17    18

function collect ( e ) {
  document.getElementById('score').innerHTML = 'SCORE :' + (++score);
  e.remove();
}

function wrong ( e ) {
  document.getElementById('score').innerHTML = 'SCORE :' + (--score);
  e.remove();
}

function create () {
  let sakura = document.createElement('span');
  sakura.className = 'sakura-fg';
  let max = 90, min=30;
  let size = Math.random() * (max - min ) + min;
  let velocity  = Math.random() * 100 + 10; // [px/sec]
  let frequency = Math.random() * 0.5;
  let theta = Math.random() * 360;
  let h = 200;
  let timer=null;
  // init
  sakura.style.width    = size + "px";
  sakura.style.height   = size + "px";
  sakura.style.fontSize = size + "px";
  let rnd = Math.floor(Math.random()*19);
  sakura.innerHTML = sakura_str[rnd];
  sakura.onclick = ( rnd < 2 ) ? function(){collect(sakura)} : function(){wrong(sakura)};
  sakura.style.left = ( Math.random() * (innerWidth-400) + 200 ) + "px";
  sakura.style.top      = h + "px";
  // move animation
  sakura.animation = function () {
    sakura.style.top = (h+=velocity*T/1000) + "px";
    theta = (theta + 360*frequency*T/1000) % 360;
    sakura.style.transform = "rotate(" + theta + "deg)";
  }
  timer=setInterval(sakura.animation,T);
  document.getElementById('sakura').appendChild(sakura)
  setTimeout(function(){
    clearInterval(timer);
    if ( rnd < 2 ) document.getElementById('score').innerHTML = 'SCORE :' + (--score);
    sakura.remove();
  },8000);
}

function onload () {
  setInterval(create,1000);
}

