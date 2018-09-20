const Router = require('koa-router');
const api = require('../controller/user');

const router = new Router();
router.get('/user-data', api.userData);

module.exports = router;
