let oscillator = null;
function start () {
  if ( oscillator ) oscillator.stop(0);
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  let context = new AudioContext();
  context.createPeriodicWave = context.createPeriodicWave || context.createWaveTable;

  const TABLE_SIZE=128;
  let reals = new Float32Array(TABLE_SIZE);
  let imags = new Float32Array(TABLE_SIZE);
  reals.fill(0);
  imags.fill(0);
  reals[1] = 1;
  for ( i=2; i<3; i++ ) {
    reals[i] = reals[i-1]/2;
  }
  let periodicwave = context.createPeriodicWave(reals,imags);
  oscillator = context.createOscillator();
  oscillator.setPeriodicWave = oscillator.setPeriodicWave || oscillator.setWaveTable;
  oscillator.setPeriodicWave(periodicwave);
  oscillator.connect(context.destination);
  oscillator.frequency.value=document.getElementById("frequency").value;
  oscillator.start();
}

function stop () {
  oscillator.stop(0);
  oscillator = null;
}

function onload () {
}

