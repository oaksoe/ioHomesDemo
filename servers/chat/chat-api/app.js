var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var helmet = require('helmet');
var morgan = require('morgan');
var cors = require('cors');
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
http.init(appConfig.app.http);

// set cors
app.use(cors(http.corsOptions()));

// routes
var messageRoute = require('./routes/message');
app.use('/v1/ioh/chat/message/', messageRoute);

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
});

var server = app.listen(appConfig.app.port, appConfig.app.host, () => {
	console.log('ioHomes chat api server listening on address ' + 
		server.address().address + ":"+ server.address().port);
});

process.on('uncaughtException', function (err) {
    console.log(err);
});

process.on('SIGINT', function(){
	console.log('App exited!');
    process.exit(0);
});

// redis.connect().then(connection => {
//     redis.setData(connection, 'messages', 'hello').then(() => {
//         redis.getData(connection, 'messages').then(message => {
//             console.log(message);
//         });
//     });
// });
