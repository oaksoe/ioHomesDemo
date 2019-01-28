// success
exports.SUCCESS = { reqStatus: "SUCCESS" };

// security/authentication errors
exports.NO_AUTH_TOKEN = { reqStatus: "ERROR", messages:[{messageCode: "SEC001", messageText: "no auth token provided"}]};
exports.INVALID_AUTH_TOKEN = { reqStatus: "ERROR", messages:[{messageCode: "SEC002", messageText: "invalid token or token expired"}]};
exports.INVALID_USER = { reqStatus: "ERROR", messages:[{messageCode: "SEC003", messageText: "invalid user"}]};
exports.TOKEN_DELETED = { reqStatus: "ERROR", messages:[{messageCode: "SEC004", messageText: "token deleted"}]};
exports.INVALID_PASSWORD = { reqStatus: "ERROR", messages:[{messageCode: "SEC005", messageText: "invalid password"}]};
