// success
exports.SUCCESS = { reqStatus: "SUCCESS" };

// authentication errors
exports.NO_AUTH_TOKEN = { reqStatus: "ERROR", messages: [{ messageCode: "AUTH001", messageText: "no auth token provided" }] };
exports.INVALID_AUTH_TOKEN = { reqStatus: "ERROR", messages: [{ messageCode: "AUTH002", messageText: "invalid token or token expired" }] };
exports.INVALID_USER = { reqStatus: "ERROR", messages: [{ messageCode: "AUTH003", messageText: "invalid user" }] };
exports.TOKEN_DELETED = { reqStatus: "ERROR", messages: [{ messageCode: "AUTH004", messageText: "token deleted" }] };
exports.INVALID_PASSWORD = { reqStatus: "ERROR", messages: [{ messageCode: "AUTH005", messageText: "invalid password" }] };

// db errors
exports.DB_CONN_ERROR = { reqStatus: "ERROR", messages: [{ messageCode: "DB001", messageText: "database connection error" }] };
exports.DB_ERROR = { reqStatus: "ERROR", messages: [{ messageCode: "DB002", messageText: "database error" }] };
