'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var db = require('./db.js');
var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;
var url_counter = 0;
/** this project needs a db !! **/ 
//refer to db.js

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

//helper function

// your first API endpoint... 
app.post("/api/shorturl/new", function (req, res,next) {
  var oriurl = req.body['url'];
  //find db
  db.findOneByOriURL(oriurl, (err,data)=>{
    if(err) {return next(err)}
    console.log('data is '+ data);
    var new_url;
    if(!data){
      //save
      //first draft use counter
      var urlPair = db.urlConverter({oriURL:oriurl,shortURL:url_counter++});
      db.createAndSaveURL(urlPair, (err,data)=>{
        if(err) {return next(err)}
        res.json({original_url: data['oriURL'],
                short_url:data['shortURL']});
      })
    }else{
      res.json({original_url: data['oriURL'],
                short_url:data['shortURL']});
    }
  });
});

app.get("/api/shorturl/:shorturl", function(req, res, next){
  
});


app.listen(port, function () {
  console.log('Node.js listening ...');
});