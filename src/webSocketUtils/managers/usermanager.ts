// import { chatPayload } from "../../types/payloadTypes";
// import { allUsers } from "../../types/webSocketStates";


// export const userManager = (parsedData : chatPayload) => {
    
//     try {
//         //Check, userArr contains this user or not.
//         const index = allUsers.usersArr.findIndex(u => u.userId === parsedData.payload.senderId);
//         if(index < 0) {
//             //If not, then add him/her details
//             allUsers.usersArr.push({
//                 userId : parsedData.payload.senderId,
//                 roomId : parsedData.payload.roomId,
//                 username : parsedData.payload.senderName,
//                 chatsArr: [],
//             }); 

//             //Push current chat to this current user's(His own chat) chatArr
//             allUsers.usersArr[allUsers.usersArr.length - 1].chatsArr.push(parsedData.payload.messageId);
            
//         }else  {
//             // console.log("NOTE ----------     userIndex = ", userIndex)
//             //We not check the curr chat's MessageId/Curr Chat's Same chat present or not bcos,
//             //Save each chat as new chat from user in DB/WEBSocket
//             allUsers.usersArr[index].chatsArr.push(parsedData.payload.messageId);
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }