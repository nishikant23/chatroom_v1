import { memo } from "react"
import { RoomGrid } from "./RoomGrid"


export const AllRooms = memo(() => {
    return  <div>
        <RoomGrid/>
    </div>
})