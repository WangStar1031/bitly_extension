var arrOriginals = [];
var arrTargets = [];
var nCurrentUrlId = 0;
jQuery.get(chrome.extension.getURL('temp/input.txt'), function(data) {
  console.log(data);
  var arrTemp = data.split("\n");
  for( var i = 0; i < arrTemp.length; i++){
    if( arrTemp[i] == "") continue;
    arrOriginals.push(arrTemp[i]);
  }
  console.log( arrOriginals);
  getNextUrl();
});
function postUrl(_longUrl){
  $("#shorten_url").val(_longUrl);
  $("#shorten_btn").click();
  getShotenUrl(_longUrl);
}
function getShotenUrl(_longUrl){
  var shorten_url = $("#shorten_url").val();
  if( shorten_url.indexOf("https://bit.ly/") == -1){
    setTimeout(function(){
      getShotenUrl(_longUrl);
    }, 1000);
  } else{
    var shortUrl = $("li.shortened_link").eq(0).find(".short-url").text();
    console.log(_longUrl, shortUrl);
    nCurrentUrlId++;
    getNextUrl();
  }
}
function getNextUrl(){
  if( nCurrentUrlId >= arrOriginals.length)
    return;
  postUrl(arrOriginals[nCurrentUrlId]);
}
