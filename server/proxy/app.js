var express = require('express');
var cookieParser = require('cookie-parser');
var helmet = require('helmet');
var morgan = require('morgan');
var cors = require('cors');
var fs = require('fs');
var path = require('path');
var httpProxy = require('http-proxy');
var config = require('./helpers/config');

var app = express();
var appConfig = config.get(app.get('env'));
var logStream = fs.createWriteStream(path.join(__dirname, 'logs'), { flags: 'a' })

app.use(helmet());
app.use(morgan('dev', { stream: logStream }));
app.use(cookieParser());

// init modules
var http = require('./modules/http');
http.init(appConfig.app.http);

// set cors
app.use(cors(http.corsOptions()));

// redirect routes
// Ref: https://codeforgeek.com/2015/12/reverse-proxy-using-expressjs/
var apiProxy = httpProxy.createProxyServer();
app.all('/v1/ioh/auth/*', (req, res) => {
	apiProxy.web(req, res, { target: appConfig.app.servers.auth })
});

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
    console.log('ioHomes proxy server listening on address ' + 
    	server.address().address + ':'+ server.address().port);
})

process.on('SIGINT', function(){
	console.log('App exited!');
    process.exit(0);
});
