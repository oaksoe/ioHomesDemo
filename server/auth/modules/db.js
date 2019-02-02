var mongoClient = require('mongodb').MongoClient;
var dbConfig;
var dbConnection;

exports.collection = (name) => {
    return dbConnection.collection(name);
}

exports.disconnect = () => {
    if (dbConnection) {
        dbConnection.close();
    }
}

exports.init = (config) => {
    console.log('db module initialized.');
    dbConfig = config;

    var dbUrl = 'mongodb://' + dbConfig.mongo.host + ':' + dbConfig.mongo.port + '/' + dbConfig.mongo.dbMain;
    mongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {                    
        if(err) throw err;
        console.log('mongodb connected and listening on address ' +  
            dbConfig.mongo.host + ':'+ dbConfig.mongo.port);
        dbConnection = db;
    });
}
