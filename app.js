var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;
var expressValidator = require('express-validator');

var multer = require('multer');
var upload = multer({dest: './uploads'});

var flash = require('connect-flash');
var bcrypt = require('bcryptjs');

var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//handle file uploads

const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
const uri = "mongodb://mongodb-stitch-landmarks-koccm:1234@clustercool-shard-00-00-2nkfw.mongodb.net:27017,clustercool-shard-00-01-2nkfw.mongodb.net:27017,clustercool-shard-00-02-2nkfw.mongodb.net:27017/test?ssl=true&replicaSet=ClusterCool-shard-0&authSource=admin&retryWrites=true"
MongoClient.connect(uri, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/*app.use(express.json());
app.use(express.urlencoded({ extended: false }));*/
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//handles sesssions
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

// passsport 
app.use(passport.initialize());
app.use(passport.session());


//validator
app.use(expressValidator({
	errorFormatter: function(param,msg, value){
		var namespace = param.split('.')
		, root = namespace.shift()
		, formParam = root;

		while (namespace.length){
			formParam += '[' +namespace.shift() + ']';
		}
		return {
			param: formParam,
			msg: msg,
			value: value
		};
	}
}));

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.get('*',function(req,res,next){
	res.locals.user = req.user || null;
	next();
})

app.get('/javascripts/googleapi.js', function(req,res,next){
	res.locals
})

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err);
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
