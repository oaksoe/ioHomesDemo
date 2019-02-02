// success
exports.SUCCESS = { reqStatus: "SUCCESS" };

// db errors
exports.DB_CONN_ERROR = { reqStatus: "ERROR", messages: [{ messageCode: "DB001", messageText: "database connection error" }] };
exports.DB_ERROR = { reqStatus: "ERROR", messages: [{ messageCode: "DB002", messageText: "database error" }] };
