import { GoogleGenerativeAI } from "@google/generative-ai"
import React, { MouseEventHandler, useCallback, useEffect, useRef, useState } from "react";
import {v4 as uuidv4 } from "uuid";
import ReactMarkdown from "react-markdown"
interface AiChatProp {
    id: string,
    text: string,
    sender: string,
}
export const AiChatBox = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const genAi = new GoogleGenerativeAI("AIzaSyC-03R-vkaPOLN2BHSOCIDam8hlUJyqxgI")
    const model = genAi.getGenerativeModel({model : "gemini-1.5-flash"});
    const [ aiChats, setAiChats ] = useState<AiChatProp[]>([])

/////////////////////////------------------    LOGICS START     --------------------////////////////////////
 //----------------------Handele a logic to Send Message to AI-----------------------///
 const handleClick = useCallback(async () => {
    if(!inputRef.current?.value.trim() || !inputRef.current) return; //if chat sent empty

    //USER sent Message
    if(inputRef.current){
        setAiChats((curr) => [...curr, {
            id: uuidv4(),
            text : inputRef.current!.value,
            sender : "user",
        }])
    }
    const result = await model.generateContent(JSON.stringify(inputRef.current?.value))
    const data = result.response.text();
    //AI responded Message
    setAiChats((prev) => [...prev, {
        id: uuidv4(),
        text : data,
        sender : "ai"
    }])
    console.log("GEN AI RESPONSE = = ", result.response.text())
},[model])
//----------------------------------END--------------------------------------------///

//--------------Auto Scroll Chat Area of Ai box to latest msg view-----------------///
const divRef = useRef<HTMLDivElement>(null)
useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
    inputRef.current?.focus();
    if (inputRef.current) {
        inputRef.current.value = "";
    }
}, [aiChats])
//-------------------------------------END---------------------------------------------///

//--------------On Mouse Drag do Scroll inside Ai-Response Div(Box) logic--------------///
const chatRef = useRef<HTMLDivElement>(null);

// const [ mouseMove, setMouseMove ] = useState({x: 0, y:0});
// const [ scrollPos, setScrollPos ] = useState({left: 0, top:0});
const [ isDragging, setIsDragging ] = useState<boolean>(false);

const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    
    if(!isDragging || !chatRef.current) return; //if ref is null return

    const rect = chatRef.current.getBoundingClientRect();
    
    const xCoords = e.clientX - rect.left;
    const yCoords = e.clientY - rect.top;
    chatRef.current.scrollLeft = xCoords;
    chatRef.current.scrollTop = yCoords;
    // setMouseMove({x: xCoords, y: yCoords})
    console.log(` x = ${xCoords} & y = ${yCoords}`);
}, [isDragging])

//Drag started
const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(e.button !== 1 || !chatRef.current) return; //If Mouse middle-scroll button not clicked
    e.preventDefault()
    
    setIsDragging(true);
    // setScrollPos({left: chatRef.current.scrollLeft, top : chatRef.current.scrollTop})
    console.log("Dragging Started.")

}, [])
const handleMouseUp = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(!chatRef.current) return;
    setIsDragging(false);
    console.log("Drag ended.")
    
}, [])
const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(!chatRef.current) return;  
    setIsDragging(false);
    // setMouseMove({x: 0, y:0})
    console.log("Mouse Left.")
},[])
//----------------------------------END--------------------------------------------///

//-----------------------On KeyPress 'Enter' Send Message--------------------------///
useEffect(() => {
    const inputBox = inputRef.current;
    if(!inputBox) return;
    const handleKeyPress = (event: KeyboardEvent) => {
        if(event.key === 'Enter') handleClick();
    }
    inputBox.addEventListener('keypress', handleKeyPress);

    return () => {
        inputBox.removeEventListener('keypress', handleKeyPress)
    }

}, [handleClick]) //Runs when handleClick - fn clicked
//----------------------------------END--------------------------------------------///
/////////////////////////------------------     LOGICS END      --------------------////////////////////////


    return <div className="bg-gradient-to-tr from-red-300 via-balck to-blue-300 grid row-span-12 rounded-xl xl:w-attchmentWidth xl:h-attchmentHeigth lg:w-110 lg:h-120 w-96 h-116   shadow-2xl">
            <div className="aiNavbar relative  row-span-1 rounded-lg bg-white shadow-lg flex justify-center items-center mt-2 mr-2 ml-2 xl:h-12 lg:h-10 h-8  ">
                <div className="pl-4 text-center items-center xl:text-2xl lg:text-xl text-lg flex-1 font-extrabold text-black tracking-wide drop-shadow-md font-serif h-10 ">
                    AI helps you write excellently.
                </div>

                {/* <button onClick={() => {
                    dispatch(setSideBarEmpty())
                    setAiBoxOpen(false)
                }}
                className="absolute right-4 top-5 row-span-1 flex justify-center items-center transition hover:scale-110 duration-200 ease-linear z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke-width="1.5" 
                        stroke="currentColor" 
                        className="size-8 text-red-500">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button> */}
            </div>
            {/* Chat AREA */}
            <div className="aiResponse row-span-10 flex-grow overflow-y-auto overflow-x-hidden w-full h-full">
                <div className="flex-col ">
                    <div className="flex-grow overflow-auto w-full h-full max-h-full ">
                        {aiChats.map((chat) => (
                            <div key={chat.id} className={`flex ${chat.sender === "user" ? "justify-end" : "justify-start"} py-4`}>
                                <div onMouseMove={handleMouseMove} 
                                    onMouseDown={handleMouseDown} 
                                    onMouseUp={handleMouseUp}
                                    onMouseLeave={handleMouseLeave}

                                    ref={chatRef} id="chatBlock"  className={`text-xl font-sans font-normal px-3 py-3 mx-2 rounded-md w-max max-w-xs md:max-w-lg break-words
                                        ${chat.sender === "user" ? "bg-green-400 " : "bg-white"} overflow-x-auto`}>
                                        <ReactMarkdown>{chat.text}</ReactMarkdown>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div ref={divRef}></div>
            </div>
            <div className="aiType flex row-span-1 justify-between items-center top:shadow-lg  bg-white rounded-xl mb-2 ml-4 mr-4 xl:h-20 lg:h-16 h-12">
                <input ref={inputRef} className="flex-1 text-2xl focus:outline-none p-1 mx-1 xl:h-16 lg:h-14 h-10  " type="text"/>
                <button onClick={handleClick}
                    className="w-6 transition hover:scale-125 duration-200 ease-linear mr-8 px-1 xl:h-16 lg:h-14 h-10 ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
    </div>
}