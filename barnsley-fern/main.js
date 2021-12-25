let x=0; y=0;
let X=0, Y=0;
let s=0, t=0;

function grow ( n ) {
  for ( var i=0; i<n; i++ ) {
    grow_once();
  }
}

function grow_once() {
  let canvas    = document.getElementById('canvas');
  let context   = canvas.getContext('2d');
  let imagedata = context.getImageData(0,0,canvas.width, canvas.height);
  let r = Math.random();
  let z,w;
  if ( r < 0.01 ) {
    z =  0.00;
    w =  0.16 * y;
  } else if ( r < 0.08 ) {
    z =  0.20*x - 0.26*y;
    w =  0.23*x + 0.22*y + 1.60;
  } else if ( r < 0.15 ) {
    z = -0.15*x + 0.28*y;
    w =  0.26*x + 0.24*y + 0.44;
  } else {
    z =  0.85*x + 0.04*y;
    w = -0.04*x + 0.85*y + 1.60;
  }
  x = z; y = w;
  imagedata.data[ Math.floor(Y-t*y)*imagedata.width*4 + Math.floor(X+s*x)*4 + 0] =   1;
  imagedata.data[ Math.floor(Y-t*y)*imagedata.width*4 + Math.floor(X+s*x)*4 + 1] = 128;
  imagedata.data[ Math.floor(Y-t*y)*imagedata.width*4 + Math.floor(X+s*x)*4 + 2] =  32;
  imagedata.data[ Math.floor(Y-t*y)*imagedata.width*4 + Math.floor(X+s*x)*4 + 3] = 255;
  context.putImageData(imagedata,0,0);
}

function resize () {
  let canvas    = document.getElementById('canvas');
  let context   = canvas.getContext('2d');
  let w = document.getElementById('width').value;
  let h = document.getElementById('height').value;
  let imagedata = context.getImageData(0,0,canvas.width, canvas.height);
  canvas.width  = w ? w : 512;
  canvas.height = h ? h : 512;
  X = canvas.width / 2;
  Y = canvas.height;
  s = canvas.width  /  6;
  t = canvas.height / 11;
  context.fillStyle='rgb(255,255,255)';
  context.fillRect(0,0,canvas.width,canvas.height);
  imagedata.data[ Y*imagedata.width*4 + X*4 + 1] = 255;
  context.putImageData(imagedata,0,0);
}
