// const Websocket = require('ws');

const { WEBSOCKET_PORT } = require("../config/config.default");
const Websocket = require('ws');

;((Ws) => {
    // 生成一个 ws 服务器实例
    const server = new Ws.WebSocketServer(`{ ${ WEBSOCKET_PORT } }`);
    // 定义 保存所有跟 socket链接的用户
    const sockets = [];

    const init = () => {
        bindEvent();
    }

    function bindEvent() {
        server.on('open', handleOpen);
        server.on('close', handleClose);
        server.on('error', handleError);
        // 定义一个事件，用来链接前端
        server.on('connection', handleConnection);
    }

    function handleOpen() {
        console.log("WebSocket open");
    }

    function handleClose() {
        console.log("WebSocket close");
    }

    function handleError() {
        console.log("WebSocket error");
    }

    function handleConnection(ws) {
        console.log("WebSocket Connection");
        ws.on('message', handleMessage);
    }

    function handleMessage(msg) {
        console.log(msg);
        server.clients.forEach((c) => {
            c.send(msg);
        })
    }
    init();
})(Websocket)


/**
 * (socket) => {
 *         // socket 用户  记录谁连接了这个服务
 *
 *         // 把接入的用户记录起来
 *         sockets.push(socket);
 *
 *         // 定义一个事件 message 前端连接后发送的消息 事件会触发
 *         socket.on("message", (msg) => { // 前端发送过来的消息 (ws.send)
 *             sockets.forEach(item => {
 *                 if (item.readyState === 1) {
 *                     if (item !== socket) {
 *                         item.send(msg)
 *                     }
 *                 }
 *             })
 *
 *         })
 *     }
 * */
