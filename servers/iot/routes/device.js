var express = require('express');
var router = express.Router();
var http = require('../modules/http');
var deviceController = require('../controllers/deviceController');

var toggleDevice = async (req, res) => {
    var device = req.body;

    try {
        await deviceController.toggle(device);
        http.res(res, null);
    } catch(err) {
        http.err(res, err);
    }
}

router.post('/toggle', toggleDevice);

module.exports = router;
