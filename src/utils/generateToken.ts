import jwt from "jsonwebtoken"
import { tokenPayload } from "../types/userTyes"

export const generateToken =  (payload: tokenPayload, secret: string, validity: string): string => {
    return jwt.sign(payload, secret, {expiresIn: validity})
}