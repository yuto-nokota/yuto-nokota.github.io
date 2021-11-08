let hitCnt   = 0;
let throwCnt = 0;
function renderLine ( A, B, style ) {
  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');
  let defaultStyle = context.strokeStyle;
  context.strokeStyle=style;
  context.beginPath();
  context.moveTo(A[0],A[1]);
  context.lineTo(B[0],B[1]);
  context.stroke();
  context.strokeStyle=defaultStyle;
}
function add_needle () {
  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');
  let defaultStyle = context.strokeStyle;
  let l = canvas.height / 3;
  let d = l * 2;
  let y = ( canvas.height - l ) * Math.random() + l/2;
  let x = ( canvas.width  - l ) * Math.random() + l/2;
  let t = Math.PI * Math.random();
  let c = Math.cos(t);
  let s = Math.sin(t);
  let hit = ( y - l/2 * s < l/2 ) || ( y + l/2 * s > l/2+d );
  let style = hit ? 'red' : defaultStyle;
  if ( hit ) hitCnt++;
  throwCnt++;
  renderLine( [x+l/2*c,y+l/2*s] , [x-l/2*c,y-l/2*s], style);
  document.getElementById('hit').innerHTML   = hitCnt;
  document.getElementById('throw').innerHTML = throwCnt;
  document.getElementById('pi').innerHTML    = throwCnt/hitCnt;
}
function onload_function(){
  let canvas = document.getElementById('canvas');
  let context = canvas.getContext('2d');
  let defaultStyle = context.strokeStyle;
  let l = canvas.height / 3;
  let d = l * 2;
  renderLine( [0,l/2  ] , [canvas.width,l/2  ], defaultStyle);
  renderLine( [0,l/2+d] , [canvas.width,l/2+d], defaultStyle);
}
