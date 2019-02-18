// authentication errors
exports.NO_AUTH_TOKEN = { code: "AUTH001", message: "no auth token provided." };
exports.INVALID_AUTH_TOKEN = { code: "AUTH002", message: "invalid token or token expired." };
exports.TOKEN_DELETED = { code: "AUTH003", message: "token deleted." };
exports.INVALID_USER = { code: "AUTH004", message: "invalid user." };
exports.EXISTING_USER = { code: "AUTH005", message: "user already exists." };

// db errors
exports.DB_CONN_ERROR = { code: "DB001", message: "database connection error." };
exports.DB_ERROR = { code: "DB002", message: "database error." };
