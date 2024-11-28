import { useEffect, useRef, useState } from "react"
import { RoomHeading } from "./RoomHeading";

interface MessageStructure {
    id: number,
    username : string,
    text : string,
    sender : "me" | "others",
    timestamp : string,
}

export const ChatBox = ({roomObj, chatsArray}) => {
    // const [ receivedMessage, setReceivedMessage ] = useState<MessageStructure[]>([{id : 1, username: "SERVER",text : "I am from server", sender : "others"}]);
    // const [ sendMessage, setSendMessage ] = useState<MessageStructure[]>([{id : 1, username: "CLIENT",text : "I am from client", sender : "me"}]);
    const [ messages, setMessages ] = useState<MessageStructure[]>([]);
    // {id : 1, username: "SERVER",text : "I am from server", sender : "others", timestamp : 16:30:56}, {id : 2, username: "CLIENT",text : "I am from client", sender : "me"}

    const msgEndRef = useRef<HTMLDivElement | null>(null); //to make auto scroll to rectent boottom of chat
    const inputRef = useRef<string | null>(null); //reference to hold chatbox's messages

    // const [ boxes, setBoxes ] = useState<number[]>([]); //each time sender send msg a box created for each msg
    // const [ dependency, setDependency ] = useState(0); //holds the record for how many times sender sent a msg

    const wsHolder = useRef<WebSocket | null>(null); //reference created to hold anoter variable

    //timezone object
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = `${hours.toString()}:${minutes.toString()}`;

    // useEffect(() => {
    //     //@ts-ignore
    //     const storedMsg = localStorage.getItem('messages');
    //     //@ts-ignore
    //     if(storedMsg) {
    //         setMessages(JSON.parse(storedMsg));
    //     }
    // },[roomObj.payload.username, roomObj.payload.roomId])
    // const joinRoomObj = roomName;
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080'); //connects to BE websocket server via this URL

        // const reloadIncomingMsg = () => {
            // setSendMessage((prevMessages) => [...prevMessages,{
            //     id: prevMessages.length+1,
            //     text : "This is an incoming message.",
            //     sender : "others",
            // }])
        // }

        ws.onopen = () => {  //after connection made, when ws i open do this
            ws.send(JSON.stringify({roomObj}));
            // ws.send(JSON.parse({roomObj}))
        }

        wsHolder.current = ws; //currently wsHolder referencing to qs(websocket server)

        ws.onmessage = (msgValue) => { //this data = button's -onclick - Object(type, payload{message})
            // setReceivedMessage(m => [...m, {
            //     id : m.length +1,
            //     text : msgValue.data,
            //     sender : "others",
            // }]);
            // receivedMessage.forEach(element => {
            //     console.log(`Server's List msg = ${element.id}, ${element.text}, ${element.sender}`);
            // });
            const serverMsg = JSON.parse(msgValue.data);

            setMessages((rm) => [...rm, {
                id : messages.length +1,
                username : serverMsg.payload?.username,
                text : serverMsg.payload?.message,
                sender : "others",
                timestamp : new Date().toLocaleTimeString(),
            }])
        }

        return () => { //after chat page closed close this sideeffect/ close the websocket connection
            ws.close();
        }

    }, [roomObj])

    // useEffect(() => {
    //     localStorage.setItem('messages', JSON.stringify(messages));
    // }, [messages])


    useEffect(() => {
        msgEndRef.current?.scrollIntoView({behavior : 'smooth'});
        inputRef.current?.focus();
    }, [messages]) 

    //Functions
    const handleSendersMsg = (): void => {
        //@ts-ignore
        const senderMsg = inputRef.current?.value;
         //to hold the sender's side msg for his own UI
        if(!senderMsg || senderMsg === "") return;
        const newMessage : MessageStructure = {
        id : messages.length +1,
        username : roomObj.payload?.username,
        text : senderMsg,
        sender : "me",
        timestamp : new Date().toLocaleTimeString(),
        }

        setMessages((sm) => [...sm, newMessage])

        //@ts-ignore
        if(inputRef.current)  inputRef.current.value = "";
        //@ts-ignore //user enetered messages in chatbox 
        wsHolder.current?.send(JSON.stringify({ //ws will send this FE user eneterd msg to BE webSocket server/ logic
            type: "chat",
            payload : {
                roomId : roomObj.payload.roomId,
                username : roomObj.payload.username,
                message : senderMsg,
            }
        }))
    }
  
    return <div className="flex flex-col min-h-screen w-full bg-gray-900">
        {/* Room Heading Component */}
        <div className="fixed top-0 top-0 w-full flex justify-center">
            <RoomHeading roomName={roomObj.payload?.roomId} attendee={roomObj.payload?.username}/>
        </div>

         {/* User messages area */}
        <div className="flex-grow overflow-y-auto py-4 px-10 bg-gray-900">
            <div className="flex flex-col space-y-4 pb-[70px] mt-[100px]">
                <div className="flex-grow overflow-auto ">
                    {messages.map((message) => (<div className={`flex ${message.sender == "me" ? "justify-end" : "justify-start"} `}>
                        <div key={message.id} 
                        className={`${message.sender == "me" ? 
                            "flex flex-col  bg-green-300 p-4 rounded-lg mb-4 w-max max-w-xs break-words  md:max-w-lg"  
                            : "flex flex-col bg-white p-4 rounded-lg mb-4 w-max max-w-xs md:max-w-lg break-words"} `}>
                                <div className="text-purple-700 font-bold pb-2 text-start text-xl">
                                    {message.username}  
                                </div>
                                <div>
                                    <div className="text-gray-900 text-2xl">
                                        {message.text}
                                    </div>
                                    <div className="text-md font-normal text-gray-500 text-end pt-1">
                                        {currentTime}
                                    </div>
                                </div>
                        </div>
                    </div>))}
                </div>
                <div ref={msgEndRef}></div>
            </div>
        </div>

        {/* Typing Message and sending button area */}
        <div className="fixed bottom-0 w-full flex items-center">
            <input 
                type="text"
                //@ts-ignore
                ref={inputRef}
                placeholder="message . . . "
                className="flex-1 p-4 text-gray-500 text-2xl  border-gray-900"></input>
                 {/*  transition hover:scale-125 hover:duration-500 hover:delay-15 */}
                
            <button
                onClick={handleSendersMsg}
                className="text-2xl font-semibold  bg-purple-300 p-4 transition 
                        border border-black  hover:bg-purple-500 hover:duration-500"
                >send message
                </button>
        </div>
    </div>
}