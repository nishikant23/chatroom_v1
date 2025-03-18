import { memo } from "react";
import { FiMenu, FiX } from "react-icons/fi";

interface ToggleSideBarBtnProps {
    onclick: () => void, 
    isContentClicked: boolean
}

export const  ToggleSideBarBtn = memo(({onclick, isContentClicked}  : ToggleSideBarBtnProps) => {

    return <div>
        <button onClick={onclick}
            className="block rounded-lg p-1 hover:scale-105 bg-slate-100   hover:text-slate-50 hover:bg-gradient-to-tr from-red-600 via-black to-blue-600 transition duration-300 ease-in-out ">
                {isContentClicked ? <FiX className="size-9 border border-gray-700 rounded-lg p-1 "/> : <FiMenu className="size-9 border border-gray-700 rounded-lg p-1 "/>}
            {/* <svg xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke-width="1.5" 
                stroke="currentColor" 
                className=" size-12 border-2 border-gray-700 rounded-lg p-1 hover:scale-110 bg-slate-100 hover:text-slate-50 hover:bg-gradient-to-tr from-red-600 via-black to-blue-600 transition duration-300 ease-in-out">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg> */}
        </button>
    </div>
})