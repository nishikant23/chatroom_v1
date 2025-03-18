import { memo } from "react"


export const BoxButton = memo(({onClick, buttonText}:{onClick: () => void ,buttonText: string}) => {

    return <div className="">
        <button onClick={onClick}
        className="w-full  h-24 rounded-lg text-3xl font-bold bg-gray-900  dark:bg-gray-100 text-gray-100 dark:text-gray-100 hover:bg-gradient-to-tr hover:from-purple-800 hover:to-purple-400 dark:hover:bg-gradient-to-tr dark:hover:from-purple-200 dark:hover:to-purple-400 hover:scale-105 hover:shadow-lg transform transition duration-300 ease-in-out">
        {buttonText}</button>
    </div>
})