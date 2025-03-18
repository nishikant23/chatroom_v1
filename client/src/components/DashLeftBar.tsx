import { memo, useEffect, useState } from "react"
import { BarOptions } from "./BarOptions";
import { COMPONENT_NAMES } from "../constants";
// import { useDispatch } from "react-redux";
import { screenSize } from "../utils/screenSize";


export const DashLeftBar = memo(() => {
    // const dispatch = useDispatch();
    const [ sidebarHeigth, setSidebarHeight ] = useState(0);

    const handleEmpty = () => {} //empty function

    useEffect(() => {
        const updateSidebarHeight = () => {
             setSidebarHeight(screenSize());
        }
        updateSidebarHeight();
        window.addEventListener('resize', updateSidebarHeight); // when user resizes the screen run this effect to get current hts.
        return () => window.removeEventListener('resize', updateSidebarHeight);
    },[sidebarHeigth])

        return <aside className="h-screen "> 
        {/* add this in above aside if Sidebar option increase lot  "overflow-y-auto" */}
        <div id="logo-sidebar"
            style={{height: sidebarHeigth}} //only as per clients screen size
            className="flex flex-col justify-between items-center rounded-r-lg rounded-b-lg bg-slate-100 w-56">
            {/* Side Bar options */}
                <ul className="sideBarOtions overflow-y-auto border-b">
                    <BarOptions onclick={handleEmpty} svg={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                        </svg>   
                    }
                    optionName={"Dashboard"}/>
                    <BarOptions onclick={handleEmpty} svg={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>  
                    }
                    optionName={COMPONENT_NAMES.CREATE_ROOM}/>
                    <BarOptions onclick={handleEmpty} svg={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                        </svg>                                  
                    }
                    optionName={COMPONENT_NAMES.JOIN_ROOM}/>
                    <BarOptions onclick={handleEmpty} svg={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
                        </svg>                                                  
                    }
                    optionName={COMPONENT_NAMES.ALL_ROOMS}/>
                    <BarOptions onclick={handleEmpty} svg={
                        <svg className="size-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                        </svg>                                                 
                    }
                    optionName={"Sign In"}/>
                    <BarOptions onclick={handleEmpty} svg={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                                                                            
                    }
                    optionName={"Sign Up"}/>
                </ul>
                {/* SideBar botttom Profile deatils */}   
        </div>
    </aside>
})

// interface sideBarListItemProps {
//     // icon:  React.SVGProps<SVGSVGElement>,
//     options: string,
// }
// export const SideBarListItems = ({ options}: sideBarListItemProps) => {
//     return <div className="border-b">
//         <li className="hover:scale-110 hover:shadow-lg hover:duration-300 hover:delay-50 transition duration-300 ease-in-out ">
//             <a href="" className=" flex justify-start items-center space-x-4 hover:bg-gradient-to-tr from-red-300 via-slate-100 to-purple-300 p-0 h-24 bg-slate-100   border-gray-300">
//                 <svg xmlns="http://www.w3.org/2000/svg" 
//                     fill="none" 
//                     viewBox="0 0 24 24" 
//                     stroke-width="1.5" 
//                     stroke="currentColor" 
//                     className="size-8 ml-6">
//                     <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
//                 </svg>

//                 <LeftBarContents leftBarText={options} />
//             </a>
//         </li>
// </div>
// }