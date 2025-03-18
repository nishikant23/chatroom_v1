import { memo } from "react"

interface ToggleProfileIconBtnProps {
    onclick : () => void,
    svg : React.ReactNode,
}


export const ToggleProfileIconBtn = memo(({onclick, svg} : ToggleProfileIconBtnProps) => {
    
    return <>
        <button onClick={onclick}>
            {svg}
        </button>
    </>
})