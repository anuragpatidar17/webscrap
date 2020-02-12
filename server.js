var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var mysql   = require('mysql');
 var geolocation = require('geolocation');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "webscrap"
});

con.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
});

var i=0;
app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
  var urll = ['http://localhost/article/article1.php','http://localhost/article/article2.php'];
var url;

for(i=0;i<urll.length;i++)
{ 
  url = urll[i];

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var place,lat,long;
      

      $('.place').filter(function(){
        var data = $(this);
        pal = data.children().first().text().trim();
       
         
         
      })

     


      $('.Latitude').filter(function(){
        var data = $(this);
        lat = data.children().first().text().trim();
       
         
         
      })

       $('.Longitude').filter(function(){
        var data = $(this);
        long = data.children().first().text().trim();
        
      })



       

     var sql='INSERT INTO webscrap (Place,latitude,longitude) VALUES ("'+pal+'","'+lat+'","'+long+'") ON DUPLICATE KEY UPDATE counter = counter + 1'
  con.query(sql, function (err, result) {
    if (err) throw err;
    else {
       console.log("1 record inserted");
      var sql='SELECT counter,latitude,longitude FROM webscrap where counter > 2'
  con.query(sql, function (err, result,fields) {
    if (err) throw err;
   Object.keys(result).forEach(function(key) {
      var row = result[key];
      console.log(row.latitude);
      var sql='INSERT INTO unsafe (latitude,longitude) VALUES ("'+row.latitude+'","'+row.longitude+'")'
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
    });
    });
   }
  });

  

 
   

}
    
  })

      }





       res.send('Check your console!')
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
