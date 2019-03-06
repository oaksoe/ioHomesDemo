var dbController = require('./dbController');
var db = require('../modules/db');
var uuid = require('../helpers/uuid');
var status = require('../helpers/status');

exports.create = async (user) => {
    if (!user.id) {
        user.id = uuid.create();
    }

    try {
        var dbConn = db.collection('user');
        var result = await dbController.create(dbConn, user);
        return {
            id: result.ops[0].id
        };
    } catch(err) {
        await Promise.reject(new Error(status.DB_ERROR.message));
    }
}

exports.find = async (email) => {
    try {
        var dbConn = db.collection('user');
        return await dbController.find(dbConn, { email: email });
    } catch(err) {
        await Promise.reject(new Error(status.DB_ERROR.message));
    }
}
