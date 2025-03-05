import { verifyToken } from "./verifyToken"
import { tokenPayload } from "../types/userTyes"
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../types/constant";
import { generateToken } from "./generateToken";
import { prisma } from "../db/db";


export const refreshAccessToken = async (token : string) : Promise<string | null> => {
    //token = always be a refreshToken passed
    try {

        //Verify the token w.r.t currUser loggedIn & extract decrypt token -> data(payload)
        const verifiedUser = verifyToken(token, JWT_REFRESH_SECRET!) as tokenPayload;

        console.log(`userID = ${verifiedUser.userId}, is from Refresh Access Token fn, `)
        
        //w.r.t verifiedToken - data(payload) find that user in DB
        const dbUser = await prisma.user.findUnique({
            where : {
                id : verifiedUser.userId
            }
        })

        //If user not found return back throw error
        if(!dbUser) {
            throw new Error(" User not found.")
        }

        //if user found, destructure the payload into object, userid & username
        const user: tokenPayload = {
            userId : dbUser.id,
            username : dbUser.username,
        }
        
        //Pass this object, with jwtSecret, and token validity time to generate fresh token.
        const newAccessToken:string = generateToken(user, JWT_ACCESS_SECRET!, '30m')
        console.log("Refreshed Access Token = ", newAccessToken)
        return newAccessToken;

    } catch (error) {
        console.error("Error refreshing token.", error)
        return null;
    }
}