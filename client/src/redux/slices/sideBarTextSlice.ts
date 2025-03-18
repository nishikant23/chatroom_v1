import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface textObject {
    isOpen : boolean
    sideBarText : string | null,
}
const initialState : textObject = {
    isOpen: false,
    sideBarText: null,
};
const sideBarTextSlice = createSlice({
    name : "sideBarTexts",
    initialState,
    reducers : {
        setSideBarText : (state: textObject, action : PayloadAction<textObject>) => {
            console.log("btn clicked name inside Slice ACTION = ", action.payload.sideBarText, "isOpen = ",state.isOpen)
            // state = action.payload;
            // console.log("btn clicked name inside Slice STATE = ", state.sideBarText)
            state.isOpen = true;
            state.sideBarText =   action.payload.sideBarText;
            console.log("btn clicked name inside Slice STATE = ", state.sideBarText, "isOpen = ",state.isOpen)
        },
        setSideBarEmpty : (state) => {
            state.isOpen = false;
            state.sideBarText = null;
        },
    }
})

export default sideBarTextSlice.reducer;

export const { setSideBarText,setSideBarEmpty }  = sideBarTextSlice.actions;