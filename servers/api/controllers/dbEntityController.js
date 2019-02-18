var dbController = require('./dbController');
var db = require('../modules/db');
var status = require('../helpers/status');

exports.create = async (entity, data) => {
    try {
        var dbConn = db.collection(entity);
        var result = await dbController.create(dbConn, data);
        return {
            id: result.ops[0].id
        };
    } catch(err) {
        await Promise.reject(new Error(status.DB_ERROR.message));
    }
}

exports.update = async (entity, data, criteria) => {
    try {
        var dbConn = db.collection(entity);
        await dbController.update(dbConn, data, criteria);
    } catch(err) {
        await Promise.reject(new Error(status.DB_ERROR.message));
    }
}

exports.remove = async (entity, criteria) => {
    try {
        var dbConn = db.collection(entity);
        await dbController.remove(dbConn, criteria);
    } catch(err) {
        await Promise.reject(new Error(status.DB_ERROR.message));
    }
}

exports.find = async (entity, criteria) => {
    try {
        var dbConn = db.collection(entity);
        return await dbController.find(dbConn, criteria);
    } catch(err) {
        await Promise.reject(new Error(status.DB_ERROR.message));
    }
}
