const letters="abcdefghijklmnopqrstuvwxyz";
let key = letters.split('');
function encryption ( msg ) {
  let encmap={};
  let ret="";
  for ( var i=0; i<26; i++ ) {
    encmap[key[i]] = letters.toUpperCase().split('')[i];
  }
  for ( var i=0; i<msg.length; i++ ) {
    if ( !msg[i].match(/^[a-z]+/) ) { ret += msg[i]; continue; }
    ret += encmap[msg[i]];
  }
  return ret;
}
function decryption ( msg ) {
  let decmap={};
  let ret="";
  for ( var i=0; i<26; i++ ) {
    decmap[letters.toUpperCase().split('')[i]] = key[i];
  }
  for ( var i=0; i<msg.length; i++ ) {
    if ( !msg[i].match(/^[a-z]+/) ) { ret += msg[i]; continue; }
    ret += decmap[msg[i]];
  }
  return ret;
}
function main () {
  var ret = "";
  var msg = document.getElementById('m').value;
  if ( document.getElementById('enc').checked ) ret=encryption(msg.toLowerCase().split(''));
  else                                          ret=decryption(msg.toUpperCase().split(''));
  document.getElementById('c').innerHTML = ret;
}
function keychange () {
  key = document.getElementById('k').value.split('');
  main();
}
function keygen () {
  key = letters.split('');
  for ( var i=25; i>0; i-- ) {
    var r = Math.floor(Math.random()*26);
    var t = key[i];
    key[i] = key[r];
    key[r] = t;
  }
  document.getElementById('k').value = key.join('');
  main();
}
