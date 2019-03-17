var server = require('http').createServer();
var io = require('socket.io')(server);
var redis = require('./lib/redis');

redis.connect().then(connection => {
    redis.subscribe(connection, 'chat');
});

io.on('connection', socket => {
    console.log('client connected.');    
    redis.onMessageReceived(connection, result => {
        console.log(result);
        socket.emit('chat', result);
    });
    
    socket.on('disconnect', () => {
        console.log('socket disconnected');   
    });

    // socket.on('ionic', () => { 
    //     console.log('from ionic app');    
    // });
});

server.listen(3000);
