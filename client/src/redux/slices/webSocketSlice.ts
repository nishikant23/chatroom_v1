import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface webSocketProp {
    webSocket : WebSocket | null,
    set : boolean,
}
const initialState : webSocketProp = {
    webSocket : null,
    set : false,
}

const webSocketSlice = createSlice({
    name : "webSocketSlice",
    initialState,
    reducers : {
        setWebSocketAction : (state: webSocketProp, action : PayloadAction<webSocketProp>) => {
            state.webSocket = action.payload.webSocket;
            state.set = action.payload.set;
        },
    }

})

export default webSocketSlice.reducer;

export const { setWebSocketAction } = webSocketSlice.actions