var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var helmet = require('helmet');
var morgan = require('morgan');
var cors = require('cors');
var request = require('request');
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

// create proxy
var apiProxy = httpProxy.createProxyServer();

// restream body before proxy
// Ref: https://github.com/nodejitsu/node-http-proxy/commit/d0e000e1f91a969f1711eb3be7d1acb16c4538df
apiProxy.on('proxyReq', (proxyReq, req, res, options) => {
	if (req.body) {
		var bodyData = JSON.stringify(req.body);

		// incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
		proxyReq.setHeader('Content-Type','application/json');
    	proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
		  
		// stream the content
        proxyReq.write(bodyData);
	}
});

// redirect routes
// Ref: https://codeforgeek.com/2015/12/reverse-proxy-using-expressjs/
app.all('/v1/ioh/pub/api/*', (req, res) => {
	apiProxy.web(req, res, { target: appConfig.app.servers.api });
});

app.post('/v1/ioh/login', bodyParser.json(), (req, res) => {
	var url = appConfig.app.servers.auth + '/v1/ioh/auth/login';
	http.post(url, req.body, (err, resp, body) => {
		if (err) {
			http.err(res, err);
		} else if (resp.statusCode === 200) {
			http.res(res, body);
		} else {
			http.err(res, resp.statusCode);
		}		
	});
});

app.post('/v1/ioh/register', bodyParser.json(), (req, res) => {
	var url = appConfig.app.servers.auth + '/v1/ioh/auth/register';
	var user = req.body;
	http.post(url, {
		email: user.email,
		password: user.password
	}, (err, resp, body) => {
		if (err) {
			http.err(res, err);
		} else if (resp.statusCode === 200) {
			user.id = body.data.id;
			user.password = null;
			req.url = '/v1/ioh/api/user/create';
			req.body = user;
			apiProxy.web(req, res, { target: appConfig.app.servers.api });
		} else {
			http.err(res, resp.statusCode);
		}		
	});
});

app.post('/v1/ioh/api/*', bodyParser.json(), (req, res) => {
	var url = appConfig.app.servers.auth + '/v1/ioh/auth/auth';
	http.post(url, {}, {
		authorization: req.headers.authorization
	}, (err, resp, body) => {
		if (err) {
			http.err(res, err);
		} else if (resp.statusCode === 200) {
			apiProxy.web(req, res, { target: appConfig.app.servers.api });
		} else {
			http.err(res, body);
		}		
	});
});

// app.all('/v1/ioh/auth/*')

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
