var redis = require('redis');

exports.connect = () => {
    return new Promise((resolve, reject) => {
        connection = redis.createClient();

        connection.on('error', (err) => {
            console.log('Redis connection failed');
            reject(err);
        });

        connection.on('connect', () => {
            console.log('connected to Redis server');
            resolve(connection);
        });
    });    
}

exports.getFromList = (connection, key) => {
    return new Promise((resolve, reject) => {
        connection.lrange(key, 0, -1, (err, results) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                for (var i = 0; i < results.length; i++) {
                    results[i] = JSON.parse(results[i]);
                }

                resolve(results);
            }
        });
    });
}

exports.pushToList = (connection, key, value) => {
    value = JSON.stringify(value);
    return new Promise((resolve, reject) => {
        connection.multi().rpush(key, value).exec((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

exports.publish = (connection, channel, message) => {
    connection.publish(channel, JSON.stringify(message));    
}

exports.subscribe = (connection, channel) => {
    connection.subscribe(channel); 
}

exports.onMessageReceived = (connection, cb) => {
    connection.on("message", function (channel, message) {
        cb({
            channel: channel,
            message: JSON.parse(message)
        });
    });    
}
