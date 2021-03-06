
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , database = require('./database')
  , retrieve = require('./retrieve');


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/go', function(req, res) {
	var something = function(arr) {
		database.addtodb(arr);
	}
	//retrieve.retrieveData("FL", "L");
	retrieve.retrieveData("FL", "U", something);
	// retrieve.retrieveData("SP", "L");
	// retrieve.retrieveData("SP", "U");
	// retrieve.retrieveData("SU", "L");
	// retrieve.retrieveData("SU", "U");
	
	routes.index(req, res);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
