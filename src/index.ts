import { WebSocketServer, WebSocket } from "ws";
import express from "express";
import { mainRouter } from "./routes";
import cookieParser from "cookie-parser";
import http, { IncomingMessage } from "http";
// import crypto from "crypto";
// import url, { parse } from "url";
import cors from "cors"
// import { chatPayload, roomPayload } from "./types/payloadTypes";
// import { chatState, connectionState, roomState, userState } from "./types/webSocketStates";
// // import { getIst } from "./helpers/getIst";
// // import { Types } from "./types/enum";
// // import { prisma } from "./db/db"
import { requestHandler } from "./webSocketUtils/requestHandler";
// import { v4 as uuidv4 } from "uuid"

const app = express();
const PORT = 3000;
app.use(cors({origin: "http://localhost:5173", credentials: true}))
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", mainRouter);

// const uuid: string = uuidv4();

const server = http.createServer(app);
const wss = new WebSocketServer({
    "server" : server,
})

wss.on("connection", (connection: WebSocket, request : IncomingMessage) => { 
    //CHAT
    connection.on("message", (objectPayload) => {
    requestHandler(connection, objectPayload);
    })
})

server.listen(PORT, () => {
    console.log("Listening on port 3000")
})
