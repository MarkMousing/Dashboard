module.exports = function news(){


newsNext = JSON.parse(document.getElementById("newsNext").textContent);
weather = JSON.parse(document.getElementById("weather").textContent);
news = JSON.parse(document.getElementById("news").textContent);
news2 = "";
thisNews = 0;
number = 0;


function nextNews(val) {
  nextNews = document.getElementById("nextNews");
  console.log(newsNext);
  news2 = "";
  for (var i = 0; i < newsNext.length; i++) {
    var news2 = news2 + "<div class='nextNewsBox'><p>" + newsNext[i].vcTitle + "</p></div>";
    nextNews.innerHTML = news2;
  }
}


function changeNews() {
  nextNews = document.getElementById("nextNews");

  setMessage()
  thisNews++;
  console.log(thisNews);
  var news2 = "";
  for (var i = number; i < newsNext.length; i++) {
    var news2 = news2 + "<div class='nextNewsBox'><p>" + newsNext[i].vcTitle + "</p></div>";
    nextNews.innerHTML = news2;
  }

}

function setMessage() {
  //testtest = JSON.parse("vcTitle: " + newsNext[number].vcTitle)


  nameOfNews = newsNext[number].vcTitle;
  contentOfNews = newsNext[number].txContent;
  vData = '{"vcTitle" : "' + nameOfNews + '", "txContent" : "' + contentOfNews + '" }';


//    vData = '{"vcTitle" : "' + vThisDN + '" }';
  newsNext.push(JSON.parse(vData));

  //var newsNow = newsNext[number].vcTitle;

  //newsNext.push(JSON.parse('{ "name": + }' + newsNext[number].vcTitle));
  console.log(newsNext);
  var title = document.getElementById("title");
  var message = document.getElementById("message");
  var img = document.getElementById("img");
  //console.log(nextNews[number].vcTitle);
  title.innerHTML = newsNext[number].vcTitle;
  message.innerHTML = newsNext[number].txContent;
  //img.src = nextNews[number].img;
  number++;
  if(number == nextNews.length - 1) {

    number = 0;
  }


}

function weatherGet() {
  temp = document.getElementById("temp");

  if (weather.CurrentData.temperature == 1 || weather.CurrentData.temperature == -1) {
    celcius = "grad";
  } else {
    celcius = "grader";
  }
  temp.innerHTML = "<i class='fas fa-temperature-low'></i> " +  weather.CurrentData.temperature + " " + celcius;
}


function newsFeed() {
  var breaking = Math.round(Math.random(0,1));
  var newsfeed = document.getElementById("newsfeed");
  var newsdiv = document.getElementById("newsdiv");
  console.log(breaking);
  if (breaking == 0) {
  newsfeed.innerHTML = "<marquee behavior='scroll' direction='left'>" + news.slice(1,5).join(' | ') + "</marquee>";
} else {
  newsfeed.style.backgroundColor = "red";
  newsdiv.innerHTML = "BREAKING NEWS";
  newsdiv.style.backgroundColor = "yellow";
  newsdiv.style.color = "red";
  newsfeed.innerHTML = "<marquee style='color:yellow;' behavior='scrool' direction='left'>BREAKING NEWS: Kongehuset solgt til Australsk mafia boss!</marquee>"
}
}

function timeDay() {
  var date = new Date();
  var hour = date.getHours();
  var min = date.getMinutes();
  var today = date.getDay() - 1;
  var datenow = date.getDate();
  var month = date.getMonth() - 1;
  var months = ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december']
  var days = ['mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag', 'søndag'];
  var time = document.getElementById("time");
  var minfix = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
  if (min <= 10-1) {
    min = minfix[min];
  }
  time.innerHTML = hour + ":" + min + "<br>" + (days[today]) + ", d. " + datenow + ". " + (months[month]);
}

function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  else {
    cancelFullScreen.call(doc);
  }
}

/*newsFeed();
//messages();
weatherGet();
//timeDay();
nextNews(0);*/

setInterval(function(){changeNews()}, 10000);
setInterval(function(){weatherGet()}, 10000);
//setInterval(function(){timeDay()}, 10000);
setInterval(function(){location.reload()}, 6000000);

}
