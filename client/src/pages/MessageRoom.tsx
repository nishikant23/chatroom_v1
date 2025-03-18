import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ProfileBox } from "../components/ProfileBox";
import { useSelector } from "react-redux";
import { RootType } from "../redux/store";
import { chatPayload, dbChatPayload, userObject } from "../types/payloads";
import { Types } from "../types/enums";
import { getIst } from "../utils/getIst";
import { useDispatch } from "react-redux";
import { setChatPayloadAction } from "../redux/slices/chatPayloadSlice";
import { isAxiosError } from "axios";
import { setWebSocketAction } from "../redux/slices/webSocketSlice";
import { enterThisRoom, exitThisRoom } from "../redux/slices/currRoomPayloadSlice";
import { useNavigate } from "react-router-dom";
import { ChatAttachments } from "../components/attachments/ChatAttachements";
import { Upload } from "../components/attachments/attachment";
import { AiChatBox } from "../components/ai/AiChatBox";
import { API } from "../apis/api";
import { v4 as uuidv4 } from "uuid"
import DOMPurify from "dompurify";
// import { setSideBarText } from "../redux/slices/sideBarTextSlice";
// import { enterThisRoom } from "../redux/slices/currRoomPayloadSlice";
// import { useDispatch } from "react-redux";
// import { chatPayload } from "../types/payloads";
// import { setTheMessage } from "../redux/slices/messageSlice";
// import { Types } from "../types/enums";

//Custom HOOK to deal with chats

// function useChats() {
//         //W/o naming a function and calling it.
//         (async () => {
//         })()  
// }


export const MessageRoom = () => {
    const [ profileClicked, setProfileClicked ] = useState(false);

    // const [ toggle, setToggle ] = useState<boolean>(false);
    //-------------------------Attachments Constants--------------------------------//
    const [ isAttachmentOpen, setIsAttachmentopen ] = useState<boolean>(false);
    const [ aiClicked, setAiClicked ] = useState<boolean>(false);
    const attachOpen = useSelector((state: RootType) => state.sideBarTextState.isOpen)
    //-----------------------------------------------------------------------------//

    const httpServerResponded = useRef<boolean>(false); //FLAG - use to check, is BE returned all DB chats yet or not
    
    //Used, useMemo = to memoise the bufferedChats - value because at line 361- under useCallback this array used.
    // and if this array is not memoised then, line 361 = function will render each time  
    const bufferedChats  = useMemo<dbChatPayload[]>(() => [] , [])  //is use to hold Websockets Real time chats only
    const [ dbMessages, setDbMessages ] = useState<dbChatPayload[]>([]);
    // const  [ messages, setMessages ] = useState<chatPayload[]>([])
    const  [ usersList, setUsersList ] = useState<userObject[]>([])

    // const [loading, setLoading] = useState<boolean>(true);

    const inputRef = useRef<HTMLInputElement | null>(null);
    // const roomRef = useRef<roomPayload | null>(null)
    // const usersListRef = useRef<userObject[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const socket = useSelector((state: RootType) => state.webSocketState.webSocket)
    const socketRef = useRef<WebSocket | null>(socket);
    const roomSelector = useSelector((state: RootType) => state.currRoomState);
    
///------------------------------------------------START of useEffect Codes------------------------------------------------------------//

    //Get 'All Chats of this Room from DATABASE'.
    useEffect(() => {
        
            (async () => {
                try {
                    //Fetch existing room chats from DB.
                    const response = await API.get<{chats : dbChatPayload[]}>("/api/v1/chat/getAllChats", 
                        {
                            params: {roomId : roomSelector.payload.roomId}, 
                            withCredentials: true
                        })

                        const sortedChats = response?.data?.chats.sort((a,b) => a.sent_at.localeCompare(b.sent_at));
                    if(response?.status === 200 && Array.isArray(sortedChats)) {
                        console.log("All CHAT LIST ====  ", sortedChats.map(c => c))
                        console.log("All Buffer Chats LIST ====  ", bufferedChats.map(c => c))
                        setDbMessages([...sortedChats, ...bufferedChats])
                        httpServerResponded.current = true; //Means, BE responded all chats from DB.
                    }else { 
                        console.log("Invalid Response")
                    }
                } catch (error: any) {
                    if(isAxiosError(error) && error.response) {
                        const  status = error.response.status;
                        switch(status) {
                            case 500 : 
                                console.log("Internal Server Error", error);
                                break;
                            default : 
                                console.log("Unexpected Behaviour.", error);
                                break;
                        }
                    }
            } 
            })()

            if(!socket) persistWebSocketConnection();
    }, [bufferedChats, roomSelector.payload.roomId, socket])

    //Get 'All Users of this Room'.
    useEffect(() => {   
        const fetchAllusers = async () => {
            // console.log("A!!!")
           try {
            // console.log("B!!!")
                const response = await API.get<{allUsersToThisRoom : userObject[]}>("/api/v1/room/members", {
                    params: { roomId: roomSelector.payload.roomId },
                    withCredentials: true
                });
                
                if(response.status === 200) {
                    console.log("ALLUSRS --- ", typeof response.data.allUsersToThisRoom)
                    setUsersList(response.data.allUsersToThisRoom)
                    console.log("ALL USERS LIST = ",  response.data.allUsersToThisRoom)
                    // console.log("ALL USERS LIST = ",  usersList)
                }
           } catch (error: any) {
            if(isAxiosError(error) && error.response) {
                const  status = error.response.status;
                switch(status) {
                    case 500 : 
                        console.log("Internal Server Error", error);
                        break;
                    default : 
                        console.log("Unexpected Behaviour.", error);
                        break;
                }
            }
           }
        }
        if(roomSelector.payload.roomId) {
            fetchAllusers();
        }
    },[roomSelector.payload.roomId])

    //Using Websocket Connections of user to send and receive messages in REAL TIME.
    useEffect(() => {
        console.log("SOCKET is on or not check = = = ", socket)
        if(socketRef.current instanceof WebSocket && socketRef.current.readyState === WebSocket.OPEN) { 
            //-------------------------LOGIC-------------------------------//
            console.log("Socket Refreshed")
            
            const handleMessage = (messageEvent: MessageEvent) => {
                const message = JSON.parse(messageEvent.data) 
                
                // setMessages((receivedMsg) => [...receivedMsg, message])
                // sessionStorage.setItem('messages', JSON.stringify(messages))


                if(message.type === "chat"){
                    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
                    console.log("Message on Frontend from WS = " + message.payload.text);
                    const bufferChatObject : dbChatPayload = {
                        id: uuidv4(),
                        text : message.payload.text,
                        user_id : message.payload.senderId,
                        sender_name : message.payload.senderName,
                        room_id : message.payload.roomId, 
                        sent_at : message.payload.senderTimeStampUI,
        
                    }
                    setDbMessages((chats) => [...chats, bufferChatObject]);
                    console.log("BE Websocket Responded MESSAGE = ", bufferChatObject.text)
                    console.log("Websocket RTC chat = ", bufferChatObject.text)
                    // if (!httpServerResponded.current) { // If the backend has not yet responded with all DB chats
                    //     bufferedChats.push(bufferChatObject); // Add real-time WebSocket chats to the buffer
                    // } else { // If the backend has responded with all DB chats
                    //     setDbMessages((chats) => [...chats, bufferChatObject]); // Directly update the state with real-time chats
                    // }
                }
                
                // const messagePayload : chatPayload = {
                //     type : message.type,
                //     payload : {
                //         messageId : message.payload.messageId,
                //         roomId : message.payload.roomId,
                //         roomName : message.payload.roomName,
                //         senderId : message.payload.senderId,
                //         senderName : message.payload.senderName,
                //         sender : message.payload.sender,
                //         text : message.payload.text,
                //         senderTimeStampUI : message.payload.senderTimeStampUI,
                //         serverTimeStampBE : message.payload.serverTimeStampBE,
                //     }
                // }
                // setMessages((receivedMsg) => [...receivedMsg, messagePayload]);
                // inputRef.current?.value = ""
            }
            
            //add Event= BE Websocket Server MessageEvent catching
            //addEventListener catches the WebSocket Events
            //This doesNot affect the Real DOM
            socketRef.current.addEventListener("message", handleMessage)
            // setToggle( f => !f);
    
            //Best Practise to clean up the Event when the Componet UNMOUNTS
            return () => {
                socketRef.current?.removeEventListener("message", handleMessage)
            }
    
            //socket.onmessage = (messageEvent) => {} - makes each time new instance of WS open
            //this handles only one handler
            //The advantage of using addEventListener is that it allows you to 
            //register multiple listeners for the same event. For example:


        } else {
            // attemptToReconnect();
            persistWebSocketConnection()
        }
        
    },[socketRef.current])

    //3. AUTO SCROll to latest message
    const msgEndRef = useRef<HTMLDivElement>(null); //to make auto scroll to rectent boottom of chat
    useEffect(() => {
        msgEndRef.current?.scrollIntoView({behavior : 'smooth'});
        inputRef.current?.focus();
    }, [dbMessages])
    // const bottomRef = useRef<HTMLDivElement | null>(null);
    // useEffect(() => {
    //     bottomRef.current?.scrollIntoView({behavior : 'smooth'});
    //     inputRef.current?.focus();
    // }, [])

    useEffect(() => {
        let pingInterval : number | null = null;

        if(socketRef.current) { //if WS conn. isd live.
            //setinterval is independent of useEffect re-run, it will run in every 30sec, once started.
            pingInterval = window.setInterval(() => { 
                if(socketRef.current?.readyState === WebSocket.OPEN) {
                    socketRef.current?.send(JSON.stringify({type: "heartBeat", data : "ping"}));
                    console.log("Sent HeartBeat")
                }
            }, 30000)
        }
        socketRef.current?.addEventListener('error', () => {

        })
        //If, socket dissconnetcs, due to Network/'user left the room' 
        // then this return's cleanUp function clears(stop) the setInterval operation.
        return () => { 
            if(pingInterval) clearInterval(pingInterval);
        }
    }, [])

    useEffect(() => {
        if(attachOpen) setIsAttachmentopen(c => !c)
        if(attachOpen) setAiClicked(false)
    }, [attachOpen])

    // ATTACHMENTS BUTTON Click Code
    const handleAttachment = () => {
        setIsAttachmentopen((curr) => !curr);
        setAiClicked(false)
        setProfileClicked(false)
        // window.addEventListener("click", () => {
        //     setIsAttachmentopen(false);
        // })
    }

///------------------------------------------------END of useEffect Codes------------------------------------------------------------//

///------------------------------------------------START of Button Click Codes------------------------------------------------------------//
/* The 'handleSendMessage' function makes the dependencies of useEffect Hook (at line 371) change on every render. 
   To fix this, we wrapped the definition of 'handleSendMessage' in its own useCallback() Hook. */

//'Send message' when use clicks on 'SEND'.
    const handleSendMessage = async () => {
        // const ws: WebSocket = webSocketSelector.webSocket;
        if (!inputRef.current?.value.trim()) return;
        try {
            const textMsgPayload : chatPayload = {
                type : Types.chat,
                payload : {
                    messageId : uuidv4(), //each time auto increament the each message sent,from each user.
                    senderId : roomSelector.payload.currentUserId,
                    senderName : roomSelector.payload.currentUsername,
                    roomId : roomSelector.payload.roomId,
                    roomName : roomSelector.payload.roomName,
                    text : inputRef.current?.value || "",
                    sender : "me",
                    senderTimeStampUI : getIst().toISOString(),
                    serverTimeStampBE : getIst().toISOString(), //as for now.
                }
            }

            //BufferChats Array Object
            const bufferChatObject : dbChatPayload = {
                id : uuidv4(), 
                text : inputRef.current.value, 
                user_id : roomSelector.payload.currentUserId,
                sender_name : roomSelector.payload.currentUsername,
                room_id : roomSelector.payload.roomId, 
                sent_at : getIst().toISOString(),
            }
            
                
                

                
                bufferedChats.push(bufferChatObject) //Adding Sender's chat to for RTC via WS
                await API.post("/api/v1/chat/send",
                    textMsgPayload,
                    {withCredentials : true})
                inputRef.current.value = "";

                //1st Send the MSG to BE
                // wsRef.current?.send(JSON.stringify(textMsgPayload)); //send Chat to Websocket 1st.
                console.log("USER Entered message == ", textMsgPayload)
                console.log("socket Reference == ", socketRef.current)
                socketRef.current?.send(JSON.stringify(textMsgPayload)); //send Chat to Websocket 1st.
                dispatch(setChatPayloadAction(textMsgPayload)); //pass sent to Store-slice for later use. to store thi chat in DB via http.
                // setMessages((senderMSg) => [...senderMSg, textMsgPayload]) //set message as soon as user send to everyOn from his UI
                 //clear input box
                // sessionStorage.setItem('messages', JSON.stringify(messages))
            } catch (error) {
                console.error("Error Sending message", error)
            }
    }
    
    ///------------------Send Message Via Keypress---------------------///
    useEffect(() => {
        const inputBox = inputRef.current;
        if(!inputBox) return;

        const sendMessageByKeypress = (event: KeyboardEvent) => {
            if(event.key === 'Enter') handleSendMessage();
        }
        inputBox.addEventListener('keypress', sendMessageByKeypress);

        return () => {
            inputBox.removeEventListener('keypress', sendMessageByKeypress);
        }
    }, []) //Runs Whenever User sends a msg, handleSendMessage - will call
    ///------------------Send Message Via Keypress---------------------///
///------------------------------------------------END of Button Click Codes------------------------------------------------------------//

///------------------------------------------------START of Websocket connection made live------------------------------------------------------------//
const persistWebSocketConnection = useCallback(() => {

    const setUpSocket = (socket : WebSocket) => {
        // Websocket connection is open.
        socket.onopen = () => {
            console.log("Connection is open.")

            dispatch(setWebSocketAction({ //Store the Curr-made-WS details in REDUX
                webSocket : socket,
                set : true,
            }))

            //roomSelector = is a selector contains the room-details 
            console.log("This is Room Selector Payload = ", roomSelector)
            const roomPayloadObject  = {
                type : Types.enterRoom,
                payload : {
                    roomId: roomSelector.payload.roomId,
                    roomName: roomSelector.payload.roomName,
                    roomDescription:  roomSelector.payload.roomDescription,
                    roomParticipants: roomSelector.payload.roomAdminId,
                    roomAdminId: roomSelector.payload.roomParticipants,
                    roomCreatedAt: roomSelector.payload.roomCreatedAt,
                    currentUserId : roomSelector.payload.currentUserId,
                    currentUsername : roomSelector.payload.currentUsername,
                }
            }
            socket.send(JSON.stringify(roomPayloadObject)); //Send this Curr-room&user-details to BE websocket
            
            dispatch(enterThisRoom(roomPayloadObject)); //Store the Currently enetered Room, User, Details in REDUX
        }

        // Websocket 
        socket.onmessage = (event) => {
            console.log("Got an event from websocket :  ", event.data);
        }

        socket.onclose = (event) => {
            console.log("Websocket connection is closed : ", event);
        }

        socket.onerror = (error) => {
            console.error("Websocket error : ", error);
        }
    }
    //  if(socket) return;
     console.log("Socket expired, refreshing it...")

     if(socketRef.current && socketRef.current.readyState === WebSocket.OPEN){
        console.log("Websocket connection already present and valid")
        return;
     }

     socketRef.current = new WebSocket("ws://localhost:3000");
     console.log("This is new Socket = ", socketRef.current)
     setUpSocket(socketRef.current); // Function Call
     
    // socketRef.current.onopen = ( ) => {
    //     dispatch(setWebSocketAction({ 
    //         webSocket : socketRef.current, 
    //         set: true, 
    //     }))
    //     socketRef.current?.send(JSON.stringify(roomPayloadObject))
    // }

    // dispatch(enterThisRoom(roomPayloadObject))

}, [dispatch, roomSelector])

//This fn, is called to establish WS conn. again, 
//When the user disconnected by network issue, but still inside a room.
// const attemptToReconnect = () => {

//     //reconnectInterval - hold a setTimeOut-ID as number.
//     //If, it has number, means already Reconnection-Attempted,
//     //So, return(AVOID) the duplicate Reconnection request. 
//     if(reconnectInterval.current) return; 

//     reconnectInterval.current = window.setTimeout(() => {

//         console.log("Reconnecting Websocket...")
//         persistWebSocketConnection() //Estblishes a new WS-Conn.

//         //madeThis null, bCos, it holds number only when trying to estb. new Ws conn.
//         reconnectInterval.current = null; 
//     }, 5000)//Retry, in every 5 seconds of GAP

// }

const exitRoom = () => {
    if(socket) {

        /* //1. Send BE message to close WS conn. to empty the Socket STATES
        socket.send(JSON.stringify({type: Types.outRoom}))
        //2. Send HTTP- Req. to close WS connection for Current_USER whose RoomId = X.
        await axios.post("http://localhost:3000/api/v1/chat/disconnct", 
            {
                userId: roomSelector.payload.currentUserId,
                roomId : roomSelector.payload.roomId,
            },
            {withCredentials : true}
        )
        */

       //3. Directly close the WS - Conn. from FE.
        socket.close() 
        dispatch(setWebSocketAction({
            webSocket: null,
            set: false,
        }))
    
        dispatch(exitThisRoom());

        navigate("/dashboard")
    }
}
///------------------------------------------------END of Websocket connection made live------------------------------------------------------------//

    // RENDERING part
    return  <div id="chatPage" className="h-screen ">
    {/* START */}
        <div className=" SPLIT_SCREEN grid grid-cols-12 h-screen">

            {/* LEFT Part : List of All Users to this Room.*/}
            <div className={` LEFT_PART col-span-3 text-white  bg-gradient-to-tr from-gray-300 via-black to-slate-600 h-screen text-4xl items-center grid-cols-1 overflow-hidden`}>
                <div className="SearchBar grid grid-cols-1 w-full border-b pb-4 shadow-2xl rounded-b-xl rounded-r-lg">
                    <div className="topBar ml-8 mt-6">
                        <h1 className="text-4xl font-semibold ">Users</h1>
                    </div>
                    <div className="searchBar mx-8 my-4 flex justify-center items-center bg-white rounded-lg px-4">
                        <input className="flex-1 rounded-lg p-2 h-12 text-lg text-slate-500 font-serif w-full focus:outline-none" type="text" placeholder="search users...">
                        </input>
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke-width="1.5" 
                        stroke="currentColor" 
                        className="size-6"
                        style={{color: "gray"}}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                </div>

                {/* All users lists */}
                <div className="usersList h-screen overflow-y-auto bg-gradient-to-tr from-slate-500 via-black to-slate-400 rounded-r-lg">
                    <div className=" flex-grow overflow-y-auto pb-[200px]">
                        <div className=" pt-3 ">
                            {usersList.map((x,i) => (<div key={i} className="py-6 flex justify-center items-center ">
                                <div className="px-8">
                                    <img className="h-16 w-16 rounded-full object-cover transform hover:scale-110 duration-200 ease-in-out"
                                        src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"/>
                                </div>
                                <div className="flex-1">
                                    <h1 className="text-4xl font-semibold pb-2">{x.username}</h1>
                                    <h1 className="text-2xl font-medium">{x.userBio ? x.userBio : "No bio added yet."}</h1>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                    {/* Exit the Room button */}
                    <div className=" grid grid-cols-1 w-full border pb-4 shadow-2xl rounded-b-xl rounded-lg bg-black hover:scale-90 transform duration-300 ease-in-out">
                        <button onClick={exitRoom}
                        className="text-4xl font-semibold text-white pt-2 ">Exit Room</button>
                    </div>
                </div>
                

            </div>
            
            {/* ---------------------------------------------------------------------------------------------*/}
            
            {/* RIGHT Part : CHAT Area (1. Chat Top bar, 2. All Chats, 3. Chat InputBox & Chat SendButton.).*/}
            <div className="relative RIGHT_PART col-span-9 bg-gradient-to-tr from-red-600 via-black to-blue-600 overflow-hidden h-full">
                
                {/* 1.  Chat Top Bar */}
                <div className="absolute top-16 right-0  p-4 bg-slate-50  shadowd-md border-b w-full rounded-b-xl">
                    <div id="chatTopBar" 
                            className="flex justify-between items-center ">
                                <div className="flex-1 ">
                                    <div className="flex justify-between items-center">
                                        <img className="w-14 h-14 object-cover rounded-full cursor-pointer transform hover:scale-105 duration-200 ease-in-out" 
                                        src="https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg" 
                                        alt={roomSelector.payload.roomName + 'Image'}/>
                                        <p className="flex-1 text-4xl text-black font-bold p-4">{roomSelector.payload.roomName + ' Room'}</p>
                                    </div>
                                    
                                    {/* <p className="text-4xl text-black font-bold p-4">ID : {roomSelector.payload.roomId}</p> */}
                                    {/* <p className="text-4xl text-black font-bold p-4">Room : {roomSelector.payload.roomName}</p>
                                    <p className="text-4xl text-black font-bold p-4">Members : {roomSelector.payload.roomParticipants}</p */}
                                </div>
                                
                                {/* <p className="text-4xl text-black font-bold p-4">{selector}</p>
                                <p className="text-4xl text-black font-bold p-4">{selector}</p> */}
                                <div className="flex justify-center items-center text-center mr-4">
                                    
                                    <button className="px-8 hover:scale-125 transition duration-200 ease-linear"
                                        onClick={() => {
                                        setAiClicked((curr) => !curr)
                                        setIsAttachmentopen(false)
                                        setProfileClicked(false)
                                        }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 48 48">
                                            <radialGradient id="oDvWy9qKGfkbPZViUk7TCa_eoxMN35Z6JKg_gr1" cx="-670.437" cy="617.13" r=".041" gradientTransform="matrix(128.602 652.9562 653.274 -128.6646 -316906.281 517189.719)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1ba1e3"></stop><stop offset="0" stop-color="#1ba1e3"></stop><stop offset=".3" stop-color="#5489d6"></stop><stop offset=".545" stop-color="#9b72cb"></stop><stop offset=".825" stop-color="#d96570"></stop><stop offset="1" stop-color="#f49c46"></stop></radialGradient><path fill="url(#oDvWy9qKGfkbPZViUk7TCa_eoxMN35Z6JKg_gr1)" d="M22.882,31.557l-1.757,4.024c-0.675,1.547-2.816,1.547-3.491,0l-1.757-4.024	c-1.564-3.581-4.378-6.432-7.888-7.99l-4.836-2.147c-1.538-0.682-1.538-2.919,0-3.602l4.685-2.08	c3.601-1.598,6.465-4.554,8.002-8.258l1.78-4.288c0.66-1.591,2.859-1.591,3.52,0l1.78,4.288c1.537,3.703,4.402,6.659,8.002,8.258	l4.685,2.08c1.538,0.682,1.538,2.919,0,3.602l-4.836,2.147C27.26,25.126,24.446,27.976,22.882,31.557z"></path><radialGradient id="oDvWy9qKGfkbPZViUk7TCb_eoxMN35Z6JKg_gr2" cx="-670.437" cy="617.13" r=".041" gradientTransform="matrix(128.602 652.9562 653.274 -128.6646 -316906.281 517189.719)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#1ba1e3"></stop><stop offset="0" stop-color="#1ba1e3"></stop><stop offset=".3" stop-color="#5489d6"></stop><stop offset=".545" stop-color="#9b72cb"></stop><stop offset=".825" stop-color="#d96570"></stop><stop offset="1" stop-color="#f49c46"></stop></radialGradient><path fill="url(#oDvWy9qKGfkbPZViUk7TCb_eoxMN35Z6JKg_gr2)" d="M39.21,44.246l-0.494,1.132	c-0.362,0.829-1.51,0.829-1.871,0l-0.494-1.132c-0.881-2.019-2.467-3.627-4.447-4.506l-1.522-0.676	c-0.823-0.366-0.823-1.562,0-1.928l1.437-0.639c2.03-0.902,3.645-2.569,4.511-4.657l0.507-1.224c0.354-0.853,1.533-0.853,1.886,0	l0.507,1.224c0.866,2.088,2.481,3.755,4.511,4.657l1.437,0.639c0.823,0.366,0.823,1.562,0,1.928l-1.522,0.676	C41.677,40.619,40.091,42.227,39.21,44.246z"></path>
                                        </svg>
                                    </button>
                                    <button onClick={() => {
                                        setProfileClicked(curr => !curr);
                                        setAiClicked(false)
                                        setIsAttachmentopen(false)
                                            // alert(ellipsisClicked)
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                stroke-width="1.5" 
                                                stroke="currentColor" 
                                                className="size-10 border border-gray-700 rounded-full p-1 hover:scale-105 bg-slate-100 hover:text-slate-50 hover:bg-gradient-to-tr from-red-600 via-black to-blue-600 transition duration-300 ease-in-out mr-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                        </button>
                                </div>
                    </div>
                </div>

                {/* ---------------------------------------------------------------------------------------------*/}
                {/* 2.  Chat Area */}
                {/* Real Time Chats interaction using WebSockets */}
                {/* <div id="chatArea" className=" flex-grow overflow-y-auto py-4 px-10  h-full w-full ">
                    <div className="flex flex-col space-y-4 mt-[200px]">
                        <div className="flex-grow overflow-auto ">
                            {messages.map((message, index) => (<div key={index} className={`flex ${message.payload.sender === "me" ? "justify-end " : "justify-start"} `}>
                                <div  
                                className={`${message.payload.sender === "me" ? 
                                    "flex flex-col  bg-green-300 p-4 rounded-lg mb-4 w-max max-w-xs break-words  md:max-w-lg"  
                                    : "flex flex-col bg-white p-4 rounded-lg mb-4 w-max max-w-xs md:max-w-lg break-words"} `}>
                                        <div className="text-purple-700 font-bold pb-2 text-start text-xl">
                                            {message.payload.senderName}  
                                        </div>
                                        <div>
                                            <div className="text-gray-900 text-2xl">
                                                {message.payload.text}
                                            </div>
                                            <div className="text-md font-normal text-gray-500 text-end pt-1">
                                                {message.payload.serverTimeStampBE.slice(11,16).padStart(2,'0')}
                                            </div>
                                        </div>
                                </div>
                            </div>))}
                        </div>
                        <div ref={msgEndRef}></div>
                    </div>
                </div> */}

                {/* FETCH Chats From DB  */}
                <div id="chatArea"  className=" flex-grow overflow-y-auto py-4 px-10  h-full w-full ">
                    <div className="flex flex-col space-y-4 mt-[200px]">
                        <div className="flex-grow overflow-auto ">
                            { dbMessages.map((message, index) => (<div key={`${message.id}-${index}`} className={`flex ${message.sender_name === roomSelector.payload.currentUsername ? "justify-end " : "justify-start"} `}>
                                <div  
                                className={`${message.sender_name === roomSelector.payload.currentUsername ? 
                                    "flex flex-col  bg-green-300 p-4 rounded-lg mb-4 w-max max-w-xs md:max-w-lg break-words"  
                                    : "flex flex-col bg-white p-4 rounded-lg mb-4 w-max max-w-xs md:max-w-lg break-words"} `}>
                                        <div className="text-purple-700 font-bold pb-2 text-start text-xl">
                                            {message.sender_name}  
                                        </div>
                                        <div>
                                            <div className="text-gray-900 text-2xl">
                                                {/* {message.text} */}
                                                <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message.text) }}></span>
                                            </div>
                                            <div className="text-md font-normal text-gray-500 text-end pt-1">
                                                {message.sent_at.slice(11,16).padStart(2,'0')}
                                            </div>
                                        </div>
                                </div>
                            </div>))}
                        </div>
                        <div ref={msgEndRef}></div>
                    </div>
                    <div ref={msgEndRef}></div>
                </div>

                

                {/* ---------------------------------------------------------------------------------------------*/}
                {/* 3.  Message Typing Area */}
                <div id="chatInput"
                    className="flex justify-between items-center bottom-0 h-20  shadowd-md border-collapse ">
                        <div className="bg-white flex flex-1 h-20 rounded-t-xl border border-gray-300">
                            <input autoFocus type="text" name="" id="chatInputBox"  ref={inputRef}
                            className="flex-1 px-4 text-3xl fomt-normal h-full  focus:outline-none" 
                            placeholder="start typing what are you waiting for...Time never stops..."
                            />
                            <button onClick={handleAttachment}
                                className="hover:scale-110 transition duration-200 ease-in-out p-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                                className="size-10 ">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                                </svg>
                            </button>
                        </div>

                        <div className="w-36 md:w-64 h-full rounded-t-xl  bg-gradient-to-br from-red-700 via-black to-blue-700 ">
                        <button onClick={handleSendMessage}
                            className=" w-full h-full px-4  rounded-t-xl bg-gradient-to-tr from-gray-500 via-black to-slate-600 text-white text-3xl font-semibold hover:scale-90 transform duration-300 ease-in-out ">
                            Send
                        </button>
                        </div>
                </div>
            </div>
        </div>

        {/* ---------------------------------------------------------------------------------------------*/}
        <div className={`fixed right-2 top-28 flex justify-center items-center 
            ${aiClicked ?  "visible" : "collapse"}`}>
            <AiChatBox></AiChatBox>
        </div>

        {/* ---------------------------------------------------------------------------------------------*/}
        <div className={`absolute inset-0 flex justify-center items-center bg-black bg-opacity-40 
            ${attachOpen?  "opacity-100 scale-100" : "collapse"} overflow-y-hidden overflow-x-auto`}>
            
            <Upload></Upload>
        </div>
        
        {/* ---------------------------------------------------------------------------------------------*/}
        <div className={`${isAttachmentOpen ?  "visble" : "hidden"}  fixed right-64 bottom-20`}>
            <ChatAttachments></ChatAttachments>
        </div>
        
        {/* ---------------------------------------------------------------------------------------------*/}
        {/* Profile Bar Toggle Div */}
        <div className={` fixed right-1 top-20 
            ${profileClicked ? "visble" : "collapse"}`}>
                <ProfileBox/>
        </div>

        {/* ---------------------------------------------------------------------------------------------*/}
        <div className="fixed left-1 top-20">

        </div>

        
    {/* END */}
    </div>
}