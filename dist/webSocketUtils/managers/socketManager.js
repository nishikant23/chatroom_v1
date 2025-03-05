"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketManager = void 0;
const webSocketStates_1 = require("../../types/webSocketStates");
// const socketUsers : {[key : number] : connectionState};
// const socketsArr : connectionState[] = [];
const socketManager = (connection, parsedData) => {
    try {
        //------------------------------CONNECTION-USERS ARR---------------------------------------//
        //Current Websocket Connection
        // const currConnection = connectionUsers[connectionUsersCount];
        //Before push current user's id & Ws-connection check already exists or not.
        // console.log("Inside SOCKET MANAGER");
        // console.log("socket User = ", parsedData.payload.currentUsername);
        const userExists = webSocketStates_1.allUsers.socketsArr.find(curr => { return curr.userId === parsedData.payload.currentUserId; });
        if (!userExists) {
            webSocketStates_1.allUsers.socketsArr.push({
                userId: parsedData.payload.currentUserId,
                roomId: parsedData.payload.roomId,
                connection: connection,
            });
            console.log(parsedData.payload.currentUsername + " = User added to socketArray.");
        }
        else {
            userExists.roomId = parsedData.payload.roomId,
                // userExists.connection = parsedData.payload.
                console.log(parsedData.payload.currentUsername + " = User already exists in socketArray.");
        }
    }
    catch (error) {
        console.error("Error managing socket connection: ", error);
    }
};
exports.socketManager = socketManager;
