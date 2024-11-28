import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";

export const JoinRoom = ({setRoomObj}) => {

    // const [ room, setRoom ] = useState('');
    const roomVal = useRef<string | "">("");
    const nameVal = useRef<string  | "">("");
    const navigate = useNavigate();

    // const roomObjRef = useRef();
    // useEffect(() => {
    //     localStorage.setItem('roomObj', JSON.stringify(roomObjRef.current?.value));
    // },[roomObjRef.current?.value])
    
    const joinRoom = () => {
        const roomObjVar =  {
            type : "join",
            payload : {
                roomId : roomVal.current?.value,
                username : nameVal.current?.value,
            }
        }
        setRoomObj(roomObjVar);
        //@ts-ignore
        // roomObjRef.current = roomObjVar;
        
        navigate('/chat')
        // console.log("inputbox roomVal - "+  roomVal.toString() )
        // console.log(typeof roomObj )
        // console.log("type = " + roomObj.type)
        // console.log("roomid = " + roomObj.payload.roomId)

    }

    return <div className="flex items-center justify-center h-screen w-full bg-gray-900  ">
        <div className=" flex flex-col items-center justify-between  max-h-screen max-w-screen bg-white rounded-lg px-10"> 
            <div className=" text-5xl text-gray-900 font-bold py-12"> Join Room</div>
            <div className=" flex flex-col justify-center pb-12">
                <input 
                    ref={roomVal}
                    type="text" 
                    placeholder="enter room id..." 
                    className=" p-3 text-gray-500 bg-white text-2xl rounded-lg border border-gray-900 my-6"
                />
                <input 
                    ref={nameVal}
                    type="text" 
                    placeholder="enter name..." 
                    className="p-3 text-gray-500 bg-white text-2xl rounded-lg border border-gray-900 my-6"
                />
                <button 
                    onClick={joinRoom}
                    className="bg-gray-900 text-white text-2xl rounded-md px-4 py-3 hover:scale-110 transition hover:duration-300 hover my-6"
                >
                join</button>
            </div>
        </div>
    </div>
}