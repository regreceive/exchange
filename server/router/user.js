const User = require('koa-router');
const api = require('../controller/user');

const router = new User();
router.get('/user-data', api.userData);

module.exports = router;
