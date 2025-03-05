import { prisma } from "./db"


export const fetchAllRooms = async (userId: number) => {
    return await prisma.user.findUnique({
                    where : {
                        id : userId //to this user 
                    },
                    include : {
                        userDetails : {
                            include : {
                                room : true //fetch all rooms he/she jooined/part of 
                            }
                        } 
                    }
                })
}