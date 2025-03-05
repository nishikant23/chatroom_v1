import { Request, Response, NextFunction } from "express";
import { prisma } from "../db/db";

async (req: Request, res: Response, next : NextFunction) => {
    try {
        const user = req.user;

        await  prisma.userToRoom.findUnique

        
    } catch (error) {
        console.error("Error getting the room members:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}