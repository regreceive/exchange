const Router = require('koa-router');
const api = require('../controller/kline');

const router = new Router();
router.get('/kline', api.kline);

module.exports = router;
