
// import { useSelector } from "react-redux"
import { memo } from "react"
import { Navbar } from "../components/Navbar"
// import { RootType } from "../redux/store"
// import { useEffect, useState } from "react"
// import { screenSize } from "../utils/screenSize";



export const Dashboard = memo(() => {

    // const [ size, setSize ] = useState(0);
    // useEffect(() => {
    //     const updateScreen = () => {
    //         setSize(screenSize);
    //     // alert("From Inside UseEffect DASHBOARD=" + size)
    //     }
    //     updateScreen();
    //     window.addEventListener('resize', updateScreen)
    //     return () => window.removeEventListener('resize', updateScreen)
    // },[size])
    

    return <div className="relative h-screen overflow-hidden">
            <div className="topNavBar fixed top-0 left-0 right-0 z-50">
                <Navbar/>
            </div>
            
    </div>
})