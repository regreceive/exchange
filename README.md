> 这是公司项目，只公开部分前端和node.js测试后端，项目脚手架使用eject后的create-react-app，webpack插件经过反复优选，达到了开发便捷和开发效率。前后端通信使用了socket.io和fetch，采用redux和saga做状态管理和异步。可直接用本项目作为你的开发脚手架，我会继续维护。

## 预置命令

安装
```shell
$ yarn install
```

运行
```shell
$ yarn start
```

带调试(sourcemap和css原命名)打包
```shell
$ yarn build
```

产品打包
```shell
$ yarn build:release
```

## 说明

浏览器端使用[socket.io-client](https://github.com/socketio/socket.io-client)，所有的数据请求和服务端返回都遵循以下格式：

```js
["message", 数据...]

// 比如
["message", {"sub":"market.usdt.markets"}]
```
> 为方便阅读，以下所有API都是实际数据，没有套用外面一层消息体，实际开发中请自行包装上述消息体。

### 订阅

***客户端***
成功建立和 WebSocket API 的连接之后，向 Server 发送如下格式的数据来订阅数据：
```js
{
  "sub": "market.$symbol.kline.$period",
  "id": "id generate by client"
}
```

- sub 订阅
- id 客户端自定义

参数名称 | 描述 | 取值
---|---|---
symbol | 交易对 | ethbtc, ltcbtc, etcbtc, bchbtc......
period | K线周期 | 1min, 5min, 15min, 30min, 60min, 1day, 1mon, 1week, 1year

***服务端***
返回订阅成功消息
```js
{
  "id":"",
  "status":"ok",
  "subbed":"market.$symbol.markets",
  "ts":1535445731347
}
```

### 取消订阅

***客户端***
取消当前订阅
```js
{"unsub":"market.$symbol.markets"}
```

***服务端***
返回取消订阅成功消息

```js
{
  "id":"",
  "status":"ok",
  "unsubbed":"market.usdt.markets",
  "ts":1535447792757
}
```
## API

### 市场行情

订阅锚定货币的所有行情
 
- $symbol 交易对。可选：usdt/btc/eth

```js
{"sub":"market.$symbol.markets"}
```

*返回*
- coins: 币种、最新价、涨幅

```js
{
  "id":"",
  "status":"ok",
  "subbed":"market.$symbol.markets",
  "ts":1535445731347
}
{
  "ch":"market.usdt.markets",
  "ts":1535445731347,
  "tick":{
    "coins":[
      ["ENB",1,1],
      ["ECHO",0,0]
    ]
  }
}
```

### 交易对最新行情

提供交易对名称，订阅该最新交易数据

- $symbol 交易对。如：ethusdt/btcusdt/etceth

```js
{"sub":"market.$symbol.latest"}
```

*返回*

- 当前价、涨跌幅、最高价、最低价、24小时成交量

```js
{
  "ch":"market.eth.latest",
  "ts":1535445731844,
  "tick":{
    "latest":[281.51,-1.67,292.08,269.48,98794]
  }
}
```

### 盘口数据

订阅买卖上方挂盘数据

- $symbol 交易对

```js
{"sub":"market.$symbol.orders"}
```

*返回*
- sell: 卖盘 [价格、量、累计] *价格降序*
- buy: 买盘 [价格、量、累计] *价格升序*

```js
{
  "ch":"market.eth.orders",
  "ts":1535445731844,
  "tick":{
    "sell":[
      [281.96,0.5,5.5038],
      [282,0.5,5.5038],
      ...
    ],
    "buy":[
      [282.37,3.0309,7.8876],
      ...
    ]
  }
}
```

### 成交明细

订阅实时成交

```js
{"sub":"market.$symbol.deals"}
```

*返回*

[timestamp, 方向, 成交价, 数量]

```js
{
  "ch":"market.ethusdt.deals",
  "ts":1535529998712,
  "tick":{
    "deals":[
      [1535529998712,0,100,200],
      ...
    ]
  }
}
```
