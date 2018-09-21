const constant = {
  port: 8000, // 监听端口
  allowDomain: 'http://localhost:3000',
  defaultRowNum: 3000, // K线初始记录数
  intervalTime: 1000, // 定时推送时间间隔
};

module.exports = {
  constant,
};
