"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 }, () => {
    console.log("Listening on port 8080.");
});
let userCount = 0;
let allUsers = [];
wss.on("connection", (socket) => {
    userCount += 1;
    console.log("Connected to websocket");
    console.log("User Counts = " + userCount);
    socket.on("message", (message) => {
        var _a, _b, _c, _d, _e, _f;
        //@ts-ignore
        const parsedMessage = JSON.parse(message);
        console.log(`type=${(_a = parsedMessage.roomObj) === null || _a === void 0 ? void 0 : _a.type}, roomId=${(_b = parsedMessage.roomObj) === null || _b === void 0 ? void 0 : _b.payload.roomId}, username=${(_c = parsedMessage.roomObj) === null || _c === void 0 ? void 0 : _c.payload.username}`);
        if (((_d = parsedMessage.roomObj) === null || _d === void 0 ? void 0 : _d.type) == "join") {
            // console.log("AAAA")
            allUsers.push({
                //@ts-ignore
                socket,
                id: allUsers.length + 1,
                roomId: (_e = parsedMessage.roomObj) === null || _e === void 0 ? void 0 : _e.payload.roomId,
                username: (_f = parsedMessage.roomObj) === null || _f === void 0 ? void 0 : _f.payload.username,
            });
            console.log("BBBB");
        }
        console.log("Pushed Users to Array = " + allUsers.length);
        allUsers.forEach(element => {
            console.log(`UserId - ${element.id}, Room - ${element.roomId}, Username - ${element.username}`);
        });
        if (parsedMessage.type == "chat") {
            for (let i = 0; i < allUsers.length; i++) {
                if (allUsers[i].roomId === parsedMessage.payload.roomId && allUsers[i].username !== parsedMessage.payload.username) {
                    // const msg = socket.send(parsedMessage.payload.message);
                    console.log("Received Data = " + parsedMessage.payload.message);
                    // socket.send(parsedMessage.payload.message);
                    allUsers[i].socket.send(JSON.stringify(parsedMessage));
                    // console.log("recieved msg = " + msg + ", type of msg = "+typeof msg)
                }
            }
            // socket.send(parsedMessage.payload.message)
        }
        console.log("All users = " + allUsers.length);
        // console.log("message type before parsing = " + typeof message);
        // //@ts-ignore
        // let inputReq: User = JSON.stringify(message)
        // console.log(inputReq);
        // console.log("Message type after parsing  = " + typeof inputReq)
    });
});
