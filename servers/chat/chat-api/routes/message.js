var express = require('express');
var router = express.Router();
var redis = require('../lib/redis');
var http = require('../modules/http');

var add = (req, res) => {
    var chat = req.body;
    
    redis.connect().then(connection => {
        redis.publish(connection, 'chat', chat);
        redis.pushToList(connection, chat.id, chat.data)
            .then(() => {
                http.res(res, null);
            }, (err) => {
                http.err(res, err);
            });
    });
}

var fetch = (req, res) => {
    var chatID = req.params.chatID;

    redis.connect().then(connection => {
        redis.getFromList(connection, chatID)
            .then(results => {
                http.res(res, results);
            }, (err) => {
                http.err(res, err);
            });
    });
}

router.post('/add', add);
router.get('/:chatID', fetch);

module.exports = router;
