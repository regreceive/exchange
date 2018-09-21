const mock = require('../mock');

exports.kline = ctx => {
  const json = ctx.request.body;
  const [, symbol, channel, period] = json.req.split('.');
  const data = mock.kline.getAll(period);
  ctx.body = {
    rep: `market.${symbol}.${channel}.${period}`,
    status: 'ok',
    id: json.id || '',
    tick: data,
  };
};
