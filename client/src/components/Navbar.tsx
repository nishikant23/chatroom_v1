import { DashLeftBar } from "./DashLeftBar"
import {  memo, useState } from "react"
import { ProfileBox } from "./ProfileBox";
import { useSelector } from "react-redux"
import { componentMap } from "../types/componentMap";
import React from "react";
import { RootType } from "../redux/store";
import { Logo } from "./smalls/Logo";
import { ToggleSideBarBtn } from "./smalls/ToggleSideBarBtn";
import { ToggleProfileIconBtn } from "./smalls/ToggleProfileIconBtn";
import { AllRooms } from "./rooms/AllRooms";

export const Navbar = memo(() => {

    const [ clickedContent, setClickedContent ] = useState<boolean>(false);
    const [ ellipsisClicked, setEllipsisClicked ] = useState<boolean>(false);

    const sideBarTextSelector = useSelector((state : RootType) => state);
    const key = sideBarTextSelector.sideBarTextState.sideBarText
    const isOpen = sideBarTextSelector.sideBarTextState.isOpen;
    console.log("Side bar btn text Selector (From NAVBAR.tsx) = "+ key+" " +isOpen)


    const toggleSideBar = () => {
        setClickedContent((curr) => !curr);
    }
    const toggleProfileBar = () => {
        setEllipsisClicked((curr) => !curr);
    }
     
    return <div  className="realtive h-screen"> 
    {/* //because as per contents its increasing its height vericaly. */}
                <div id="navbar" className=" w-full flex justify-between  items-center p-4 h-28 bg-slate-100 shadow-xl">
                    {/* SideBar Icon */}
                    <div className="flex items-center"> 
                        <Logo/>
                        <ToggleSideBarBtn onclick={toggleSideBar} isContentClicked={clickedContent} />
                    </div>
                    {/* Profile Icon */}
                    <div className="text-center ml-4">
                        <ToggleProfileIconBtn onclick={toggleProfileBar} svg={
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke-width="1.5" 
                                stroke="currentColor" 
                                className="size-10 border border-gray-700 rounded-full p-1 hover:scale-105 bg-slate-100 hover:text-slate-50 hover:bg-gradient-to-tr from-red-600 via-black to-blue-600 transition duration-300 ease-in-out mr-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        } />
                    {/* <button onClick={() => {
                            setEllipsisClicked(!ellipsisClicked);
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
                    </button> */}
                    </div>
                </div>

                {/* Room Cards */}
                <div className=" absolute left-4 right-4 lg:left-60 top-32  overflow-y-auto overflow-x-hidden "
                        style={{
                                height: `calc(100vh - 10rem)`, // Subtract Navbar height (4rem) and bottom margin (1rem)
                                scrollbarWidth : 'none', //hide scrollbar for FireFox
                                msOverflowStyle : 'none', //hide scrollbar for InternetExplorer
                            }}
                        >
                        <style>
                            {`
                            div::-webkit-scrollbar{
                            display: none; //hide scrollbar for Chrome/Safari
                            }`}
                        </style>
                        <div className={`h-auto 
                            ${(key === "All Rooms" && isOpen === true) ? "visible" : "collapse"}`}>
                            {/* <RoomGrid/> */}
                            <AllRooms/>
                        </div>
                    </div>

                {/* Side Bar Toggling 
                width = w-max makes sure that when the SideBar/profileBar open/visible.
                it should not make the other contents on the screen unclickable, 
                Rather think in a way, w-max sures, the Sebar/profile bar z-index not increased other content */}
                <div className={`w-max leftSideBar  justify-start transform transition-transform duration-300  ease-in-out 
                    ${clickedContent ? "translate-x-0 ": "-translate-x-full"} lg:translate-x-0 ` }>
                        <DashLeftBar/>
                </div> 

                <div className={`w-max profileBar block absolute top-28 right-3 
                    ${ellipsisClicked ? "visible " : "collapse"}`}>
                    <ProfileBox/>
                </div>

                
                
                {/* justify-center items-center transform transition-transform duration-300  ease-in-out */}
                {key && componentMap[key]  ? (
                    <div className={`absolute inset-0 flex justify-center items-center   bg-black bg-opacity-40 
                    ${isOpen ? "opacity-100 scale-100" : "collapse"} 
                     duration-300 `}>
                        {/* {renderComponent()} */}
                        {React.createElement(componentMap[key])}
                    </div>
                ) : (<></>)}
    </div>
})