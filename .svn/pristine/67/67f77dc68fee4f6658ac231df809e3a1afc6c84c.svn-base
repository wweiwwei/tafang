import WebSocket from 'ws';
import url from 'url';
import { Room } from './Room';
import { Utils } from './Utils';

// 创建WebSocket服务器
const wss = new WebSocket.Server({ port: 8080 });

const roomMap = new Map<number, Room>();
let curRoomId = Utils.uuid();
roomMap.set(curRoomId, new Room(curRoomId));
// 监听连接事件
wss.on('connection', (ws, req) => {
    console.log('新的连接已建立');
    const room1 = roomMap.get(curRoomId)
    if (room1.wsockets.length >= 2) {
        curRoomId = Utils.uuid();
        roomMap.set(curRoomId, new Room(curRoomId));
    }
    const roomId: number = curRoomId;
    const room2 = roomMap.get(roomId);
    const index = room2.addPlayer(ws);
    // 解析URL，获取查询参数
    // const query = url.parse(req.url, true).query;
    // console.log('查询参数:', query);

    // 监听消息事件
    ws.on('message', (message: WebSocket.RawData) => {
        console.log('收到消息: %s', message);
        const data = JSON.parse(message.toString());
        if (data.kind === "battleTeam") {
            room2.addBattleTeam(index, data.data.info)
        } else if (data.kind === "command") {

        }
        // console.log('收到消息: %s', message);

        // // 发送响应消息
        // ws.send('服务器收到消息: ' + message);
    });

    // 监听关闭事件
    ws.on('close', () => {
        console.log('连接已关闭');
    });
});