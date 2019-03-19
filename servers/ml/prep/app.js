var fs = require('fs');
var amqp = require('./modules/amqp');
var csv = require('./modules/csv');
var rootFilePath = '../../data/ml/';
 
amqp.consume('prep', message => {
    if (message.job === 'default') {
        var filePath = rootFilePath + message.dataType + '.csv' ;
        if (!fs.existsSync(filePath)) {
            csv.write(filePath, [message.data]);
        } else {
            csv.read(filePath, (rows) => {
                if (!rows) {
                    rows = [];
                }
                
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i][0] === message.data.id) {
                        rows[i] = message.data;
                        break;
                    }
                }

                if (i === rows.length) {
                    rows.push(message.data);
                }
                
                csv.write(filePath, rows);
            });
        }	
    }			
});
