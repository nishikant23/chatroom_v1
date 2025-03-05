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
exports.userRouter = void 0;
const express_1 = require("express");
const passwordCrypting_1 = require("../utils/passwordCrypting");
const generateToken_1 = require("../utils/generateToken");
const constant_1 = require("../types/constant");
const getIst_1 = require("../helpers/getIst");
const authenticate_1 = require("../middlewares/authenticate");
const db_1 = require("../db/db");
exports.userRouter = (0, express_1.Router)();
//................................ SIGNUP ..........................................//
exports.userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({
                message: "Input field can't be empty."
            });
            return;
        }
        console.log(username, password);
        const user = yield db_1.prisma.user.findUnique({
            where: {
                username: username
            }
        });
        if (user) {
            res.status(200).json({
                message: "User already exists. Kindly login."
            });
            return;
        }
        const hashedPassword = yield (0, passwordCrypting_1.hashPassword)(password);
        // const getIndianTime = getIst();
        console.log((0, getIst_1.getIst)());
        const newUser = yield db_1.prisma.user.create({
            data: {
                username: username,
                password: hashedPassword,
                joined_at: (0, getIst_1.getIst)(),
            }
        });
        const dbUser = {
            userId: newUser.id,
            username: newUser.username,
        };
        const accessToken = (0, generateToken_1.generateToken)(dbUser, constant_1.JWT_ACCESS_SECRET, '30m');
        const refresehToken = (0, generateToken_1.generateToken)(dbUser, constant_1.JWT_REFRESH_SECRET, '7d');
        if (!accessToken || !refresehToken) {
            res.status(500).json({
                message: "token creation failed"
            });
            return;
        }
        res.cookie("accessToken", accessToken, {
            maxAge: 30 * 60 * 1000,
            path: '/',
        });
        res.cookie("refreshToken", refresehToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
        });
        res.status(201).json({
            message: "User Created Successfully.",
            payload: {
                userId: dbUser.userId,
                username: dbUser.username,
            },
            Access_Token: accessToken,
            Refresh_Token: refresehToken
        });
    }
    catch (error) {
        console.error("Error creating the user.", error);
    }
}));
//................................ LOGIN ...........................................//
exports.userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // getIst()
        if (!username || !password) {
            res.status(400).json({
                message: "All fields are required."
            });
            return;
        }
        const user = yield db_1.prisma.user.findUnique({
            where: {
                username: username,
            }
        });
        if (!user) {
            res.status(404).json({
                message: "User not found. Need to Signup"
            });
            return;
        }
        const dbPassword = user.password; //hashed pasasword
        const isValidPassword = yield (0, passwordCrypting_1.comparePassword)(password, dbPassword);
        if (!isValidPassword) {
            res.status(401).json({
                message: "Incorrect password."
            });
            return;
        }
        const dbUser = {
            userId: user.id,
            username: user.username,
        };
        const accessToken = (0, generateToken_1.generateToken)(dbUser, constant_1.JWT_ACCESS_SECRET, '30m');
        const refresehToken = (0, generateToken_1.generateToken)(dbUser, constant_1.JWT_REFRESH_SECRET, '7d');
        if (!accessToken || !refresehToken) {
            res.status(500).json({
                message: "token creation failed"
            });
            return;
        }
        res.cookie("accessToken", accessToken, {
            maxAge: 30 * 60 * 1000,
            path: '/',
        });
        res.cookie("refreshToken", refresehToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
        });
        res.status(200).json({
            message: "User login successfull.",
            payload: {
                userId: dbUser.userId,
                username: dbUser.username,
            },
            Access_Token: accessToken,
            Refresh_Token: refresehToken,
        });
    }
    catch (error) {
        console.error("User can not login. Try again.", error);
    }
}));
//................................ DASHBOARD .......................................//
exports.userRouter.get("/dashboard", 
//MiddleWare, written as array, 
// bcos this middleware itslef in background contains another Middleware
//Hence, array [...middleware] - represents a series of middlewares.
[...authenticate_1.authenticate], //User found in DB & authenticated.
//Actual Client request Handling Starts here..
(req, res) => {
    try {
        const user = req.user;
        // console.log("Custom Request = ", user.id, user.username) // This should be properly typed as User from Prisma
        res.status(200).json({
            message: `Welcome to the dashboard,${user.username}!`,
            payload: {
                userId: user.id,
                username: user.username,
                userbio: user.user_bio,
            }
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error. Try to Login again." });
    }
});
//................................ LOGOUT ..........................................//
exports.userRouter.post("/logout", (req, res) => {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(200).json({ message: "User logout successfully" });
        return;
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error. Try again." });
        return;
    }
});
