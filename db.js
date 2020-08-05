//connect db

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


//Create Schema
var Schema = mongoose.Schema;
var urlSchema =new Schema({
  oriURL: { type: String, required: true },
  shortURL: String,
});
var urlConverter = mongoose.model("urlConverter", urlSchema);

//function

//get
var findLastCode = function(done){
  urlConverter.findOne().sort('shortURL',1).run((err,data)=>{
    done(null,data.shortURL);
  });
} 

var findOneByOriURL = function(oriURL, done){
   urlConverter.findOne({oriURL:oriURL}, (err,data)=>{
    if(err){ return console.log(err)}
    done(null,data);
  });
};

var findOneByShortURL = function(shortURL, done){
   urlConverter.findOne({shortURL:shortURL}, (err,data)=>{
    if(err){ return console.log(err)}
    done(null,data);
  });
};

//insert
var createAndSaveURL = function(urlPair,done){
  urlPair.save((err,data)=>{
    if(err) {return console.log(err)}
    done(null,data);
  });
}
//export
exports.urlConverter = urlConverter;
exports.findOneByOriURL = findOneByOriURL;
exports.findOneByShortURL = findOneByShortURL;
exports.createAndSaveURL = createAndSaveURL;
exports.findLastCode = findLastCode;