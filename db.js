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
var findOneByOriURL = function(oriURL, done){
  return urlConverter.findOne({oriURL:oriURL}, (err,data)=>{
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
exports.createAndSaveURL = createAndSaveURL;