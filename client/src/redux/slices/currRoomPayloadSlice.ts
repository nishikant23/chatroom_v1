import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { roomPayload } from "../../types/payloads";
import { Types } from "../../types/enums";

const initialState : roomPayload = {
    type : "",
    payload : {
        roomId: 0,
        roomName : "",
        roomDescription : "",
        roomAdminId : 0,
        roomParticipants : 0,
        roomCreatedAt : "",
        currentUserId : 0,
        currentUsername : "",
    }

}
//                     ## USE  OF  THIS   SLICE
//This Slice Takes the Room-Details which user just-enter(from Dashboard).
//then, using this Currently entered Room details in MessageRoom.tsx file/page.

//1. This slice is just for holding the Currently user entered inside which room, out of his all rooms list.
//2. This slice not responsible for holding the userDeatils who is JOINING the room for the 1st time.
//3. IMP = This Slice is for individual user's hold the Room Deatils inside which he/she just enter.

const currRoomPayloadSlice = createSlice({
    name : "currRoomPayload",
    initialState,
    reducers : {
        //Already, part of this room, Just entering the room to do Chat.
        enterThisRoom : (state: roomPayload, action: PayloadAction<roomPayload>) => {
            const app = action.payload.payload; //action.payload.payload
            const sp = state.payload; //state.payload

            state.type = action.payload.type;
            sp.roomId = app.roomId;
            sp.roomName = app.roomName;
            sp.roomDescription = app.roomDescription;
            sp.roomParticipants = app.roomParticipants;
            sp.roomAdminId = app.roomAdminId;
            sp.roomCreatedAt = app.roomCreatedAt;
            sp.currentUserId = app.currentUserId;
            sp.currentUsername = app.currentUsername;
            // state.payload.roomId = action.payload.payload.roomId;
            // state.payload.roomName = action.payload.payload.roomName;
            // state.payload.roomDescription = action.payload.payload.roomDescription;
            // state.payload.roomAdminId = action.payload.payload.roomAdminId;
            // state.payload.roomParticipants = action.payload.payload.roomParticipants;
            // state.payload.roomCreatedAt = action.payload.payload.roomCreatedAt;
            // state.payload.roomCreatedAt = action.payload.payload.roomCreatedAt;
            // state.payload.roomCreatedAt = action.payload.payload.roomCreatedAt;

            return state;
        },
        //Just Exits the Room, But not Leaving the room for permanent.
        //Therefore, Empty the STATE Keys.
        exitThisRoom : (state: roomPayload) => {
            state.type = Types.outRoom;
            state.payload.roomId = 0;
            state.payload.roomName = "";
            state.payload.roomDescription = "";
            state.payload.roomAdminId = 0;
            state.payload.roomParticipants = 0;
            state.payload.roomCreatedAt = "";
            state.payload.currentUserId = 0;
            state.payload.currentUsername = "";
            return state;
        }
    }
})

export default currRoomPayloadSlice.reducer;
export const { enterThisRoom,exitThisRoom } = currRoomPayloadSlice.actions;