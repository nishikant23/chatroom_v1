import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./utils/rootReducer";
import { loadState, saveState } from "./utils/stateMgmt";

//load all the states(contains value saved) from loadSate-fn.
const persistedState = loadState();

const store = configureStore({
    reducer : rootReducer,
    preloadedState : persistedState,
})

store.subscribe(() => {
    const state = store.getState()
    saveState({
        // userState: state.userState,
        currRoomState: state.currRoomState,
        webSocketState : state.webSocketState,
    });
})

export type RootType = ReturnType<typeof store.getState>;
export default store;