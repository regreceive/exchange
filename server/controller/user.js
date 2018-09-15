exports.userData = ctx => {
  ctx.body = {
    status: 'ok',
    data: {
      assets: {
        usdt: 1,
        btc: 0,
        eth: 1,
        etc: 2,
      },
    },
  };
};
