import { memo } from "react"
import { Link } from "react-router-dom"


export const BoxBottom = memo(({bottomText, hyperLink, path} : {bottomText: string, hyperLink: string, path: string}) => {

    return <div className="block text-gray-900 text-3xl font-bold dark:text-gray-100 flex justify-center items-center">
            <p className=" text-center text-md font-normal text-gray-700 dark:text-gray-100">{bottomText}
                <Link to={path} className="text-blue-700 dark:text-blue-300 hover:text-purple-700 dark:text-green-500 dar:hover:green-300">{hyperLink}</Link>
            </p>
    </div>
})