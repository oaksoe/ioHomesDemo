var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var helmet = require('helmet');
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');
var config = require('./helpers/config');

var app = express();
var appConfig = config.get(app.get('env'));
var logStream = fs.createWriteStream(path.join(__dirname, 'logs'), { flags: 'a' })

app.use(helmet());
app.use(morgan('dev', { stream: logStream }));
app.use(bodyParser.json({limit: appConfig.app.http.jsonLimit }));
app.use(bodyParser.urlencoded({limit: appConfig.app.http.jsonLimit, extended: true}));
app.use(cookieParser());

// init modules
var http = require('./modules/http');
var db = require('./modules/db');
http.init(appConfig.app.http);
db.init(appConfig.db);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

//production error handler
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.send(err);
	logger.error(`error: status=${err.status} message:${err}`);
	logger.error(err);
});

var server = app.listen(appConfig.app.port, appConfig.app.host, () => {
	console.log('ioHomes api server listening on address ' + 
		server.address().address + ":"+ server.address().port);
})

process.on('SIGINT', function(){
	console.log('App exited!');
    process.exit(0);
});
