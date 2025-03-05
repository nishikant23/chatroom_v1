import { prisma } from "./db"

export const checkUserInRoom = async (userId: number, roomId: number) => {
    return await prisma.userToRoom.findUnique({ //in table userToRoom - find Unique ID - (userid & roomid) combn.
        where : { //to get theuser is a part of room or not.
            user_id_room_id : {
                user_id : userId,
                room_id : roomId,
            }
        }
    })
}