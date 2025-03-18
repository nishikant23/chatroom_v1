import { useDispatch } from "react-redux"
import { setSideBarText } from "../../redux/slices/sideBarTextSlice";
// import { useRef } from "react";
// import { useSelector } from "react-redux";
// import { RootType } from "../../redux/store";


export const ChatAttachments = () => {

    const dispatch = useDispatch();
    // const selector = useSelector((state: RootType) => state.chatAttachmentState);
    // const imageInputRef = useRef<HTMLInputElement | null>(null); // CHANGED

    const openImages = () => {

        // alert("Opened Image.")
        dispatch(setSideBarText({
            isOpen: true,
            sideBarText : "uploadImage"
        }))
        // imageInputRef.current?.click()
        // selector.attachmentRef?.current.click()

    }
    const openVideos = () => {
        // alert("Opened Video.")
        dispatch(setSideBarText({
            isOpen: true,
            sideBarText : "uploadVideo"
        }))

    }
    const openDocuments = () => {
        alert("Opened Drawing.")
        dispatch(setSideBarText({
            isOpen: true,
            sideBarText : "uploadDrawing"
        }))
    }
    const openDrawing = () => {
        alert("Opened Document.")
        dispatch(setSideBarText({
            isOpen: true,
            sideBarText : "uploadDocument"
        }))
    }

    return <div className=" bg-white flex-col justify-center bg-opacity-100 items-center w-max h-max text-center rounded-lg border border-b-2 text-black text-2xl font-semibold">
        <div className="items-center m-4 w-52 p-3 hover:scale-110 transition duration-300 ease-in-out hover:bg-gray-200 rounded-lg">
            <button  onClick={() => {
                openImages()
            }} className="">Photos</button>  
        </div>
        <div className="items-center m-4 w-52 p-3 hover:scale-110 transition duration-300 ease-in-out hover:bg-gray-200 rounded-lg">
            <button onClick={openVideos} className="">Videos</button> 
        </div>
        <div className="items-center m-4 w-52 p-3 hover:scale-110 transition duration-300 ease-in-out hover:bg-gray-200 rounded-lg">
            <button onClick={openDrawing} className="">Drawing</button> 
        </div>
        <div className="items-center m-4 w-52 p-3 hover:scale-110 transition duration-300 ease-in-out hover:bg-gray-200 rounded-lg">
            <button onClick={openDocuments} className="">Document</button> 
        </div>
       
    </div>
}