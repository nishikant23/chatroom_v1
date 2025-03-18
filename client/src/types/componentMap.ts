
import { CreateRoom } from "../components/rooms/CreateRoom";
import { JoinRoom } from "../components/rooms/JoinRoom";
// import { FC } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const componentMap: Record<string, React.ElementType> = {
    // { [key: string]: FC<any> }
    "Create Room": CreateRoom,
    "Join Room": JoinRoom,
    // "All Rooms": AllRooms,
    // "Sign In": Signin,
    // "Sign Up": Signup,
    // "Profile": Profile,
    // "Settings": Settings,
    // "Upgrade Pro": UpgradePro,
};
