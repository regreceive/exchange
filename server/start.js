var server = require('http').createServer();
let io = require('socket.io')(server);
server.listen(8000, _ => {
  console.log(`服务启动成功`);
});

// })
//
// server.listen(8000, function listening () {
//   console.log('服务器启动成功！')
// })

/*

// 初始化一个 WebSocket 对象
var ws = new WebSocket("ws://localhost:1000");

// 建立 web socket 连接成功触发事件
ws.onopen = function () {
  // 使用 send() 方法发送数据
  ws.send("发送数据");
  alert("数据发送中...");
};

// 接收服务端数据时触发事件
ws.onmessage = function (evt) {
  var received_msg = evt.data;
  alert("数据已接收...");
};

// 断开 web socket 连接成功触发事件
ws.onclose = function () {
  alert("连接已关闭...");
};

* */
