const letter = {'a': 0,'b': 1,'c': 2,'d': 3,'e': 4,'f': 5,'g': 6,'h': 7,'i': 8,'j': 9,'k':10,'l':11,'m':12,
                'n':13,'o':14,'p':15,'q':16,'r':17,'s':18,'t':19,'u':20,'v':21,'w':22,'x':23,'y':24,'z':25};

function add ( x, y ) {
  return ['a','b','c','d','e','f','g','h','i','j','k','l','m',
          'n','o','p','q','r','s','t','u','v','w','x','y','z'][(letter[x]+letter[y])%26];
}

function sub ( x, y ) {
  return ['a','b','c','d','e','f','g','h','i','j','k','l','m',
          'n','o','p','q','r','s','t','u','v','w','x','y','z'][(letter[x]-letter[y]+26)%26];
}

function keygen() {
  let l = document.getElementById('l').value;
  let k = '';
  for ( var i=0; i<l; ++i ) {
    k += ['a','b','c','d','e','f','g','h','i','j','k','l','m',
          'n','o','p','q','r','s','t','u','v','w','x','y','z'][Math.floor(Math.random()*26)];
  }
  document.getElementById('k').value = k;
}

function main() {
  var key_array = document.getElementById('k').value.toLowerCase().split('');
  if ( key_array.length == 0 ) return;
  var i=0;
  document.getElementById('c').innerHTML="";
  for ( var m of document.getElementById('m').value.toLowerCase().split('') ) {
    if ( !m.match(/^[a-z]+/) ) { document.getElementById('c').innerHTML += m; continue; }
    if ( document.getElementById('enc').checked ) document.getElementById('c').innerHTML += add(m,key_array[i]);
    if ( document.getElementById('dec').checked ) document.getElementById('c').innerHTML += sub(m,key_array[i]);
    i = (i+1) % key_array.length;
  }
}

