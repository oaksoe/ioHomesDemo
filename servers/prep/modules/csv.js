var csv = require('fast-csv');
var fs = require('fs');

exports.read = (filePath, cb) => {
    var rows = [];
    csv.fromPath(filePath)
		.on('data', function (data) {
			rows.push(data);
		})
		.on("end", function () {
			cb(rows);
		});
}

exports.write = (filePath, rows) => {
    var csvStream = csv.createWriteStream({headers: true});
    writableStream = fs.createWriteStream(filePath);
    
    writableStream.on('finish', () => {
        console.log('csv write done.');
    });

    csvStream.pipe(writableStream);

    for (var i = 0; i < rows.length; i++) {
        csvStream.write(rows[i]);
    }

    csvStream.end();
}
