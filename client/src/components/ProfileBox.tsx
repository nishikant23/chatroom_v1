import { useNavigate } from "react-router-dom"
import { BarOptions } from "./BarOptions"
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUserAction, removeUserAction } from "../redux/slices/userSlice";
import { useSelector } from "react-redux";
import { RootType } from "../redux/store";
import { useEffect, memo } from "react";
import { userPayload } from "../types/payloads";
import { isAxiosError } from "axios";
import { removeCookie } from "../utils/removeCookie";
import { API } from "../apis/api";

export const ProfileBox = memo(() => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    //Fetch & authenticate the user details, each time the user refresh's the page
    useEffect(() => {
        try {
            const refreshData = async () => {
                const response = await API.get<userPayload>("/api/v1/user/dashboard",
                    {withCredentials: true}
                )
                if(response.status === 200) {
                    console.log("Refreshed The Dashboard PAGE")
                    const { userId, username, userBio } = response.data.payload;
                    console.log(`id :  ${userId}, username : ${username}`)
                    dispatch(addUserAction({
                        payload : {
                            userId,
                            username,
                            userBio,
                        }
                    }))
                }
            }
            refreshData();
        } catch (error : any) {
            if(isAxiosError(error) && error.response) {
                const status = error.response.status;
                switch (status) {
                    case 500 : 
                        alert("Error refreshing a page.");
                        break;
                    default : 
                    alert("Unexpected error");
                    break;
                }
            }
            console.error("eror refreshing the page", error)
        }
    },[])

    //Handle user Logout
    const handleLogout = async () => {
        const response = await API.post("/api/v1/user/logout")
        if(response.status == 200) {
            removeCookie("accessToken");
            removeCookie("refreshToken");
            dispatch(removeUserAction());
            alert("Logout successfully.")
            navigate("/signin")
        }else {
            alert("Logout unsuccessfull, Try again.")
        }
    }
    const handleEmpty = () => {

    }

    const userSelector = useSelector((state : RootType) => state.userState);


    return <div className=" h-max bg-slate-100 w-max rounded-lg border shadow-lg mb-2 z-50">
        <ul className="">
            <div className=" profileBottom flex justify-start items-center border-b shadow-sm ">
                <div className=" ml-4 leading-8 my-2">
                    <div className="text-xl font-bold">{userSelector.payload.username ? userSelector.payload.username.charAt(0).toUpperCase() + userSelector.payload.username.slice(1) : ""}</div>
                    <div className="text-md">{userSelector.payload.username ? userSelector.payload.username.concat('@gmail.com') : ""}</div>
                </div>
            </div>
            <div className="">
                <BarOptions onclick={handleEmpty} svg={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>   
                }
                optionName={"Profile"}/>
                <BarOptions onclick={handleEmpty} svg={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                    
                }
                optionName={"Settings"}/>
                <BarOptions onclick={handleEmpty} svg={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                    </svg>
                }
                optionName={"Upgrade Pro"}/>
                <BarOptions onclick={handleLogout} svg={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                    </svg>                 
                }
                optionName={"Log Out"}/>
            </div>
        </ul>
    </div>
})