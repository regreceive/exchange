const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const onError = require('koa-onerror');
const logger = require('koa-logger');
const WebSocket = require('ws');

const socket = require('./socket');
const router = require('./router');

const app = new Koa();
const server = require('http').createServer(app.callback());
const wss = new WebSocket.Server({ server, path: '/ws' });

socket(wss);

const allowHost = 'localhost';
const allowPort = 3000;

onError(app);
app.use(
  bodyParser({
    enableTypes: ['json', 'form', 'text'],
  }),
);

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async (ctx, next) => {
  await next();
  ctx.set({
    'Access-Control-Allow-Origin': `http://${allowHost}:${allowPort}`,
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers':
      'x-requested-with, accept, origin, content-type',
    'Access-Control-Allow-Credentials': 'true',
  });

  if (ctx.request.method === 'OPTIONS') {
    ctx.response.status = 200;
  }
});

app.use(logger());

app.use(router.routes());

server.listen(8000, () => {
  console.log('listen on ' + 8000);
});
