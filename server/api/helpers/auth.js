var jwt = require('jsonwebtoken');
var status = require('./status');
var config = require('./helpers/config.js');
var appConfig = config.get(app.get('env'));

exports.signUser = (user) => {
	var token = jwt.sign({user:user}, appConfig.api.jwtSecret, {
		expiresIn : "24h"
    });
    
	console.log(`sign user(${user}) - return token (${token})`);
	return token;
}

exports.authenticateRequest = () => {
	return (req, res, next) => {
		var authToken = req.headers.authorization;
		console.log("authToken: " + authToken);

		if (authToken) {
			jwt.verify(authToken, appConfig.api.jwtSecret, (err, decoded) => {
				if (err) { 
	 				res.json({ status: status.INVALID_AUTH_TOKEN });
				} else {
					var user = decoded.user;
					console.log("authToken contains: " + user);					
					next();
				}
			});
		} else {
			res.json({ status: status.NO_AUTH_TOKEN });
		}
	};
}
