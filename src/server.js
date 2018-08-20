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
});
