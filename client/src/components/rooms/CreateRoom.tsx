import React, { useRef } from "react"
import { BoxButton } from "../BoxButton"
import { BoxField } from "../BoxField"
import { BoxHeader } from "../BoxHeader"
import { useDispatch } from "react-redux"
import { setSideBarText } from "../../redux/slices/sideBarTextSlice"
import { roomCreatePayload } from "../../types/payloads"
import { addRoomAction } from "../../redux/slices/roomSlice"
import { Types } from "../../types/enums"
import { useNavigate } from "react-router-dom"
import axios, { isAxiosError } from "axios"
import { API } from "../../apis/api"

export const CreateRoom: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const roomNameRef = useRef<HTMLInputElement | null>(null);
    const roomDescriptionRef = useRef<HTMLInputElement | null>(null);
   

    const handleCreateRoom = async (): Promise<void> => {
        const roomName  = roomNameRef.current?.value;
        const roomDescription = roomDescriptionRef.current?.value;
        
        try {
            const response = await API.post<roomCreatePayload>("/api/v1/room/create", {
                roomName,
                roomDescription
            }, { withCredentials: true})

            const data: roomCreatePayload = response.data;

            console.log(`roomname = ${roomName} & roomDescription = ${roomDescription}`)
            if(response.status === 201) {

                const createRoomPaylaod : roomCreatePayload = {
                    type: Types.createRoom,
                    payload :{
                        roomId: data.payload.roomId,
                        roomName: data.payload.roomName,
                        roomDescription: data.payload.roomDescription,
                        roomAdminId: data.payload.roomAdminId,
                        roomAdminName: data.payload.roomAdminName,
                        roomParticipants : data.payload.roomParticipants,
                        created_at : data.payload.created_at,
                    }
                }
                dispatch(addRoomAction(createRoomPaylaod))
                alert("Room Creation Successfull.")
                navigate("/dashboard")
            }
            if(response.status === 200){
                alert("RoomName already taken, Use another name.")
            }
        } catch (error: any) {
            if(isAxiosError(error) && error.response){
                const status  = error.response.status;
                switch(status) {
                    case 401 :
                        alert("Room name can't be left blank.");
                        break;
                    case 404 : 
                        alert("User not found, Need to login/signup first.");
                        break;
                    case 500 : 
                        alert("Server error.");
                        break;
                    default :
                        alert("Internal server error. Pleasse try again.")
                        break;
                }
            }else {
                console.log("Error creating room.", error);
                alert("An unexpected error occured. Pleasse try after some time.")
            }
        }
    }

    return <div id="createRoom" 
        className="relative h-max overscroll-y-auto w-max p-12 grid grid-cols-1  shadow-lg rounded-lg bg-gradient-to-tr from-red-400 via-slate-100 to-purple-400">
            <button onClick={() => {
                dispatch(setSideBarText({isOpen: false, sideBarText: null}))
            }}
            className="absolute right-3 top-3 ">
                <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke-width="1.5" 
                    stroke="currentColor" 
                    className="size-8 ">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
            <div className="mt-2 space-y-6">
                <BoxHeader signupText={"Create New Room"}/>
                <BoxField ref={roomNameRef} labelText={"Name"} placeholderText={"enter room name..."}/>
                <BoxField ref={roomDescriptionRef} labelText={"Description"} placeholderText={"enter room description (Optional)..."}/>
                <BoxButton onClick={handleCreateRoom} buttonText={"Submit"}/>
            </div>
    </div>
}