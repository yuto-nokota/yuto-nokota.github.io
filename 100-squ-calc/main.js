let statusText = '';
const N=10;

function rand_array() {
  let array = Array(N);
  for ( var i=0; i<N; i++ ) {
    array[i]=i;
  }
  for ( var i=0; i<N; i++ ) {
    var r = Math.floor(Math.random()*(N-i))+i;
    var t = array[i];
    array[i] = array[r];
    array[r] = t;
  }
  return array;
}

let yoko = rand_array();
let tate = rand_array();

function addMainTable () {
  let mainTable = document.getElementById('main-table');
  var table = document.createElement('table');
  table.className='main-table';
  for ( var i=0; i<=N; i++ ) {
    var row = document.createElement('tr');
    for ( var j=0; j<=N; j++ ) {
      var cell = document.createElement('td');
      cell.id = 'cell' + i + "-" + j;
      cell.innerHTML="　";
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  mainTable.appendChild(table);
}

function init_table() {
  addMainTable();
  for ( var i=0; i<N; i++ ) {
    var cell = document.getElementById('cell0-' + (i+1));
    cell.innerHTML = yoko[i];
  }
  for ( var i=0; i<N; i++ ) {
    var cell = document.getElementById('cell' + (i+1) + '-0');
    cell.innerHTML = tate[i];
  }
}

function solve () {
  for ( var i=0; i<N; i++ ) {
    for ( var j=0; j<N; j++ ) {
      var cell = document.getElementById('cell' + (i+1) + '-' + (j+1));
      cell.innerHTML = yoko[j] * tate[i];
    }
  }
}

function onload () {
  init_table();
}

