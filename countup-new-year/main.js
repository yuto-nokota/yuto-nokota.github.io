function show_time() {
  let now  = new Date();
  let year   = now.getFullYear();
  let gantan = new Date(year,0,1,0,0,0,0);
  let next   = new Date(year+1,0,1,0,0,0,0);
  let spend = now.getTime() - gantan.getTime();
  let progress = Math.floor(spend * 1000 / ( next.getTime() - gantan.getTime() )) / 10;
  document.getElementById('main').innerHTML = spend / 1000;
  document.getElementById('progress').innerHTML = 
    "["+"#".repeat(progress)+"-".repeat(100-Math.floor(progress))+"]" + progress + "%";
}

function start() {
  setInterval(show_time,84);
}

