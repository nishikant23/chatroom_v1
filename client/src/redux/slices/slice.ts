import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface clickedButtonPayload {
    // isBtnClk: boolean,
    keyOptName : string,
    // reactElement : React.ReactNode, //non-serialize Data, DO NOT STORE IN  REDUX
}


const sideBarButtonsSlice = createSlice({
    name: "sideBarButtons",
    initialState : {} as clickedButtonPayload,
    reducers : {
        clickedButton : (state: clickedButtonPayload, action : PayloadAction<clickedButtonPayload>) => {
            return {...state, activeComponent : action.payload.keyOptName};                    
            // state[action.payload.keyOptName] = action.payload.reactElement;
        },
    }
})

export default sideBarButtonsSlice.reducer;

export const { clickedButton } = sideBarButtonsSlice.actions;
