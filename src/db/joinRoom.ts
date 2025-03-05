import { prisma } from "./db"

export const joinRoom = async (userId: number, roomId: number) => {
    return await prisma.userToRoom.create({
        data : {
            user_id : userId,
            room_id : roomId,
        }
    })
}