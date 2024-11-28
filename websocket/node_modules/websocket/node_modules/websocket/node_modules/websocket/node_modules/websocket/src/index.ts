import { WebSocketServer } from "ws";

const wss  = new WebSocketServer({port:8080}, () => {
    console.log("Listening on port 8080.");
})



interface User {
    socket : WebSocket,
    id : number,
    roomId : string,
    username : string,
}

let userCount = 0;

let allUsers: User[] = [];

wss.on("connection", (socket) => {
    userCount += 1;
    console.log("Connected to websocket")
    console.log("User Counts = "+ userCount);


    socket.on("message", (message) => {
        //@ts-ignore
        const parsedMessage = JSON.parse(message);

        console.log(`type=${parsedMessage.roomObj?.type}, roomId=${parsedMessage.roomObj?.payload.roomId}, username=${parsedMessage.roomObj?.payload.username}`)

        if(parsedMessage.roomObj?.type == "join") {
            // console.log("AAAA")
            allUsers.push({
                //@ts-ignore
                socket,
                id : allUsers.length+1,
                roomId : parsedMessage.roomObj?.payload.roomId,
                username : parsedMessage.roomObj?.payload.username,
            })
            console.log("BBBB")
        }
        console.log("Pushed Users to Array = " + allUsers.length);
        allUsers.forEach(element => {
            console.log(`UserId - ${element.id}, Room - ${element.roomId}, Username - ${element.username}` )
        });

        if(parsedMessage.type == "chat") {
            for(let i=0; i<allUsers.length; i++) {
                if(allUsers[i].roomId === parsedMessage.payload.roomId && allUsers[i].username !== parsedMessage.payload.username) {
                    // const msg = socket.send(parsedMessage.payload.message);
                    console.log("Received Data = " + parsedMessage.payload.message);
                    // socket.send(parsedMessage.payload.message);
                    allUsers[i].socket.send(JSON.stringify(parsedMessage));
                    // console.log("recieved msg = " + msg + ", type of msg = "+typeof msg)

                }
            }
            // socket.send(parsedMessage.payload.message)
        }
        
        console.log("All users = " + allUsers.length);
        // console.log("message type before parsing = " + typeof message);
        // //@ts-ignore
        // let inputReq: User = JSON.stringify(message)
        // console.log(inputReq);
        // console.log("Message type after parsing  = " + typeof inputReq)
        
    })
})