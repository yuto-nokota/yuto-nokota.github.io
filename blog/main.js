function onload () {
  if ( _GET['content_id'] ) {
    let content = document.getElementById('content');
    let xhr = new XMLHttpRequest();
    xhr.open('GET', _GET['content_id']+".html", true);
    xhr.onload = function () {
      if ( xhr.status == 404 ) {
        content.innerHTML = "<h1>404 NOT Found</h1><div>specified content is NOT found.</div>";
      }
      if ( xhr.status == 200 ) {
        content.innerHTML = xhr.responseText;
      }
    }
    xhr.send();
    document.getElementById('prev').setAttribute('href', "?content_id=" + (_GET['content_id']-0-1));
    document.getElementById('next').setAttribute('href', "?content_id=" + (_GET['content_id']-0+1));
  } else {
    content.innerHTML = "<div>content is NOT specified</div>";
  }
}
