import { memo, useEffect, useState } from "react"
import { RoomCard } from "./RoomCard"
import { roomPayload } from "../../types/payloads"
import axios, { isAxiosError } from "axios"
import { useSelector } from "react-redux"
import { RootType } from "../../redux/store"
import { API } from "../../apis/api"



export const RoomGrid = memo(() => {
    const [rooms, setRooms ] = useState<roomPayload[]>([])

    //
    const sideBarBtnSelector = useSelector((state : RootType) => state.sideBarTextState);

    useEffect(() => {
       const getAllJoinedRooms = async () => {
        try {
                const response = await API.get<{roomsArray : roomPayload[]}>("/api/v1/room/allrooms", 
                        {withCredentials: true})
                        // console.log("AA")
                                if(response.status === 200) {
                                        const holdRoomsArray = response.data.roomsArray.map((x) => ({
                                               type : x.type,
                                               payload : {
                                                        roomId : x.payload.roomId,
                                                        roomName : x.payload.roomName,
                                                        roomDescription : x.payload.roomDescription,
                                                        roomParticipants: x.payload.roomParticipants,
                                                        roomAdminId: x.payload.roomAdminId,
                                                        roomCreatedAt: x.payload.roomCreatedAt,
                                                        currentUserId : x.payload.currentUserId,
                                                        currentUsername : x.payload.currentUsername,
                                               }
                                        }))
                                        console.log("LenghtA = "+ holdRoomsArray.length)
                                        // alert("LenghtB = "+ fetchRooms.length)
                                        setRooms(holdRoomsArray)
                                }
        } catch (error: any) {
                console.log("ERR ERR")
                if(isAxiosError(error) && error.response) {
                        console.log("Err inside")
                        const status = error.response.status;
                        console.log("status =",status)
                        switch (status) {
                                case 500 : 
                                        alert("Internal Server Error");
                                        break;
                                default :
                                        alert("Unexpected Behaviour");
                                        break;
                        }
                }
        }
        
       }
       if(sideBarBtnSelector.isOpen && sideBarBtnSelector.sideBarText === "All Rooms") getAllJoinedRooms();
       else return

    }, [sideBarBtnSelector.isOpen, sideBarBtnSelector.sideBarText])


    return <div id="roomGrid"
            className=" grid 
            grid-cols-1  
            md:grid-cols-2 
            lg:grid-cols-2
            xl:grid-cols-3 
            gap-8 md:gap-6 lg:4
            ">
            {rooms.map((r) => (
                //     <RoomCard key={r.roomId} payload={r} name={r.roomName} description={r.roomDescription ?? undefined}/>
                    <RoomCard 
                    type={r.type}
                    payload={{
                        roomId: r.payload.roomId,
                        roomName: r.payload.roomName,
                        roomDescription: r.payload.roomDescription,
                        roomParticipants: r.payload.roomParticipants,
                        roomAdminId: r.payload.roomAdminId,
                        roomCreatedAt: r.payload.roomCreatedAt,
                        currentUserId: r.payload.currentUserId,
                        currentUsername: r.payload.currentUsername,
                    }}
                    />
            ))}     
    </div>
})


// style={{
//     display: "grid",
//     border: "1px solid red",
//     gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//     gap : "15px",
//     // justifyContent : "center"
// }}