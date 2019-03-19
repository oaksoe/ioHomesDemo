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

var getDeviceToggleState = async (req, res) => {
    var deviceType = req.params['type'];
    var deviceName = req.params['name'];

    try {
        var state = await deviceController.getToggleState(deviceType, deviceName);
        http.res(res, {state: state});
    } catch(err) {
        http.err(res, err);
    }
}

router.post('/toggle', toggleDevice);
router.get('/toggle/state/:type/:name', getDeviceToggleState);

module.exports = router;
