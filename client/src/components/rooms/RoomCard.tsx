import React from "react"
import { roomPayload } from "../../types/payloads"
import { useDispatch } from "react-redux"
import { enterThisRoom } from "../../redux/slices/currRoomPayloadSlice";
import { useNavigate } from "react-router-dom";
import { setWebSocketAction } from "../../redux/slices/webSocketSlice";
import { Types } from "../../types/enums";


export const RoomCard: React.FC<roomPayload> = (obj: roomPayload) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [ isEnterRoomBtnClk, setIsEnterRoomBtnClk ] = useState<boolean>(false);


    const enterInsideRoom = () => {

        //As soon as user clicked to "ENTER ROOM" on RoomCard
        //Establish a new Websocket conection for this USER
        const ws = new WebSocket("ws://localhost:3000");
        dispatch(setWebSocketAction({ 
            webSocket : ws, 
            set: true, 
        }))

        //ROOM PAYLOAD
        const roomPayloadObject  = {
            type : Types.enterRoom,
            payload : {
                roomId: obj.payload.roomId,
                roomName: obj.payload.roomName,
                roomDescription:  obj.payload.roomDescription,
                roomParticipants: obj.payload.roomAdminId,
                roomAdminId: obj.payload.roomParticipants,
                roomCreatedAt: obj.payload.roomCreatedAt,
                currentUserId : obj.payload.currentUserId,
                currentUsername : obj.payload.currentUsername,
            }
        }
         /* 
        1. hold this user Websocket connection in Redux Store & Slice,
        2. So that, when I need the ws-again in MessageRoom.tsx,
        3. So, I don't not need to make new Connection again.
        4. Also,making new connection is Wrong for same user in websocket. */
        ws.onopen = ( ) => {
            ws.send(JSON.stringify(roomPayloadObject))
        }
        dispatch(enterThisRoom(roomPayloadObject)) //store this in ReduxSlice - for later use in MessageRoom.tsx file
        // setIsEnterRoomBtnClk( curr => !curr) //toggle when Btn clicked
        // console.log("Room -- name="+roomPayloadObject.payload.roomName+", id="+roomPayloadObject.payload.roomId);
        // console.log("Currently logged In User -- name="+roomPayloadObject.payload.currentUsername+", id="+roomPayloadObject.payload.currentUserId);
        navigate("/chat")
    }

    //As user click on Enter room button , WebSockt connection gets established and roomPayload object shared 
    //to backend WS.
    // const roomSelector = useSelector((state : RootType) => state.currRoomState); 

    

    return <div id="roomCard" 
            className=" overflow-hidden w-full h-72 rounded-lg 
            bg-gradient-to-tr from-red-500 via-black to-blue-500 hover:scale-105 transform duration-300 ease-in-out">
                
                <div className="w-full h-full roomDetail text-white p-4  grid grid-cols-12 gap-x-4 overflow-hidden">

                    <div className=" col-span-4 rounded-lg w-auto h-full">
                        <img className="rounded-lg w-auto h-full object-cover"
                        src="https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg"/>
                    </div>
                    
                    <div className="grid grid-cols-1 space-y-4 col-span-8 break-words">
                        <h1 className="text-left text-2xl font-semibold pb-2">{obj.payload.roomName}</h1>
                        <p className="text-left text-lg font-normal overflow-y-auto overflow-x-hidden"
                        style={{
                            maxHeight : '6rem',
                            
                        }}>{obj.payload.roomDescription ? obj.payload.roomDescription.charAt(0) + obj.payload.roomDescription.slice(1) : ''}</p>
                        
                        <div className=" w-full ">
                            <button onClick={enterInsideRoom}
                                    className="w-full rounded-lg bg-slate-300 text-black text-xl font-bold p-2  transform hover:scale-95 duration-200 ease-in-out">Enter</button>
                        </div>
                    </div>
                </div>  
    </div>   
}