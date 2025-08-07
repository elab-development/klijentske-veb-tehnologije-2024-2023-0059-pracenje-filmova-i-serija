import { forwardRef } from "react";
import type { CastInfo } from "~/types";
import CastItem from "../CastItem";
import { toggleElementWD } from "~/functions";

type Props = {
    castInfo: {cast: CastInfo[]}
}

const MoreCast = forwardRef<HTMLSpanElement, Props>((props, ref) => {
    const content = props.castInfo?.cast?.map(item => {
        return <CastItem key={item.id} props={item} />
    });

    const handleClick = () => {
        if (ref && typeof ref !== "function" && ref.current)
            toggleElementWD({element: ref.current, time: 10});
    };

    return <>
        <span ref={ref} className="allCast">
            <span className="overflow-hidden">
                <div className="flex justify-between">
                    <h2 className="mb-5 text-3xl font-medium">Full Cast</h2>
                    <button className="button h-[30px] w-[30px] grid place-items-center rounded-[5px] bg-[#DF354B]" onClick={handleClick}>
                        <svg width="25" height="25" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32.9802 16.9902L15.99 33.9803M32.9802 33.9803L15.99 16.9902" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

                <span className="overflow-y-auto h-[90%]">
                    {content}
                </span>
            </span>
            <div className="w-full h-full fixed top-0 left-0 z-[-1]" onClick={handleClick}></div>
        </span>
    </>;
})

export default MoreCast;