let style = document.createElement("style");
document.head.appendChild(style);
window.onload= function () {
  let input  = document.getElementById("input");
  let result = document.getElementById("result");
  let css = style.sheet;
  for ( key in regexps ) {
    css.insertRule("." + key 
      + "{background-color:" + regexps[key].bgcolor
      + ";color:" + regexps[key].fgcolor
      + ";}",0
    );
  }
  let realtimeOnChange = function () {
    var str = input.value;
    for ( key in regexps ) {
      var match = str.match(new RegExp(regexps[key].pattern,"g"));
      for ( i in match ) {
        var substr = match[i];
        if ( !substr.match(new RegExp(excepts.pattern)) ) {
          str = str.split(""+substr).join(
              "<span class='balloon' class='" + key + "'>" + substr
            + "<span class='discription'>" + key + "</span>"
            + "</span>"
          );
        }
      }
    }
    input.setAttribute("rows",Math.max(20,(input.value+"\n").match(/\n/g).length+2));
    result.innerHTML = str.replace(/\n/g,"<br>");
  }
  let pre="",cur="";
  let id = window.setInterval(function(){
    cur = document.getElementById("input").value;
    if ( pre !== cur ) realtimeOnChange();
    pre = cur;
  },42);
}


