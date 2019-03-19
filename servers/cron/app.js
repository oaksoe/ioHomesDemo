var amqp = require('./modules/amqp');
var CronJob = require('cron').CronJob;
var timezone = 'Asia/Singapore'; // http://momentjs.com/timezone/

new CronJob('0 0 0 * * *', function() {
    console.log('Cron launched at ', new Date());
    amqp.publish('ml', {
        job: 'default',
        jobType: 'clustering',
        data: null
    });
}, null, true, timezone);
