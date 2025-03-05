
import { chatPayload } from "../types/payloadTypes";
import { allUsers } from "../types/webSocketStates";
import { Types } from "../types/enum"
import { WebSocket } from "ws";


export const sendMessageToConnections = (parsedObjectPayload: chatPayload) => {

    //take each connection's userId & roomId.
    console.log("At inside send message function.")
    console.log("Socket Connections Array length = ", allUsers.socketsArr.length)
    // console.log("Chats Array length = ", allUsers.chatsArr.length)

    try {
        allUsers.socketsArr.forEach(({ userId, roomId, connection }) => {
            // console.log("Parsed Payload: ", JSON.stringify(parsedObjectPayload, null, 2));
    
            //check each this current Connection's -> userId & roomId in ChatsArray
                if(roomId === parsedObjectPayload.payload.roomId){
    
                    const textMsgPaylaod : chatPayload = {
                        type: Types.chat,
                        payload : {
                            messageId : parsedObjectPayload.payload.messageId,
                            roomId : roomId,
                            roomName : parsedObjectPayload.payload.roomName,
                            senderId : parsedObjectPayload.payload.senderId,
                            senderName : parsedObjectPayload.payload.senderName,
                            sender : "others",
                            text : parsedObjectPayload.payload.text,
                            senderTimeStampUI : parsedObjectPayload.payload.senderTimeStampUI,
                            serverTimeStampBE : parsedObjectPayload.payload.serverTimeStampBE,
                        }
                    }
                    //Send them a message(only specific room Users get the message)
                    // 
                    if(connection ) {
                        try {
                            //SEND message to all, expect himself.
                            console.log("From Websocket SendMessage file  MESSAGE = ", JSON.stringify(textMsgPaylaod.payload.text))
                            connection?.send(JSON.stringify(textMsgPaylaod));
                            console.log(`Message sent to user ${userId} in room ${roomId}`);
                        } catch (error) {
                            console.error(`Failed to send message to user ${userId}: `, error);
                        }
                    }
                }
                
        })
    } catch (error) {
        console.error("Error sending response.", error)
    }
}