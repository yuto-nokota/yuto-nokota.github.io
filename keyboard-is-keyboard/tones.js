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

const white = {
  'MainFrequencyIndex' : 1,
  'reals' : Array(32).fill().map((_,i)=>i==0?0:1),
  'imags' : Array(32).fill().map((_,i)=>i==0?0:1)
};

const delta3 = {
  'MainFrequencyIndex' : 510,
  'reals' : Array(4096).fill().map((_,i)=>i==0?0:(i%512>508?2:0)/Math.floor(i/512+2)),
  'imags' : Array(4096).fill().map((_,i)=>i==0?0:(i%512>508?2:0)/Math.floor(i/512+2))
};

