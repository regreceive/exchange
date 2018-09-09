const app = require('express')();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');

const api = require('./controller');
const socket = require('./socket');

const io = require('socket.io')(server, {
  path: '/ws',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
});

socket(io);

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || 'localhost';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `http://${HOST}:${DEFAULT_PORT}`);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'x-requested-with,Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/user/user-data', api.userData);

server.listen(8000);
