import { Types } from "./enums";


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
    payload : Pick<basePayload, "userId"  | "username"> & {
        userBio? : string,
    }
}
export interface userObject {
    userId: number;
    username: string;
    userBio: string | null;
    joinedAt: string;
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
        messageId : string,
        senderId : number, //curr logged in user whod sent the message.
        senderName : string, //curr logged in user whod sent the message.
    };
}

//Data base Chat table payload

export interface dbChatPayload {
    id : string, 
    text : string, 
    user_id : number,
    sender_name : string,
    room_id : number, 
    sent_at : string,
}

export interface roomCreatePayload {
    type: Types.createRoom,
    payload: Pick<basePayload, "roomId" | "roomName" | "roomDescription" | "roomAdminId" | "roomAdminName" | "roomParticipants"> & {
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
        type : string,
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