import  setSideBarTextSlice from "../slices/sideBarTextSlice";
import sideBarExpansionSlice from "../slices/sideBarExpansionSlice";
import messageSlice from "../slices/messageSlice";
import userSlice from '../slices/userSlice';
import currRoomPayloadSlice from '../slices/currRoomPayloadSlice';
import webSocketSlice from '../slices/webSocketSlice';
import chatPayloadSlice from '../slices/chatPayloadSlice';
import chatAttachmentSlice from '../slices/chatAttachmentSlice';
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    sideBarTextState: setSideBarTextSlice,
    sideBarExpansionState: sideBarExpansionSlice,
    messageState : messageSlice,
    userState : userSlice,
    currRoomState : currRoomPayloadSlice,
    webSocketState : webSocketSlice,
    chatPayloadState : chatPayloadSlice,
    chatAttachmentState : chatAttachmentSlice,
})