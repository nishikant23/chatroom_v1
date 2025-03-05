// import { RoomType, Types } from "./enum"

// export interface basePayload {
//     userId: number,
//     roomId : number,
//     roomname : string,
//     username? : string | null,
//     roomDescription? : string | null,
//     admin? : string | null,
//     roomParticipants? : number | null,
//     // timestamp : string,
// }

// export interface createRoomPayload {
//     type : Types.Create,
//     payload : basePayload,
// } 

// export interface joinRoomPayload  {
//     type: Types.Join,
//     payload : basePayload,
// }


// export interface chatMessage {
//     text : string,
//     sender : string,
// }

// export interface chatPayload {
//     type : Types.Chat,
//     payload : basePayload & chatMessage,
// }


// export interface RoomPayload {
//     type : RoomType,
//     payload : basePayload & {
//         roomDescription: string,
//         participants: number,
//     }
// }

import { Types } from "./enum";


export interface basePayload {
    userId : number,
    roomId : number,
    chatId : number,
    roomAdminId:  number,
    roomAdminName : string,
    username : string,
    roomName : string,
    roomDescription : string | null,
    roomParticipants :  number;
    
}
export interface userPayload {
    payload : Pick<basePayload, "userId" | "username" > & {
        userBio? : string,
    }
    
    
}

export interface chatMessage {
    // chatId : number,
    text : string,
    sender : string,
    senderTimeStampUI: string,
    serverTimeStampBE : string,
}


export interface chatPayload {
    type : string,
    payload :  chatMessage & Pick<basePayload, "roomId" | "roomName"> & {
        messageId : number;
        senderId : number, //curr logged in user whod sent the message.
        senderName : string, //curr logged in user whod sent the message.
    };
}

export interface dbChatPayload {
    id : number, 
    text : string, 
    user_id : number,
    sender_name : string,
    room_id : number, 
    sent_at : Date,
}


export interface roomCreatePayload {
    type: Types.createRoom,
    payload: Pick<basePayload, "roomId" | "roomName" | "roomDescription" | "roomAdminId" | "roomAdminName" | "roomParticipants" > & {
        created_at : string,
    }
}

export interface roomJoinPayload {
    type: Types.joinRoom,
    payload : Pick<basePayload, "roomId" | "roomName" | "roomDescription" > & {
        newUserEntryId: number,
        joinedUserId : number,
        joinedUserName : string,
        roomCreatedAt : string,
    }
}


export interface roomPayload {
    type : Types.enterRoom,
    payload :{
        roomId: number,
        roomName: string,
        roomDescription: string | null,
        roomParticipants: number,
        roomAdminId: number,
        roomCreatedAt: string,
        currentUserId : number,
        currentUsername : string,
    }  
}
// id: number;
//         room_name: string;
//         room_description: string | null;
//         participants: number;
//         creator_id: number;
//         created_at: Date;