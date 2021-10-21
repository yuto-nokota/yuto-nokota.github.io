const delta = {
  'MainFrequencyIndex' : 1,
  'reals' : [0,1],
  'imags' : [0,1]
};

const gaussian = {
  'MainFrequencyIndex' : 16,
  'reals' : Array(32).fill().map((_,i)=>i==0?0:Math.exp(-(i-16)*(i-16)/32)),
  'imags' : Array(32).fill().map((_,i)=>i==0?0:Math.exp(-(i-16)*(i-16)/32))
};

const pink = {
  'MainFrequencyIndex' : 1,
  'reals' : Array(256).fill().map((_,i)=>i==0?0:1/i),
  'imags' : Array(256).fill().map((_,i)=>i==0?0:1/i)
};

const exp = {
  'MainFrequencyIndex' : 1,
  'reals' : Array(32).fill().map((_,i)=>i==0?0:Math.exp(-(i-1))),
  'imags' : Array(32).fill().map((_,i)=>i==0?0:Math.exp(-(i-1)))
};

const log = {
  'MainFrequencyIndex' : 1,
  'reals' : Array(32).fill().map((_,i)=>i==0?0:1-Math.log(i+1)),
  'imags' : Array(32).fill().map((_,i)=>i==0?0:1-Math.log(i+1))
};

const white = {
  'MainFrequencyIndex' : 1,
  'reals' : Array(32).fill().map((_,i)=>i==0?0:1),
  'imags' : Array(32).fill().map((_,i)=>i==0?0:1)
};

const delta3 = {
  'MainFrequencyIndex' : 2046,
  'reals' : Array(2048).fill().map((_,i)=>i==0?0:(i>2044?1:0)),
  'imags' : Array(2048).fill().map((_,i)=>i==0?0:(i>2044?1:0))
};

const sinc = {
  'MainFrequencyIndex' : 512,
  'reals' : Array(1024).fill().map((_,i)=>i==0?0:i==512?1:Math.sin(2*Math.PI*(i-512)/10)/(2*Math.PI*(i-512)/10)),
  'imags' : Array(1024).fill().map((_,i)=>i==0?0:i==512?1:Math.sin(2*Math.PI*(i-512)/10)/(2*Math.PI*(i-512)/10))
};


