import { NextFunction, Request, Response } from "express"
import { accessTokenCheck } from "./accessTokenCheck"
import { verifyToken } from "../utils/verifyToken";
import { JWT_ACCESS_SECRET } from "../types/constant";
import { tokenPayload } from "../types/userTyes";
import { prisma } from "../db/db";
export const authenticate =  [

    accessTokenCheck,  //This middleware chk the token expiry and refresh it too if expired.

    async (
        req: Request, 
        res: Response, 
        next: NextFunction): Promise<void> => {
            try {
                //fetch the accessToken from client side browser's cookie.
                const accessToken = req.cookies["accessToken"];

                //If token not found, return & client need to Login again.
                if (!accessToken) {
                    res.status(404).json({ error: "Token Not found" });
                    // next()
                    return;
                }

                //if Token Found, then:
                let verifiedUser: tokenPayload; 
                try {
                    //verify this token and get back token->extracted data in payload form.
                    verifiedUser = verifyToken(accessToken, JWT_ACCESS_SECRET!) as tokenPayload;
                } catch (err) {
                    res.status(401).json({ error: "Invalid or expired access token" });
                    // next()
                    return ;
                }

                //find the currUser token in DB, w.r.t currExtractedToken -> payload
                const dbUser  = await prisma.user.findUnique({
                    where : {
                        id: verifiedUser.userId //token extracted user ID === Db user matched means vaild User
                    }
                })
                
                //if user not found in DB, Return. and client need to Signup.
                if(!dbUser) {
                    // res.status(404).json({error: "User not found."})
                    console.log("User not found.")
                    // next()
                    return;
                }

                console.log("User authenticated successfully.")

                //This has all user details username, pass, bio, joined at.
                //We are inserting custom details in Express's Request variable
                req.user = dbUser 
                next();
                return;
                
            } catch (error) {
                console.error("Error authenticating the User", error)
                // res.status(500).json({error : "Internal server error."})
                return;
                // next(error);
            }
}]