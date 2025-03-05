import { chatPayload } from "../../types/payloadTypes";
import { allUsers } from "../../types/webSocketStates";


export const roomManager = (parsedData: chatPayload) => {
    console.log("Inside Websocket managers of ROOM Manager")
    const index = allUsers.roomArr.findIndex((r) => r.roomId === parsedData.payload.roomId);
    //Chk, room already present or not.
    if(index < 0){
        //Now add room in roomArr[]
        allUsers.roomArr.push({
            roomId : parsedData.payload.roomId,
            roomName : parsedData.payload.roomName,
            usersArr : [],
        }); //push the room

        //1st time room adding, means by this Particular user
        //Therefor, 1st Add this userId in roomArr.usersArr[]
        allUsers.roomArr[allUsers.roomArr.length - 1].usersArr.push(parsedData.payload.senderId) //add the user 1st in roomArr       
    
    } else {
        //Now any new user join same room, 
        // room will be already present in roomArr,
        //therefore, only add the newUser enter to this room,

        //We first find the already exists room -> Index
        // console.log("NOTE ----------     roomIndex = ", index)

        //We chk if that alreadyExists-Room has usersArr contains this neUser already or not.
        //Required to chk, bcos if User trying to enter the Same Room from Other Devices,
        //To AVOID multiple WebSocket connection of same user.
        if(!allUsers.roomArr[index].usersArr.map(uid => uid === parsedData.payload.senderId)) {
            
            //If user not in roomArr.usersArr, add him/her.
            allUsers.roomArr[index].usersArr.push(parsedData.payload.senderId);
        }
    }
}