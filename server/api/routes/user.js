var express = require('express');
var router = express.Router();
var http = require('../modules/http');
var userController = require('../controllers/userController');
var status = require('../helpers/status');

var create = async (req, res) => {
    var user = req.body;

    try {
        var result = await userController.create(user);
        http.res(res, result);
    } catch(err) {
        http.err(res, err);
    }
}

router.post('/create', create);

module.exports = router;
