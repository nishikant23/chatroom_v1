import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chatPayload } from "../../types/payloads";

const initialState : chatPayload[] = []

const messageSlice = createSlice({
    name : "message",
    initialState,
    reducers : {
        setTheMessage : (state: chatPayload[], action: PayloadAction<chatPayload>) => {
            state.push(action.payload);
        }
    }
})

export default messageSlice.reducer;

export const { setTheMessage } = messageSlice.actions;