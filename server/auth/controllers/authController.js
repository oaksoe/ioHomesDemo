var auth = require('../modules/auth');
var crypto = require('../helpers/crypto');

exports.signUser = (user) => {
    return auth.signUser(user.email);
}

exports.validatePassword = (dbPassword, userPassword) => {
    var decryptedPassword = crypto.decrypt(dbPassword);
    return userPassword === decryptedPassword;
}
