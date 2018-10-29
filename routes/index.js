var express = require('express');
var fs = require('fs');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('weather.html', {root: 'public'});
});

/* GET city handler */
router.get('/getcity',function(req,res,next) {
    fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
        if(err) throw err;
        
        var cities = data.toString().split("\n");
        var jsonresult = [];
        var myRe = new RegExp("^" + req.query.q);
        //console.log(myRe);
        
        for(var i = 0; i < cities.length; i++) {
          var result = cities[i].search(myRe); 
          if(result != -1) {
            //console.log(cities[i]);
            jsonresult.push({city:cities[i]});
          } 
        }   
        //console.log(jsonresult);
        res.status(200).json(jsonresult);
  });
});

/* GET owlroute handler */
router.get('/owlroute',function(req,res,next) {
  var api_url = "https://owlbot.info/api/v1/dictionary/"+req.query.q;
  console.log(api_url);
  request(api_url).pipe(res);
});

module.exports = router;
