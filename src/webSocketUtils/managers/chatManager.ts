// import { getIst } from "../../helpers/getIst";
// import { chatPayload } from "../../types/payloadTypes";
// import { allUsers } from "../../types/webSocketStates";


// export const chatManager = (parsedData : chatPayload): boolean => {

//     try {
//         //Any type of Chat always add expect an Empty chat.
//         //current chat just sent by Client from UI
//         // console.log("Current Chat = ",currChat)
//         if(parsedData.payload.text !== ""){
//             allUsers.chatsArr.push({
//                 messageId : parsedData.payload.messageId,
//                 userId : parsedData.payload.senderId,
//                 username : parsedData.payload.senderName,
//                 roomId : parsedData.payload.roomId,
//                 roomName : parsedData.payload.roomName,
//                 text : parsedData.payload.text,
//                 sender : "others",
//                 senderTimeStampUI : parsedData.payload.senderTimeStampUI,
//                 serverTimeStampBE : getIst().toISOString(),
//             })
//             return true;
//         }
//         else return false;
//     } catch (error) {
//         console.error(error)
//         return false;
//     }
// }