import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userPayload } from "../../types/payloads";

// const initialState : userPayload[] = [];
const initialState : userPayload = {
    payload : {
        userId : 0,
        username : "",
        userBio : "",
    }
};

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        addUserAction  : (state: userPayload, action : PayloadAction<userPayload>) => {
            const { userId, username, userBio } = action.payload.payload;
            state.payload.userId  = userId;
            state.payload.username  = username;
            state.payload.userBio  = userBio;
            return state;
        },
        removeUserAction : (state: userPayload) => {
            //logic of find that user who, logout to remove his/her details from STATE
            state.payload.userId  = 0;
            state.payload.username  = "";
            state.payload.userBio  = "";
            return state;
        }
    }
})

//REMOVE USER LOGIC ACTION
// removeUserAction : (state: userPayload[], action : PayloadAction<userPayload>) => {
//     //logic of find that user who, logout to remove his/her details from STATE
//     let l: number = 0, r: number = state.length;
//     const user = action.payload;
//     const target = user.payload.userId
//     while(l<=r) { //Binary Search o(logn)
//         const m: number = Math.floor((r-l)/2) + l;
//         const search = state[m].payload.userId
//         if(search !== undefined && target !== undefined) {
//             if(target == search) state.splice(m,1);
//             else if( target < search ) r=m-1;
//             else l=m+1;
//         }
//     }
// }
export default userSlice.reducer;

export const  { addUserAction, removeUserAction } = userSlice.actions;