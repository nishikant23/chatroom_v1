import { sendMessageToConnections } from "./sendMessageToConnections";
import { socketManager } from "./managers/socketManager";
import { WebSocket } from "ws";
import { roomManager } from "./managers/roomManager";
///////--------------------------------------------------------------------------------------------------------------------------------------------------/////
export const requestHandler = (connection : WebSocket , objectPayload: any) => {
    try {
        const parsedObjectPayload = JSON.parse(objectPayload.toString());
        //ENTER ROOM 
        if(parsedObjectPayload.type === "enterRoom") {
            //------------------------------CONNECTION-USERS ARR---------------------------------------//
            socketManager(connection, parsedObjectPayload);
        }
        //CHAT
        if(parsedObjectPayload.type === "chat"){          
            //------------------------------SEND Message to Connections--------------------------------------//
            roomManager(parsedObjectPayload);
            //------------------------------SEND Message to Connections--------------------------------------//
            sendMessageToConnections(parsedObjectPayload);
        }

        //HEART BEAT
        if(parsedObjectPayload.type === "heartBeat"){
            connection.send(JSON.stringify({type: "heartBeat", data : "pong"}))
        }
    } catch (error) {
        console.error(error)
    }
}