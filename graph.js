
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , query_handler = require('./query_handler');


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 80);
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
app.get('/search', function(req, res) {
    var query = {};
    if (req.query.title != undefined) {
        query.title = req.query.title;
    }
    if (req.query.courseno != undefined) {
        query.courseno = req.query.courseno;
    }
    if (req.query.sectionno != undefined) {
        query.sectionno = req.query.sectionno;
    }
    if (req.query.controlno != undefined) {
        query.controlno = req.query.controlno;
    }
    if (req.query.time != undefined) {
        query.time = req.query.time;
    }
    if (req.query.room != undefined) {
        query.room = req.query.room;
    }
    if (req.query.units != undefined) {
        query.units = req.query.units;
    }
    if (req.query.instructor != undefined) {
        query.instructor = req.query.instructor;
    }
    if (req.query.examgroup != undefined) {
        query.examgroup = req.query.examgroup;
    }
    if (req.query.restrictions != undefined) {
        query.restrictions = req.query.restrictions;
    }
    if (req.query.note != undefined) {
        query.note = req.query.note;
    }
    query_handler.querydb(query, function(data) {
        res.send(data);
    });
});

app.get('/:id', function(req, res) {
    query_handler.querydb({controlno: req.params.id}, function(data) {
        res.send(data);
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
