import { NextFunction, Response, Request } from "express"
import { isTokenValid } from "../utils/tokenValidity";
import { refreshAccessToken } from "../utils/refreshAccessToken";

//This middleware is reponsible for checking the token expiry.
//Tokens(access & refresh) which are stored in cookies,
//If accessToken expired, refresh it(generate new accessToken) with the help of valid(non-expired) refreshToken.
//If refreshToken itself expired, return back and client needs to login again.
export const accessTokenCheck = async (
    req: Request, 
    res: Response, 
    next: NextFunction): Promise<void> => {
        try {
            const accessToken = req.cookies["accessToken"];
            const refreshToken = req.cookies["refreshToken"];

            // If refreshToken expired, return back and Client needs to login again.
            if(!isTokenValid(refreshToken)) { 
                // res.status(401).json({error : "Need to login again."})
                console.log("error : Need to login again.");
                // next();
                return;
            }

            // If accessToken Not expired, return back.
            if(isTokenValid(accessToken)){
                // res.status(200).json({success : "Token Valid"});
                console.log("success : Token Valid")
                next();
                return;
            }

            // If accessToken expired, Refresh the access token using non-expired refreshToken.
            const newAccessToken:  string | null  = await refreshAccessToken(refreshToken); //new token generation

            //If error in generating fresh accessToken.
            if(!newAccessToken){
                // res.status(404).json({error : "Refresh failed, Login again."});
                console.log("Error:  Refresh failed, Login again.")
                // next();
                return;
            }

            //If acessToken generated, set its expiry and Cookies
            res.cookie("accessToken", newAccessToken, {
                maxAge : 30*60*1000,
                path: '/',
            })
            next();
            return;

        } catch (error) {
            console.error("error, login again", error);
            // res.status(500).json({error: "Internal server error."})
            return;
            // next(error)
        }
}