import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { MutableRefObject } from "react";

interface ChatAttachment {
    attachmentRef: MutableRefObject<HTMLInputElement> | null,
}
const initialState: ChatAttachment = {
    attachmentRef: null,
}

 const chatAttachmentSlice = createSlice({
    name : "chatAttachmentSlice",
    initialState,
    reducers : {
        setAttachmentType : (state, action: PayloadAction<React.MutableRefObject<HTMLInputElement>>) => {
            state.attachmentRef = action.payload.current
            console.log("Chat Attachment SLICE = ", state.attachmentRef)
        }
    }

})

export default chatAttachmentSlice.reducer;

export const { setAttachmentType } = chatAttachmentSlice.actions;