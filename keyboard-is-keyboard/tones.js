const gaussian = {
  'MainFrequencyIndex' : 128,
  'reals' : Array(256).fill().map((_,i)=>i==0?0:Math.exp(-(i-128)*(i-128)/3640)),
  'imags' : Array(256).fill().map((_,i)=>i==0?0:Math.exp(-(i-128)*(i-128)/3640))
};

const sine = {
  'MainFrequencyIndex' : 1,
  'reals' : Array(2).fill().map((_,i)=>i==0?0:1),
  'imags' : Array(2).fill().map((_,i)=>i==0?0:1)
};

const pink = {
  'MainFrequencyIndex' : 1,
  'reals' : Array(256).fill().map((_,i)=>i==0?0:1/i),
  'imags' : Array(256).fill().map((_,i)=>i==0?0:1/i)
};


