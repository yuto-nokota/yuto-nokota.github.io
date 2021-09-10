function onload () {
  if ( _GET['names'] ) {
    let name_list = _GET['names'].split(';');
    let table = document.getElementById('table');
    league ( name_list.length, name_list);
    //let xhr = new XMLHttpRequest();
    //xhr.open('GET', "./contents/"+_GET['content_id']+".html", true);
    //xhr.onload = function () {
    //  if ( xhr.status == 404 ) {
    //    content.innerHTML = "<h1>404 NOT Found</h1><div>specified content is NOT found.</div>";
    //  }
    //  if ( xhr.status == 200 ) {
    //    content.innerHTML = xhr.responseText;
    //  }
    //}
    //xhr.send();
    //document.getElementById('prev').setAttribute('href', "?content_id=" + (_GET['content_id']-0-1));
    //document.getElementById('next').setAttribute('href', "?content_id=" + (_GET['content_id']-0+1));
  } else {
    //content.innerHTML = "<div>content is NOT specified</div>";
  }
}

function league ( n, names ) {
  let m = Math.floor((n+1)/2) * 2;
  let a = Array(m-1);
  let table = document.getElementById('table');
  // allocate
  for ( var i=0; i<m-1; i++ ) {
    a[i] = Array(m);
  }
  // init
  if ( n != m ) {
    names[m-1] = '休み';
  }
  a[0][m-1] = m - 1;
  a[0][m-2] = 0;
  for ( var i=0; i*2<m-2; i++ ) {
    a[0][i*2] = i + 1;
    a[0][i*2+1] = m- 2 - i;
  }
  // rotate
  for ( var i=1; i<m-1; i++ ) {
    for ( var j=0; j<m-1; j++ ) {
      a[i][j] = ( a[i-1][j] + 1 ) % ( m - 1 );
    }
    a[i][m-1] = m - 1;
  }
  // output
  for ( var i=0; i<m-1; i++ ) {
    for ( var j=0; j<m; j+=2 ) {
      table.innerHTML += names[a[i][j]] + "-" + names[a[i][j+1]] + "&nbsp";
    }
    table.innerHTML += '</br>';
  }
  console.log(a);
}


