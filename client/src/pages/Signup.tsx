import React, { useRef} from "react"
import { BoxBottom } from "../components/BoxBottom"
import { BoxButton } from "../components/BoxButton"
import { BoxField } from "../components/BoxField"
import { BoxHeader } from "../components/BoxHeader"
import axios from "axios";
import { userPayload } from "../types/payloads"
import { useDispatch } from "react-redux"
import { addUserAction } from "../redux/slices/userSlice"
import {  useNavigate } from "react-router-dom"
import { isAxiosError } from "axios"
import { API } from "../apis/api"


export const Signup: React.FC = () => {
    // const [ username, setUsername ] = useState<HTMLInputElement | null | undefined>(null)
    // const [ password, setPassword ] = useState<HTMLInputElement | null | undefined>(null)
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const haldleSignup = async (): Promise<void> => { //Button Click Function

        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        // console.log(`username - ${ username}, password type - ${ password}`)
        try {
            const response = await API.post<userPayload>("/api/v1/user/signup", 
            {username, password}, { withCredentials: true})

            const data : userPayload = response.data;
            if(response.status === 201) {
                const { userId, username } = data.payload
                console.log(`username ${username}`);
                if(userId && username){
                    dispatch(addUserAction({ //dispatch each user to who Signup/Signin
                        payload : {
                            userId,
                            username,
                        }
                    }))
                }
                alert("Signup Successfull.")
                navigate("/dashboard")
            }else if(response.status === 200) {
                alert("User already exists, Please signin.");
                navigate("/signin")
            }
        } catch (error: any) {
            if(isAxiosError(error) && error.response) {
                const status = error.response.status;
                switch(status) {
                    case 400 :
                    alert("All fields are required to enter.");
                    break;
                    case 500 : 
                    alert("Internal server error. Please Try again");
                    break;
                    default :
                    alert("Sign-up failed. Please try again.")
                    break;
                }
            }else {
                console.log("Error signing up", error)
                alert("An unexpected error occurred.");
            }
            
        }
    };
    
    // useEffect(() => {
    //     setUsername(usernameRef.current);
    //     setPassword(passwordRef.current)
    // },[usernameRef, passwordRef])
    

    return <div>
        <div className="  space-y-24 overflow-auto bg-gradient-to-tr from-red-600 via-black to-blue-600 dark:bg-gray-800 min-h-screen w-full ">
            <div className="pb-12 xl:pb-0 flex flex-col xl:flex-row items-center justify-center md:justify-around space-y-24">
                <div className="flex flex-col w-max mx-48 md:mx-56 lg:mx-24 mt-24 md:mt-48  space-y-24 md:space-y-16   text-center px-4">
                    <div className="text-8xl lg:text-12xl   font-bold dark:text-gray-100 space-y-4 bg-gradient-to-tr from-red-700 via-slate-100 to-purple-800 bg-clip-text text-transparent animate-slidein500ms opacity-0 ">
                        Welcome <br/> to <br/> ChatSphere
                    </div>
                    <div className="text-4xl lg:text-6xl  lg:mb-24 font-semibol dark:text-gray-100 bg-gradient-to-tr from-red-300 to-white bg-clip-text text-transparent animate-slidein700ms opacity-0">
                        Connect with friends, family, and <br/> colleagues instantly!
                    </div>
                    <div className="text-xl  lg:text-2xl font-semibold dark:text-gray-100 break-words bg-gradient-to-tr from-blue-100 to-white bg-clip-text text-transparent animate-slidein900ms opacity-0">
                        ChatSphere is the ultimate platform for seamless communication.
                        <br />
                        Whether you're chatting one-on-one or connecting with a group,
                        <br />
                        our app provides fast, reliable, and secure messaging.
                        <br />
                        Share your moments with ease, create meaningful connections,
                        <br />
                        and stay in touch like never before.
                    </div>
                </div>

                <div className="mr-0 lg:mr-24 w-max h-182 bg-white dark:bg-gray-100 rounded-lg p-8 m-4 space-y-12 bg-gradient-to-tr from-red-300 via-slate-200 to-purple-500 animate-slidein200ms opacity-0">
                    <img src="https://img.freepik.com/premium-vector/chat-online-outline-icon-white-color-isolated-purple-background_824631-4693.jpg?w=360" alt="logo" className="w-24 h-24 rounded-full mx-auto"/>
                    <BoxHeader signupText="Sign Up"/>
                    <BoxField ref={usernameRef} labelText={"Username"} placeholderText={"Enter your username"}/>
                    <BoxField ref={passwordRef} labelText={"Password"} placeholderText={"Enter your password"}/>
                    <BoxButton onClick={haldleSignup} buttonText={"Sign Up"}/>
                    <BoxBottom bottomText={"Already have an account? "} hyperLink={"Sign In"} path={"/signin"}/>
                </div>
            </div>
        </div>
    </div>
}