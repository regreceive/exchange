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
    })
    .on('SUBSCRIBE_LATEST', data => {
      socket.emit('LATEST', [281.51, -1.67, 292.08, 269.48, 98794]);
    })
    .on('SUBSCRIBE_ORDERS', data => {
      socket.emit('ORDERS', {
        sell: [[281.96, 0.5, 5.5038], [282.37, 3.0309, 7.8876]],
        buy: [[181.96, 1.5, 5.5038], [182.37, 3.0309, 17.8876]],
      });
    });
});
