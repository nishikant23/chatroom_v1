"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = global.prisma || new client_1.PrismaClient(); //if not primaclient called
if (process.env.NODE_ENV !== "production") { //if run in Dev-mode, already created prisma client 
    global.prisma = exports.prisma; //or create new PrismaClient() 1st time of Dev mode run
}
