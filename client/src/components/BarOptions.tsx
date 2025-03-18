
import { useDispatch } from "react-redux";
// import { clickedButton } from "../redux/slices/slice";
import { setSideBarText } from "../redux/slices/sideBarTextSlice";
import { memo } from "react";

interface barOptionProps {

    svg : React.ReactNode,
    optionName :string,
}
export const BarOptions = memo(({svg, optionName, onclick}: barOptionProps & {onclick : () => void}) => {
    const dispatch = useDispatch();
    
    //Just dispatch the buttonName which user Clicked, and pass true-boolean as button click.
    const handleClick = (optionName:string) => { 
        dispatch(setSideBarText({isOpen: true, sideBarText: optionName}));
    }

    return <div className="">
        <li className={`hover:text-slate-50 hover:scale-90 transistion duration-400  ease-in-out hover:bg-gradient-to-tr from-red-600 via-black to-blue-600 w-full items-center rounded-md`}>
            <button onClick={() => {
                onclick()
                handleClick(optionName)
            }}
            className="flex items-center px-2 py-4 mx-2">
                    <p>{svg}</p>
                    <span className="flex-1 text-lg font-semibold ml-4">{optionName}</span>
            </button>
        </li>
    </div>
})