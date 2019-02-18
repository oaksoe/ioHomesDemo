var nconf = require('nconf');

nconf.argv()
    .env()
    .file({ file: './data/config.json' });

module.exports = nconf;
