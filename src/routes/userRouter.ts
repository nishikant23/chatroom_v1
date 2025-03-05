import { Router } from "express";
import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../utils/passwordCrypting";
import { generateToken } from "../utils/generateToken";
import { tokenPayload } from "../types/userTyes";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../types/constant";
import { getIst } from "../helpers/getIst";
import { authenticate } from "../middlewares/authenticate";
import { prisma } from "../db/db";


export const userRouter = Router();

//................................ SIGNUP ..........................................//
userRouter.post("/signup", async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if(!username || !password) {
            res.status(400).json({
                message: "Input field can't be empty."
            })
            return;
        }
        console.log(username, password)
        const user = await prisma.user.findUnique({
            where : {
                username : username
            }
        })
        if(user) {
            res.status(200).json({
                message : "User already exists. Kindly login."
            })
            return;
        }
        const hashedPassword: string = await hashPassword(password);
        
        // const getIndianTime = getIst();
        console.log(getIst());
        const newUser = await prisma.user.create({
            data : {
                username: username,
                password : hashedPassword,
                joined_at : getIst(),
            }
        })
        const dbUser: tokenPayload =  {
            userId : newUser.id,
            username : newUser.username,
        }
        const accessToken = generateToken(dbUser, JWT_ACCESS_SECRET!, '30m')
        const refresehToken = generateToken(dbUser, JWT_REFRESH_SECRET!, '7d')
        if(!accessToken || !refresehToken) {
            res.status(500).json({
                message : "token creation failed"
            })
            return;
        }

        res.cookie("accessToken", accessToken, {
            maxAge : 30*60*1000,
            path: '/',

        })
        res.cookie("refreshToken", refresehToken, {
            maxAge: 7*24*60*60*1000,
            httpOnly : true,
            secure : true,
            sameSite : 'strict',
            path: '/',
        })

        res.status(201).json({
            message : "User Created Successfully.",
            payload: {
                userId: dbUser.userId,
                username : dbUser.username,
            },
            Access_Token : accessToken,
            Refresh_Token : refresehToken
        })
    } catch (error) {
        console.error("Error creating the user.", error)
    }

})

//................................ LOGIN ...........................................//
userRouter.post("/signin", async (req: Request, res:  Response) => {
    try {
        const { username, password } = req.body;
        // getIst()
        if(!username || !password) {
            res.status(400).json({
                message : "All fields are required."
            })
            return;
        }

        const user = await prisma.user.findUnique({
            where : {
                username : username,
            }
        })

        if(!user) {
            res.status(404).json({
                message : "User not found. Need to Signup"
            })
            return;
        }

        const dbPassword: string = user.password; //hashed pasasword
        const isValidPassword: boolean = await comparePassword(password, dbPassword);

        if(!isValidPassword) {
            res.status(401).json({
                message : "Incorrect password."
            })
            return;
        }

        const dbUser: tokenPayload = {
            userId : user.id,
            username : user.username,
        }

        const accessToken = generateToken(dbUser, JWT_ACCESS_SECRET!, '30m');
        const refresehToken  = generateToken(dbUser, JWT_REFRESH_SECRET!, '7d');
        if(!accessToken || !refresehToken) {
            res.status(500).json({
                message : "token creation failed"
            })
            return;
        }
    
        res.cookie("accessToken", accessToken, {
            maxAge : 30*60*1000,
            path: '/',
    
        })
        res.cookie("refreshToken", refresehToken, {
            maxAge: 7*24*60*60*1000,
            httpOnly : true,
            secure : true,
            sameSite : 'strict',
            path: '/',
        })

        res.status(200).json({
            message : "User login successfull.",
            payload :{
                userId : dbUser.userId,
                username : dbUser.username,
            },
            Access_Token : accessToken,
            Refresh_Token : refresehToken,
        })

    } catch (error) {
        console.error("User can not login. Try again.", error)
    }
})

//................................ DASHBOARD .......................................//
userRouter.get("/dashboard", 

    //MiddleWare, written as array, 
    // bcos this middleware itslef in background contains another Middleware
    //Hence, array [...middleware] - represents a series of middlewares.
    [...authenticate], //User found in DB & authenticated.

    //Actual Client request Handling Starts here..
    (req: Request, res: Response) => {
        try {
            const user = req.user;
            // console.log("Custom Request = ", user.id, user.username) // This should be properly typed as User from Prisma
            res.status(200).json({ 
                message: `Welcome to the dashboard,${user.username}!` ,
                payload : {
                    userId : user.id,
                    username : user.username,
                    userbio : user.user_bio,
                }
            });

        } catch (error) {
            res.status(500).json({ error: "Internal server error. Try to Login again." });
        }
    }
)

//................................ LOGOUT ..........................................//
userRouter.post("/logout", (req :Request, res: Response) => {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(200).json({message : "User logout successfully"});
        return;
    } catch (error) {
        res.status(500).json({error : "Internal server error. Try again."});
        return;
    }
})