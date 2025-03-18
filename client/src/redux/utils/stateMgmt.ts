import { RootType } from "../store";


//SAVE Redux states in Browser's session storage
export const saveState = (state: Partial<RootType>) => {
    try {
        const stateData = JSON.stringify(state);
        sessionStorage.setItem('reduxState', stateData)
        
    } catch (error) {
        console.error("Error in storing the state in storage", error);
    }
}

//LOAD Redux states from Browser's session storage
export const loadState = () => {
    try {
        const stateData = sessionStorage.getItem('reduxState');
        if(stateData === null) {
            return undefined;
        }
        return JSON.parse(stateData);

    } catch (error) {
        console.error('Could not load state', error);
        return undefined;
    }
}
