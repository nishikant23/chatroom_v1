import { PrismaClient } from "@prisma/client";

//declare the global object of TS

declare global {
    var prisma : PrismaClient | undefined //make 'prisma' as global variable who is itself-instance = prismClient or undefined
}

export const prisma = global.prisma || new PrismaClient(); //if not primaclient called

if(process.env.NODE_ENV !== "production") { //if run in Dev-mode, already created prisma client 
    global.prisma = prisma //or create new PrismaClient() 1st time of Dev mode run
}