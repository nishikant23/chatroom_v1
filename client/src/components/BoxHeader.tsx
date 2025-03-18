import { memo } from "react"

export const BoxHeader = memo(({signupText} : { signupText: string}) => {
    return <div className=" block  text-purple-950 text-6xl font-bold dark:text-gray-100 flex justify-center items-center">
        {signupText}
    </div>
})