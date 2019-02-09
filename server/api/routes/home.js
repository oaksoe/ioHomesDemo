var express = require('express');
var router = express.Router();
var http = require('../modules/http');
// var homeController = require('../controllers/homeController');

var create = async (req, res) => {
    var home = req.body;

    try {
        // var result = await homeController.create(home);
        // http.res(res, result);
        http.res(res, home);
    } catch(err) {
        http.err(res, err);
    }
}

router.post('/create', create);

module.exports = router;
