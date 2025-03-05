"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
// import crypto from "crypto";
// import url, { parse } from "url";
const cors_1 = __importDefault(require("cors"));
// import { chatPayload, roomPayload } from "./types/payloadTypes";
// import { chatState, connectionState, roomState, userState } from "./types/webSocketStates";
// // import { getIst } from "./helpers/getIst";
// // import { Types } from "./types/enum";
// // import { prisma } from "./db/db"
const requestHandler_1 = require("./webSocketUtils/requestHandler");
// import { v4 as uuidv4 } from "uuid"
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)({ origin: "http://localhost:5173", credentials: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/api/v1", routes_1.mainRouter);
// const uuid: string = uuidv4();
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({
    "server": server,
});
wss.on("connection", (connection, request) => {
    //CHAT
    connection.on("message", (objectPayload) => {
        (0, requestHandler_1.requestHandler)(connection, objectPayload);
    });
});
server.listen(PORT, () => {
    console.log("Listening on port 3000");
});
