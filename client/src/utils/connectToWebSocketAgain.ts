import { useDispatch } from "react-redux";
import { setWebSocketAction } from "../redux/slices/webSocketSlice";
import { useSelector } from "react-redux";
import { RootType } from "../redux/store";




export const useWebsockets = () => {
    
    const dispatch = useDispatch();
    const selector = useSelector((state: RootType) => state.webSocketState)

    const ws = new WebSocket("ws://localhost:3000");

    dispatch(setWebSocketAction({
        webSocket : ws,
        set : true,
    }))

    return { WebSocket : selector.webSocket, set: selector.set };
}