var express = require('express');
var router = express.Router();
var http = require('../modules/http');
var userController = require('../controllers/userController');
var authController = require('../controllers/authController');
var crypto = require('../helpers/crypto');
var status = require('../helpers/status');

var register = async (req, res) => {
    var user = req.body;

    try {
        var foundUser = await userController.find(user.email);
        if (foundUser) {
            http.err(res, status.EXISTING_USER);
        } else {
            user.password = crypto.encrypt(user.password);
            var result = await userController.create(user);
            http.res(res, result);
        }
    } catch(err) {
        http.err(res, err);
    }
}

var login = async (req, res) => {
    var user = req.body;

    try {
        var foundUser = await userController.find(user.email);
        if (foundUser && authController.validatePassword(foundUser.password, user.password)) {
            foundUser.token = authController.signUser(user);
            foundUser.password = null;
            http.res(res, foundUser);
        } else {
            http.err(res, status.INVALID_USER.message);
        }
    } catch(err) {
        http.err(res, err);
    }
}

router.post('/login', login);
router.post('/register', register);

module.exports = router;