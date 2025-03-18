import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { roomCreatePayload } from "../../types/payloads";

const initialState : roomCreatePayload[] = [];

//1. Holds Record of all the rooms CREATED by current user.(Admin);
//Make 1- More slice for allRooms record which he/she JOINED as a member of it. (Not Admin);

const roomSlice = createSlice({
    name : "room",
    initialState,
    reducers : {
        //Each time the User Creates Room add it his/her , created Rooms.
        addRoomAction : (state: roomCreatePayload[], action: PayloadAction<roomCreatePayload>) => {
            state.push(action.payload);
        }, 
        //When  user deletes the Room he/she created, remove that from Rooms list.
        deleteRoomAction : () => {}
    }
})

export default roomSlice.reducer;
export const {addRoomAction } = roomSlice.actions;