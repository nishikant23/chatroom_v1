import axios from "axios";
import { userPayload } from "../types/payloads"
import { API } from "../apis/api";

type Ref  = HTMLInputElement | null
export const handleSignup = async (username: Ref, password: Ref): Promise<Axios.AxiosXHR<userPayload> | void> => { //Button Click Function
        
        console.log("W/o clk signup btn, sending response")
        // const username = usernameRef.current;
        // const password = passwordRef.current;
        try {
            console.log("A-signup, sending response")
            const response = await API.post<userPayload>("/api/v1/user/signup", 
            {username, password}, { withCredentials: true})
            console.log("B-signup, getting response")
            return response;
        } catch (error) {
            console.log("Error signing up", error)
            return error as Axios.AxiosXHR<userPayload>
        }
    };