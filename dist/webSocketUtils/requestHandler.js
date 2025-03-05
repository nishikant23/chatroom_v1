"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestHandler = void 0;
const sendMessageToConnections_1 = require("./sendMessageToConnections");
const socketManager_1 = require("./managers/socketManager");
const roomManager_1 = require("./managers/roomManager");
///////--------------------------------------------------------------------------------------------------------------------------------------------------/////
const requestHandler = (connection, objectPayload) => {
    try {
        const parsedObjectPayload = JSON.parse(objectPayload.toString());
        //ENTER ROOM 
        if (parsedObjectPayload.type === "enterRoom") {
            //------------------------------CONNECTION-USERS ARR---------------------------------------//
            (0, socketManager_1.socketManager)(connection, parsedObjectPayload);
        }
        //CHAT
        if (parsedObjectPayload.type === "chat") {
            //------------------------------SEND Message to Connections--------------------------------------//
            (0, roomManager_1.roomManager)(parsedObjectPayload);
            //------------------------------SEND Message to Connections--------------------------------------//
            (0, sendMessageToConnections_1.sendMessageToConnections)(parsedObjectPayload);
        }
        //HEART BEAT
        if (parsedObjectPayload.type === "heartBeat") {
            connection.send(JSON.stringify({ type: "heartBeat", data: "pong" }));
        }
    }
    catch (error) {
        console.error(error);
    }
};
exports.requestHandler = requestHandler;
