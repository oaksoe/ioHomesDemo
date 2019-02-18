var jwt = require('jsonwebtoken');
var status = require('../helpers/status');
var authConfig; 

exports.signUser = (user) => {
	var token = jwt.sign({ user:user }, authConfig.jwtSecret, {
		expiresIn : "24h"
    });
    
	// console.log(`sign user(${user}) - return token (${token})`);
	return token;
}

exports.authenticateRequest = () => {
	return (req, res, next) => {
		var authToken = req.headers.authorization;
		console.log("authToken: " + authToken);

		if (authToken) {
			jwt.verify(authToken, authConfig.jwtSecret, (err, decoded) => {
				if (err) { 
	 				res.status(500).json({ error: status.INVALID_AUTH_TOKEN });
				} else {
					var user = decoded.user;
					console.log("authToken contains: " + user);					
					next();
				}
			});
		} else {
			res.status(500).json({ error: status.NO_AUTH_TOKEN });
		}
	};
}

exports.init = (config) => {
	console.log("Auth module initialized.");
	authConfig = config;
}
