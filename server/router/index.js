const Router = require('koa-router');

const user = require('./user');
const exchange = require('./exchange');

const router = new Router();

router.use('/api/user', user.routes());
router.use('/api/exchange', exchange.routes());

module.exports = router;
