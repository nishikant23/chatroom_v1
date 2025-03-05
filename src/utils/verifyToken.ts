import jwt, { JwtPayload } from "jsonwebtoken"
import { tokenPayload } from "../types/userTyes";

export const verifyToken = (token: string, secret: string) : JwtPayload |  string => {
    return jwt.verify(token, secret) as tokenPayload;
}