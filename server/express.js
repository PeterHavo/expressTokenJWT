var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
const morgan = require("morgan");
const router = require("./routes/routes")
const apiroutes = require("./routes/apiroutes")


const express = require("express");
const app = express();
const port = process.env.PORT ||  3001 

// connect to db

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };       
 
var mongodbUri = 'mongodb://havoc:havoc@ds157964.mlab.com:57964/auth';

mongoose.connect(mongodbUri, options)
const conn = mongoose.connection
conn.on('error', console.error.bind(console, 'connection error:'));  
 
conn.once('open', function() {
    console.log(`connected to db`)
  // Wait for the database connection to establish, then start the app.                         
});



//SETUP APP
//use morgan 
 app.use(morgan('dev'));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use('/', router)
app.use('/api', apiroutes)


//start server

app.listen(port, (err) => {
    if (err){
        throw Error('new error')
    } console.log(`app is up and runnig using porrt ${port}`)
    
})





