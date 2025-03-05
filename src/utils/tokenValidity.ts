import jwt from "jsonwebtoken"
import { tokenPayload } from "../types/userTyes";


export const isTokenValid = (token :string) : boolean => {
    try {
        //decode the token passed here
        const decode = jwt.decode(token) as tokenPayload;

        //return boolean after token expiry check. Is token expired or not.
        return decode.exp ? decode.exp > Date.now()/1000 : true; //if no expiry the token has return true/ else check
    
    } catch (error) {
        console.error("Erro decoding token", error);
        return false;
    }
}