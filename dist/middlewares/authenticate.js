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
exports.authenticate = void 0;
const accessTokenCheck_1 = require("./accessTokenCheck");
const verifyToken_1 = require("../utils/verifyToken");
const constant_1 = require("../types/constant");
const db_1 = require("../db/db");
exports.authenticate = [
    accessTokenCheck_1.accessTokenCheck, //This middleware chk the token expiry and refresh it too if expired.
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            let verifiedUser;
            try {
                //verify this token and get back token->extracted data in payload form.
                verifiedUser = (0, verifyToken_1.verifyToken)(accessToken, constant_1.JWT_ACCESS_SECRET);
            }
            catch (err) {
                res.status(401).json({ error: "Invalid or expired access token" });
                // next()
                return;
            }
            //find the currUser token in DB, w.r.t currExtractedToken -> payload
            const dbUser = yield db_1.prisma.user.findUnique({
                where: {
                    id: verifiedUser.userId //token extracted user ID === Db user matched means vaild User
                }
            });
            //if user not found in DB, Return. and client need to Signup.
            if (!dbUser) {
                // res.status(404).json({error: "User not found."})
                console.log("User not found.");
                // next()
                return;
            }
            console.log("User authenticated successfully.");
            //This has all user details username, pass, bio, joined at.
            //We are inserting custom details in Express's Request variable
            req.user = dbUser;
            next();
            return;
        }
        catch (error) {
            console.error("Error authenticating the User", error);
            // res.status(500).json({error : "Internal server error."})
            return;
            // next(error);
        }
    })
];
