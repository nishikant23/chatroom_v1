import { Router, Request, Response } from "express"
import { authenticate } from "../middlewares/authenticate";
import { prisma } from "../db/db"
import { chatPayload, dbChatPayload } from "../types/payloadTypes";
import { error } from "console";

export const chatRouter = Router();

//................................ SAVE CHAT ...........................................//
chatRouter.post("/send",
    [...authenticate],
    async (req : Request, res : Response) => {
        const user = req.user; //currently loggedIn User.
        try {
            const { type, payload }  = req.body as chatPayload;
            const roomId = payload.roomId;
            const senderId = payload.senderId;
            const text = payload.text;
            const timeStamp = payload.senderTimeStampUI
            console.log(`RoomID = ${roomId}, UserID = ${senderId}, TEXT = ${text}, Sent_At = ${timeStamp}`)

            if(!roomId || !senderId) { 
                res.status(400).json({
                    message : "Room not found. Enter again.",
                })
                return;
            }
            //1. W.r.t to curr-roomId, to to its UserToRoom Array(DB)
            const userToRoomObject = await prisma.room.findUnique({ 
                where : {
                    id : roomId, //curr-roomID 
                },
                include : {
                    users : { // has 2-raltions User-Detail & userToRoom detail.
                        include : {
                            // room : true, //this will give 1 more = all roomDetails 
                            user : true // only userDetails.
                        }
                    }
                }
            })
            
            if(userToRoomObject === null) {
                res.status(401).json({
                    message : "User To Room etails not present"
                })
                return;
            }
            //'Find' through the 'UserToRoom' DB entries
            //w.r.t curr-RoomId and w.r.t this roomId which UserId found = that user is part of that(curr-room)
            //return the userToRoom-id -> this id - (contains : roomid & userid unique constraints)
            //this userToRoom id need to be stored int Chats DB for get info that which user of which room  sent that message.
            //NOTE: UserToRoomObject : Nested Object hence not used Map, find-used to find first
            const userToRoom_Id = userToRoomObject?.users.find(x => x.user_id === senderId)?.id
            console.log("-------------////////////-------------//////////////------------------")
            console.log(`roomId: ${roomId}, senderId : ${senderId} & userToRoom_Id : ${userToRoom_Id}`)
            console.log("-------------////////////-------------//////////////------------------")
            
            
            if(userToRoom_Id === undefined) {
                res.status(404).json({
                    message : "User To Room ID not found"
                })
                return;
            }
            const response = await prisma.chat.create({
                data : {
                    text : text,
                    sent_at: timeStamp,
                    user_id : user.id,
                    sender_name : user.username,
                }
            })
            console.log("From CHAT ROUTER, ChatId = ",response.id, " && Chat text = ",response.text)
            res.status(201).json({
                message : "Chat save successfully.",
                chatId : response.id,
                senderId : response.user_id,
                chatText : response.text,
            })
            return;
        } catch (error) {
            console.log("InterNal Server error", error);
            res.status(500).json({
                Error : error,
            })
        }

    }
)

//.................................. ALL CHAT ............................................//
chatRouter.get("/getAllChats",
    [...authenticate],
    async (req: Request, res: Response) => {
        const user  = req.user;
        const { roomId } = req.query;

        //If roomId id not provided
        if(!roomId) {
            res.status(400).json({error : "Room id is not present"});
            return;
        }
        //Convert roomId to number
        const id = parseInt(roomId as string);

        //NaN - not a number
        //checks isNaN - is not a number(id)
        if(isNaN(id)) {
            res.status(400).json({ error: 'roomId must be a number' });
            return;
        }
        

        const allChats = await prisma.room.findUnique({
            where : {id},
            include : {
                chat: true,
            }
        })

        if(!allChats) {
            res.status(404).json({
                message : "No chat history found",
            })
            return;
        }
        const allChatsArray : dbChatPayload[] | undefined = allChats?.chat.map((chat) => ({
            id: chat.id,
            text: chat.text,
            user_id: chat.user_id,
            sender_name: chat.sender_name,
            room_id: chat.room_id,
            sent_at: chat.sent_at,
        }))

        // console.log("All CHATS OF USER __== ", allChatsArray)

        res.status(200).json({
            message : "All chats fetched successfully.",
            chats : allChatsArray, 
        })
    }
)




//................................ UPDATE CHAT ...........................................//

//................................ DELETE CHAT ...........................................//