
interface LeftBarContents {
    leftBarText: string;
}
export const LeftBarContents = ({leftBarText}: LeftBarContents) => { 

    return<div className=" text-black h text-xl font-semibold ">
        {leftBarText}
    </div>
}