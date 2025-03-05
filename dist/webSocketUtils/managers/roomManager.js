"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomManager = void 0;
const webSocketStates_1 = require("../../types/webSocketStates");
const roomManager = (parsedData) => {
    console.log("Inside Websocket managers of ROOM Manager");
    const index = webSocketStates_1.allUsers.roomArr.findIndex((r) => r.roomId === parsedData.payload.roomId);
    //Chk, room already present or not.
    if (index < 0) {
        //Now add room in roomArr[]
        webSocketStates_1.allUsers.roomArr.push({
            roomId: parsedData.payload.roomId,
            roomName: parsedData.payload.roomName,
            usersArr: [],
        }); //push the room
        //1st time room adding, means by this Particular user
        //Therefor, 1st Add this userId in roomArr.usersArr[]
        webSocketStates_1.allUsers.roomArr[webSocketStates_1.allUsers.roomArr.length - 1].usersArr.push(parsedData.payload.senderId); //add the user 1st in roomArr       
    }
    else {
        //Now any new user join same room, 
        // room will be already present in roomArr,
        //therefore, only add the newUser enter to this room,
        //We first find the already exists room -> Index
        // console.log("NOTE ----------     roomIndex = ", index)
        //We chk if that alreadyExists-Room has usersArr contains this neUser already or not.
        //Required to chk, bcos if User trying to enter the Same Room from Other Devices,
        //To AVOID multiple WebSocket connection of same user.
        if (!webSocketStates_1.allUsers.roomArr[index].usersArr.map(uid => uid === parsedData.payload.senderId)) {
            //If user not in roomArr.usersArr, add him/her.
            webSocketStates_1.allUsers.roomArr[index].usersArr.push(parsedData.payload.senderId);
        }
    }
};
exports.roomManager = roomManager;
