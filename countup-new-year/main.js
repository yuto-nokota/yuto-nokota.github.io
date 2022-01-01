function show_time() {
  let now  = new Date();
  let year   = now.getFullYear();
  let gantan = new Date(year,0,1,0,0,0,0);
  document.getElementById('main').innerHTML = (now.getTime() - gantan.getTime()) / 1000;
}

function start() {
  setInterval(show_time,84);
}

