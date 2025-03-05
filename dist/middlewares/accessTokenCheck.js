"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessTokenCheck = void 0;
const tokenValidity_1 = require("../utils/tokenValidity");
const refreshAccessToken_1 = require("../utils/refreshAccessToken");
//This middleware is reponsible for checking the token expiry.
//Tokens(access & refresh) which are stored in cookies,
//If accessToken expired, refresh it(generate new accessToken) with the help of valid(non-expired) refreshToken.
//If refreshToken itself expired, return back and client needs to login again.
const accessTokenCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.cookies["accessToken"];
        const refreshToken = req.cookies["refreshToken"];
        // If refreshToken expired, return back and Client needs to login again.
        if (!(0, tokenValidity_1.isTokenValid)(refreshToken)) {
            // res.status(401).json({error : "Need to login again."})
            console.log("error : Need to login again.");
            // next();
            return;
        }
        // If accessToken Not expired, return back.
        if ((0, tokenValidity_1.isTokenValid)(accessToken)) {
            // res.status(200).json({success : "Token Valid"});
            console.log("success : Token Valid");
            next();
            return;
        }
        // If accessToken expired, Refresh the access token using non-expired refreshToken.
        const newAccessToken = yield (0, refreshAccessToken_1.refreshAccessToken)(refreshToken); //new token generation
        //If error in generating fresh accessToken.
        if (!newAccessToken) {
            // res.status(404).json({error : "Refresh failed, Login again."});
            console.log("Error:  Refresh failed, Login again.");
            // next();
            return;
        }
        //If acessToken generated, set its expiry and Cookies
        res.cookie("accessToken", newAccessToken, {
            maxAge: 30 * 60 * 1000,
            path: '/',
        });
        next();
        return;
    }
    catch (error) {
        console.error("error, login again", error);
        // res.status(500).json({error: "Internal server error."})
        return;
        // next(error)
    }
});
exports.accessTokenCheck = accessTokenCheck;
