import { useDispatch } from "react-redux"
import { setSideBarText } from "../../redux/slices/sideBarTextSlice";
import { BoxHeader } from "../BoxHeader";
import { BoxField } from "../BoxField";
import { BoxButton } from "../BoxButton";
import { useRef } from "react";
import { roomJoinPayload } from "../../types/payloads";
import { Types } from "../../types/enums";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../../apis/api";


export const JoinRoom = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const roomNameRef = useRef<HTMLInputElement>(null);

    const handleJoinRoom = async ():Promise<void> => {
        const roomName = roomNameRef.current?.value;
        try {
            const response = await API.post<roomJoinPayload>("/api/v1/room/join", {
                roomName,
            }, {withCredentials : true});
            

            if(response.status === 201){
                const data:roomJoinPayload = response.data;
                
                const joinRoomPayload: roomJoinPayload =  {
                    type: Types.joinRoom,
                    payload : {
                        newUserEntryId: data.payload.newUserEntryId,
                        roomId : data.payload.roomId,
                        roomName: data.payload.roomName,
                        roomDescription: data.payload.roomDescription,
                        roomCreatedAt : data.payload.roomCreatedAt,
                        joinedUserId: data.payload.joinedUserId,
                        joinedUserName: data.payload.joinedUserName
                    }
                }
                alert("Room joining successfull.")
            }else if(response.status === 200) {
                alert("Already a part of room. Please Enter the room")
                navigate("/pathToEnterRoomComponent")
            }
        } catch (error: any) {
            if(isAxiosError(error) && error.response){
                const status  = error.response.status;
                switch(status) {
                    case 404 : 
                        alert("Room not found. Please recheck room name once.");
                        break;
                    case 500 : 
                        alert("Server error.");
                        break;
                    default :
                        alert("Internal server error. Pleasse try again.")
                }
            }else {
                console.log("Error creating room.", error);
                alert("An unexpected error occured. Pleasse try after some time.")
            }
        }
    }
    return <div id="joinRoom" 
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
                    <BoxHeader signupText={"Join Room"}/>
                    <BoxField ref={roomNameRef} labelText={"Name"} placeholderText={"enter room name..."}/>
                    {/* <BoxField labelText={"Description"} placeholderText={"enter room description (Optional)..."}/> */}
                    <BoxButton onClick={handleJoinRoom} buttonText={"Submit"}/>
                </div>
        </div>
}