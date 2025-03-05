import { UserStatus } from "./enum";
import { basePayload } from "./payloadTypes";
import  { JwtPayload } from "jsonwebtoken";

export interface userPayload {
    payload : Pick<basePayload, 'username' | 'roomName' | 'roomAdminName'> & {
        userBio? : string,
        active: UserStatus,
    }
}

export interface tokenPayload extends JwtPayload{
    userId : number,
    username : string,
}
export interface userObject {
    userId: number;
    username: string;
    userBio: string | null;
    joinedAt: string;
}