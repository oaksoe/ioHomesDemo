// Ref: https://codeforgeek.com/2018/10/encrypt-and-decrypt-data-in-node-js/
var crypto = require('crypto');
var algorithm = 'aes-256-cbc';
var key = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'; 

// todo: security - use 'var key = crypto.randomBytes(32);' and save the key in db for each user

exports.encrypt = (text) => {
    var cipher = crypto.createCipher(algorithm, Buffer.from(key));
    var encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}

exports.decrypt = (text) => {
    var encryptedText = Buffer.from(text, 'hex');
    var decipher = crypto.createDecipher(algorithm, Buffer.from(key));
    var decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
