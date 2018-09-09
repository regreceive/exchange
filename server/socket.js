function send(socket, data) {
  console.log('send', JSON.stringify(data));
  socket.send(JSON.stringify(data));
}

function subHandle(socket, symbol, extraArgs, data, channel) {
  send(socket, {
    id: data.id || '',
    status: 'ok',
    subbed: `market.${symbol}.${channel}`,
    ts: Date.now(),
  });
}

function unsubHandle(socket, symbol, extraArgs, data) {
  send(socket, {
    id: data.id || '',
    status: 'ok',
    unsubbed: `market.${symbol}.markets`,
    ts: Date.now(),
  });
}

function marketsHandle(socket, symbol, extraArgs, data) {
  subHandle(socket, symbol, extraArgs, data, 'markets');

  send(socket, {
    ch: `market.${symbol}.markets`,
    ts: Date.now(),
    tick: {
      markets: [['ENB', 1, 1], ['ECHO', 0, 0]],
    },
  });
}

function latestHandle(socket, symbol, extraArgs, data) {
  subHandle(socket, symbol, extraArgs, data, 'latest');

  send(socket, {
    ch: `market.${symbol}.latest`,
    ts: Date.now(),
    tick: {
      latest: [0.007, -1.67, 292.08, 269.48, 98794],
    },
  });
}

function ordersHandle(socket, symbol, extraArgs, data) {
  subHandle(socket, symbol, extraArgs, data, 'orders');

  send(socket, {
    ch: `market.${symbol}.orders`,
    ts: Date.now(),
    tick: {
      sell: [[281.96, 0.5, 5.5038]],
      buy: [[282.37, 3.0309, 7.8876]],
    },
  });
}

function dealsHandle(socket, symbol, extraArgs, data) {
  subHandle(socket, symbol, extraArgs, data, 'deals');

  send(socket, {
    ch: `market.${symbol}.deals`,
    ts: Date.now(),
    tick: {
      deals: [[Date.now(), 0, 100, 200], [Date.now(), 1, 50, 220]],
    },
  });
}

function removeCache() {
  for (const key in require.cache) {
    if (key.includes('mock')) delete require.cache[key];
  }
}

function requestDepthHandle() {
  const depth = './depth';
  removeCache();
  try {
    return require(depth);
  } catch (e) {
    console.log(e);
  }

  //   socket.emit('chart:depth', {
  //     data: getData().depth,
  //     action: 'first get',
  //     msg: 'success',
  //   });
}

module.exports = ws => {
  ws.on('connect', socket => {
    console.log('connected[id]: ', socket.id);
    socket.on('message', text => {
      const data = JSON.parse(text);
      console.log('receive', text);
      if (data.hasOwnProperty('sub')) {
        // 订阅
        const [, symbol, channel, ...extraArgs] = data.sub.split('.');
        switch (channel) {
          case 'markets':
            marketsHandle(socket, symbol, extraArgs, data);
            break;
          case 'latest':
            latestHandle(socket, symbol, extraArgs, data);
            break;
          case 'orders':
            ordersHandle(socket, symbol, extraArgs, data);
            break;
          case 'deals':
            dealsHandle(socket, symbol, extraArgs, data);
        }
      } else if (data.hasOwnProperty('unsub')) {
        const [, symbol, channel, ...extraArgs] = data.unsub.split('.');
        switch (channel) {
          case 'markets':
          case 'latest':
            unsubHandle(socket, symbol, extraArgs, data);
            break;
        }
      }
    });
  });
};
