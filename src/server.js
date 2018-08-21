const server = require('http').createServer();

const io = require('socket.io')(server, {
  path: '/exchange',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
});

server.listen(8000);

io.on('connect', socket => {
  console.log(socket.id);
  socket
    .on('SUBSCRIBE_MARKET_DATA', data => {
      socket.emit('MARKET_DATA', {
        trans: data,
        coins: [['ENB', 0, 0], ['ECHO', 0, 0]],
      });
    })
    .on('SWITCH_MARKET_DATA', data => {
      socket.emit('MARKET_DATA', {
        trans: data,
        coins: [['ENB', 0, 0], ['ECHO', 0, 0]],
      });
    });
});
