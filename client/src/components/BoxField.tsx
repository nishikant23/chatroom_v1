import { forwardRef, memo } from "react"

interface filedProps {
    labelText:string, 
    placeholderText:string}

export type Ref = HTMLInputElement; 
 //use ForwardRef = when u r passing another useRef() to this 1-comp to This-comp
export const BoxField = memo(forwardRef<Ref, filedProps>((props,refProp) => {  //by this i can access this child comp. by its parent comp.
     const { labelText, placeholderText } = props; //obj destructuing
    return <div className="space-y-4">
            <label className="block text-2xl  font-bold text-gray-700 dark:text-gray-gray-100">
                {labelText}
            </label>
            <input type="text"
                ref={refProp}
                placeholder={placeholderText}
                className="text-xl w-full py-2 h-16 px-2 rounded-lg border border-gray-500 dark:border-gray-100 text-gray-500 dark:text-gray-gray-100  focus:border-blue-600  dark:focus:border-blue-500  focus:outline-none cursor-pointer peer"/>
    </div>
}))