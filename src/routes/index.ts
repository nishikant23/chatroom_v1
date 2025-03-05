import { Router } from "express";
import { userRouter } from "./userRouter";
import { roomRouter } from "./roomRouter";
import { chatRouter } from "./chatRouter";

export const mainRouter = Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/room", roomRouter);
mainRouter.use("/chat", chatRouter);