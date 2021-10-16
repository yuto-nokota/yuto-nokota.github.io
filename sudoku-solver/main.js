let statusText = '';

function addMainTable () {
  let mainTable = document.getElementById('main-table');
  var table = document.createElement('table');
  table.className='main-table';
  for ( var i=0; i<9; i++ ) {
    var row = document.createElement('tr');
    for ( var j=0; j<9; j++ ) {
      var cell = document.createElement('td');
      var pulldown = document.createElement('select');
      pulldown.id = 'cell' + i + j;
      for ( var k=0; k<=9; k++ ) {
        var option = document.createElement('option');
        option.value=(k===0)?' ':k;
        option.innerHTML = (k===0)?' ':k;
        pulldown.appendChild(option);
      }
      cell.appendChild(pulldown);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  mainTable.appendChild(table);
}

function readTable ( array ) {
  for ( var i=0; i<9; i++ ) {
    for ( var j=0; j<9; j++ ) {
      array[i*9+j] = document.getElementById ( 'cell' + i + j ).value;
    }
  }
}

function writeTable ( array ) {
  for ( var i=0; i<9; i++ ) {
    for ( var j=0; j<9; j++ ) {
      var t = array[i*9+j]===' ' ? 0 : array[i*9+j];
      document.getElementById ( 'cell' + i + j ).options[t].selected = true;
    }
  }
}

function solve () {
  var array     = new Array(81);
  readTable(array);
  document.getElementById('status').innerHTML = 'Solving...';
  if ( !solve_main(array) ) {
    statusText = 'No answer';
    document.getElementById('status').innerHTML = 'No answer.';
  } else {
    document.getElementById('status').innerHTML = 'Solved.';
  }
}

function solve_main ( array ) {
  var candidate = new Array(81).fill().map(e=>['1','2','3','4','5','6','7','8','9']);
  //writeTable(array);
  console.log(array);
  for ( var i=0; i<9; i++ ) {
    for ( var j=0; j<9; j++ ) {
      if ( array[i*9+j] === ' ' ) continue;
      var I = Math.floor(i/3)*3;
      var J = Math.floor(j/3)*3;
      // row check
      for ( var k=0; k<9; k++ ) {
        candidate[k*9+j] = candidate[k*9+j].filter( e =>  e !== array[i*9+j]  );
      }
      // column check
      for ( var k=0; k<9; k++ ) {
        candidate[i*9+k] = candidate[i*9+k].filter( e => ( e !== array[i*9+j] ) );
      }
      // neighbour check
      for ( var k=0; k<3; k++ ) {
        for ( var l=0; l<3; l++ ) {
          candidate[(I+k)*9+(J+l)] =  candidate[(I+k)*9+(J+l)].filter( e => ( e !== array[i*9+j] ) );
        }
      }
      candidate[i*9+j] = [''+array[i*9+j]];
    }
  }
  // some candidate.length = 0; then no answer ( return false )
  // and all candidate.length =1; then this is answer
  var flag = true;
  var min = -1;
  for ( var i=0; i<81; i++ ) {
    if ( candidate[i].length === 0 ) return false;
    if ( candidate[i].length !== 1 ) {
      flag=false;
      if ( min < 0 ) min = i;
      if ( candidate[i].length < candidate[min].length ) min = i;
    }
  }
  if ( flag ) {
    for ( var i=0; i<81; i++ ) {
      array[i] = candidate[i][0];
    }
    writeTable(array);
    return true;
  }
  var childArray = Array.from(array);
  for ( var c of candidate[min] ) {
    childArray[min] = c;
    if ( solve_main(childArray) ) return true;
  }
  return false;
}

function onload () {
  addMainTable();
}

