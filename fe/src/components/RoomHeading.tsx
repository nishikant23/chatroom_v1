
export const RoomHeading = ({roomName, attendee}) => {
    return <div className=" flex justify-between bg-purple-300 text-3xl text-center font-bold w-full h-max p-4 text-gray-900 ">
         
        <div className="h-fit bg-white border border-black rounded-lg ml-4 p-3 text-gray-900 shadow-2xl">
            {"Room : " + roomName}
        </div>
        <div className="h-fit bg-white border border-black rounded-lg mr-4 p-3 text-gray-900 shadow-2xl">
            {attendee + "'s workspace"}
        </div>
    </div>
}