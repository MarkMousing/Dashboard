//var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/";
const fetch = require("node-fetch");
var json = "";
var mysql = require("mysql");
var news = [];
let Parser = require("rss-parser");
let parser = new Parser();
var tekst = "";
var totalNews = [];
var value = 0;

var con = mysql.createConnection({
  host: "sql.itcn.dk",
  user: "lass679a.SKOLE",
  password: "w0RpS5hG68",
  database: "lass679a5.SKOLE"

  /*host: "localhost",
  user: "testhost",
  password: "1866",
  database: "dashboard"*/
});

module.exports = {
  createBoard: function(req, res) {
    //Lad os lige få de 16 næste
    var dateString = "2019-02-07 11:00:00";
    dateString = dateString.split(" ").join("T");
    var date = new Date(dateString);
    date = date.getTime() / 1000;
    //console.log(date);

    con.query(
      "SELECT * FROM news WHERE iIsActive = '1' AND iDeleted = '0' ORDER BY daCreated LIMIT 11",
      function(err, result, fields) {
        if (err) throw err;
        //console.log(result[0]['vcTitle']);
        //console.log(tekst);
        newsNext = JSON.stringify(result);
        newsNext: newsNext;

        //Arraaaay med aktiviteter!
        var tid = Math.floor(Date.now() / 1000);
        console.log(tid);
        con.query(
          "SELECT * FROM mh_activity WHERE daTime >= UNIX_TIMESTAMP() ORDER BY daTime LIMIT 16",
          function(errr, activities, fields) {
            if (errr) throw err;
            //console.log(activities);
            activityArray = JSON.stringify(activities);
            activityArray: activities;
          }
        );

        //Lad os lige hente vejret for Aalborg
        //console.log(news);
        const url = "https://vejr.eu/api.php?location=Aalborg&degree=C";
        const getData = async url => {
          const response = await fetch(url);
          var json = await response.json();
          weather = JSON.stringify(json);
          weather: weather;

          let feed = await parser.parseURL("http://feeds.tv2.dk/nyheder/rss");
          feed.items.forEach(item => {
            //console.log(item.title + ':' + item.link)
            totalNews = news.push(item.title);
          });
          //console.log(news);
          latestNews = JSON.stringify(news);
          latestNews: latestNews;
          res.render("dashboard");
        };

        getData(url, 0);
        var device = req.device.type.toUpperCase();

        if (device == "DESKTOP") {
          device = "computer";
        } else {
          device = "mobil";
        }
        //console.log("IP: " + req.connection.remoteAddress);
        //console.log("\x1b[45mDashboard version 1.0.0 er nu startet på en \x1b[33m" + device)
        /*console.log("\x1b[34mI dag vil der blive vist \x1b[33m" + result.length + "\x1b[34m meddelser ude på de forskellige skærme");*/
        //setInterval(function(){getData(url, 1); console.log("Ny data hentet")}, 10000);
      }
    );
  }
};
