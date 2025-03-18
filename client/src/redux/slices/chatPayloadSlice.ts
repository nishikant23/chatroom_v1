import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chatPayload } from "../../types/payloads";
import { Types } from "../../types/enums";

const initialState : chatPayload = {
    type : Types.chat,
    payload : {
        messageId : 0,
        senderId : 0,
        senderName : '',
        roomId : 0,
        roomName : '',
        text : '',
        sender : '',
        senderTimeStampUI : '',
        serverTimeStampBE : '',
    }
}

const chatPaylaodSlice = createSlice({
    name : " chatPayloadSlice",
    initialState,
    reducers : {
        setChatPayloadAction : (state: chatPayload , action: PayloadAction<chatPayload> ) => {
            // const sp = state.payload;
            // const app = action.payload.payload;

            state.type = action.payload.type;
            state.payload.messageId = action.payload.payload.messageId;
            state.payload.senderId = action.payload.payload.senderId;
            state.payload.roomId = action.payload.payload.roomId;
            state.payload.senderName = action.payload.payload.senderName;
            state.payload.roomName = action.payload.payload.roomName;
            state.payload.sender = action.payload.payload.sender;
            state.payload.senderTimeStampUI = action.payload.payload.senderTimeStampUI;
            state.payload.serverTimeStampBE = action.payload.payload.serverTimeStampBE
            state.payload.text = action.payload.payload.text;

            console.log("From Chat payload SLICE = ", state)
            return state;
        },
    }
})


export default chatPaylaodSlice.reducer;
export const  { setChatPayloadAction } = chatPaylaodSlice.actions;