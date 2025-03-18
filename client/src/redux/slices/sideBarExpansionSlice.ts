import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState : {expanded: boolean} = {
    expanded: true,
}
const sideBarExpansionSlice = createSlice({
    name: "sideBarExpansion",
    initialState,
    reducers : {
        setExpansion : (state, action: PayloadAction<boolean>) => {
            state.expanded = action.payload
            return state;
        }
    }
})

export default sideBarExpansionSlice.reducer;

export const { setExpansion } = sideBarExpansionSlice.actions