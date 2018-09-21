const utils = require('./lib/utils');
const config = require('../config');

const now = new Date().getTime();

const getAll = period => {
  const step = utils.getMillisecond(period) / 3;
  const params = {
    step,
    length: config.constant.defaultRowNum,
    type: 'prev',
    startTime: from,
    endTime: to,
  };

  let result = utils.getMockData(params);
  let returnData = {};
  let compareTime = now - step;

  if (compareTime >= from) {
    returnData = {
      code: 0,
      type: 'kline',
      data: {
        kLine: {
          ...result,
          s: 'ok',
        },
      },
    };
  } else {
    returnData = {
      code: 0,
      type: 'kline',
      data: {
        kLine: {
          t: [],
          c: [],
          o: [],
          h: [],
          l: [],
          v: [],
          s: 'ok',
        },
      },
    };
  }

  // 发送历史数据
  ws.send(JSON.stringify(returnData));
};

// 追加一条kline数据
function append({ step, endTime, delta }) {
  const params = {
    step,
    length: 1,
    type: 'next',
    delta,
    endTime,
  };

  const result = utils.getMockData(params);
  let { t, c, o, h, l, v } = result;
  return {
    code: 0,
    type: 'dealSuccess',
    data: {
      kLine: {
        t: t[0],
        c: c[0],
        o: o[0],
        h: h[0],
        l: l[0],
        v: v[0],
        s: 'ok',
      },
    },
  };
}

module.exports = {
  getAll,
  append,
};
