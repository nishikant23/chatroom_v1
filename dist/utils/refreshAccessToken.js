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
exports.refreshAccessToken = void 0;
const verifyToken_1 = require("./verifyToken");
const constant_1 = require("../types/constant");
const generateToken_1 = require("./generateToken");
const db_1 = require("../db/db");
const refreshAccessToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //token = always be a refreshToken passed
    try {
        //Verify the token w.r.t currUser loggedIn & extract decrypt token -> data(payload)
        const verifiedUser = (0, verifyToken_1.verifyToken)(token, constant_1.JWT_REFRESH_SECRET);
        console.log(`userID = ${verifiedUser.userId}, is from Refresh Access Token fn, `);
        //w.r.t verifiedToken - data(payload) find that user in DB
        const dbUser = yield db_1.prisma.user.findUnique({
            where: {
                id: verifiedUser.userId
            }
        });
        //If user not found return back throw error
        if (!dbUser) {
            throw new Error(" User not found.");
        }
        //if user found, destructure the payload into object, userid & username
        const user = {
            userId: dbUser.id,
            username: dbUser.username,
        };
        //Pass this object, with jwtSecret, and token validity time to generate fresh token.
        const newAccessToken = (0, generateToken_1.generateToken)(user, constant_1.JWT_ACCESS_SECRET, '30m');
        console.log("Refreshed Access Token = ", newAccessToken);
        return newAccessToken;
    }
    catch (error) {
        console.error("Error refreshing token.", error);
        return null;
    }
});
exports.refreshAccessToken = refreshAccessToken;
