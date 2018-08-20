let io = require('socket.io')();

function removeCache() {
  for (const key in require.cache) {
    if (key.includes('mock')) delete require.cache[key];
  }
}

function getData() {
  var str = '../mock/index';
  removeCache();
  try {
    return require(str);
  } catch (e) {
    console.log(e);
    return 'mock数据有问题';
  }
}

io.on('connection', socket => {
  console.log('新用户加入');
  socket.emit('chart:depth', {
    data: getData().depth,
    action: 'first get',
    msg: 'success',
  });
});
module.exports = io;
