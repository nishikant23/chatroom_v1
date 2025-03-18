import { useRef, useState } from "react";
import { setSideBarEmpty } from "../../redux/slices/sideBarTextSlice";
import { useDispatch } from "react-redux";


export const UploadImage = () => {
    const [  images, setImages ] = useState<FileList | null>(null);
    const [ selectedImage, setSelectedImage ] = useState<string | undefined>(undefined)
    const imageBrowseRef = useRef<HTMLInputElement | null>(null)
    const [ isUploadBtnClicked, setIsUplaodBtnClicked ] = useState<boolean>(true);
    const dispatch = useDispatch()

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setImages(event.target.files)
        imageBrowseRef.current?.click()
    }
    

    return <div className="relative w-attchmentWidth h-attchmentHeigth bg-slate-100 rounded-lg">
            
            {/* GRID */}
            <div className="grid grid-rows-12 w-full h-full  justify-center items-center">
            <button onClick={() => {
                dispatch(setSideBarEmpty())
            }}
            className="absolute right-3 top-3 row-span-1 transition hover:scale-110 duration-200 ease-linear">
                <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke-width="1.5" 
                    stroke="currentColor" 
                    className="size-8 text-red-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
                {/* Image */}
                <div className=" row-span-7  w-full h-full overflow-hidden">
                    {selectedImage && <img className="object-contain w-full h-full max-h-full max-w-full m-2 rounded-sm  " src={selectedImage} />}
                </div>
                {/* Caption */}
                {images && <div className="row-span-1  w-full h-full max-h-full max-w-full">
                    <div className="rounded-lg p-4 flex justify-between items-center bg-white w-full h-full max-h-full max-w-full ">
                        <input className=" focus:outline-none flex-1 p-2 w-full text-2xl" type="text" placeholder="caption..." />
                        <button className="hover:scale-125 transition duration-200 ease-linear text-white font-bold py-2 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#00ff48" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                            className="size-12 ">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                            </svg>
                        </button>
                    </div>
                </div>}
                {/* Preview */}
                <div className=" row-span-3 flex overflow-x-auto h-max overflow-y-hidden">
                    {images && Array.from(images).map((file, index) => (
                        <div key={index}
                            onChange={() => {
                                setSelectedImage(() => URL.createObjectURL(file))
                            }}
                            className=" m-1 rounded-md">
                                <button onClick={() => {
                                    setSelectedImage(() => URL.createObjectURL(file))
                                }}
                                    className="flex justify-center items-center hover:bg-gray-300 hover:rounded-md w-28 h-28 p-1">
                                    <img className=" m-2 cursor-pointer  w-max h-full p-2" src={URL.createObjectURL(file)} alt={file.name} />
                                </button>
                            </div>
                    ))}
                </div>
            </div>
            <input ref={imageBrowseRef} hidden type="file" multiple onChange={handleChange}/>
            {isUploadBtnClicked ?  <button 
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={() => {
                        imageBrowseRef.current?.click()
                        setIsUplaodBtnClicked(false)
                    }} //  Opens file browser
                >
                    Upload Image
                </button> : ""}
        </div>
}