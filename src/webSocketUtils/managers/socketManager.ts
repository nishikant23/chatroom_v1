import { chatPayload, roomPayload } from "../../types/payloadTypes";
import { allUsers } from "../../types/webSocketStates";
import { WebSocket } from "ws";

// const socketUsers : {[key : number] : connectionState};
// const socketsArr : connectionState[] = [];
export const socketManager = (connection: WebSocket, parsedData: roomPayload) => {
    try {
        //------------------------------CONNECTION-USERS ARR---------------------------------------//
        //Current Websocket Connection
        // const currConnection = connectionUsers[connectionUsersCount];
        //Before push current user's id & Ws-connection check already exists or not.
        // console.log("Inside SOCKET MANAGER");
        // console.log("socket User = ", parsedData.payload.currentUsername);
        const userExists = allUsers.socketsArr.find(curr => {return curr.userId === parsedData.payload.currentUserId})

        if(!userExists) {
            allUsers.socketsArr.push({
                userId : parsedData.payload.currentUserId,
                roomId : parsedData.payload.roomId,
                connection : connection,
            })
            console.log(parsedData.payload.currentUsername + " = User added to socketArray." );
        }else{
            userExists.roomId = parsedData.payload.roomId,
            // userExists.connection = parsedData.payload.
            console.log(parsedData.payload.currentUsername+ " = User already exists in socketArray.");
        }
    } catch (error) {
        console.error("Error managing socket connection: ", error);
    }
}