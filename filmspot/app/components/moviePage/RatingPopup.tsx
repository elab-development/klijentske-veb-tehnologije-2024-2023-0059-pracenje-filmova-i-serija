import { forwardRef, useLayoutEffect, useRef, type RefObject } from "react";
import { saveToWatchlist, toggleElementWD } from "~/functions";
import type { MovieHolderInfo } from "~/types";

type Props = {
    props: {
        name: "movie" | "tv show",
        id: MovieHolderInfo["id"],
        currentRating: number | false
    }
}

const RatingPopup = forwardRef<HTMLDivElement, Props>(({props}, ref) => {
    const ratingHolderRef = useRef<HTMLSpanElement>(null);
    const ratingValue = useRef(props.currentRating);
    const rateHandle = (e: SVGSVGElement) => {
        if(ratingHolderRef.current){
            ratingValue.current = 10 - (Array.from(ratingHolderRef.current.children).indexOf(e));
        }
    }

    const handleExit = () => {
        if (ref && typeof ref !== "function" && ref.current)
            toggleElementWD({element: ref.current, time: 10});
    }

    const handleClick = () => {
        if(props.currentRating !== ratingValue.current && ratingValue.current){
            props.currentRating = ratingValue.current;
            saveToWatchlist(props.id, ratingValue.current);
        }
        
        handleExit();
    };

    useLayoutEffect(() => {
        if(props.currentRating && ratingHolderRef.current)
            ratingHolderRef.current.children?.[10 - props.currentRating]?.classList?.add("clicked");
    }, [props.currentRating])

    return (
        <div ref={ref} className="ratingPopup hidden">
            <span>
                <span className="flex justify-between items-center">
                    <h2 className="text-2xl font-medium">{`Rate this ${props.name}`}</h2>

                    <button className="button h-[30px] w-[30px] grid place-items-center rounded-[5px] bg-[#DF354B]" onClick={handleExit}>
                        <svg width="25" height="25" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32.9802 16.9902L15.99 33.9803M32.9802 33.9803L15.99 16.9902" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </span>
                
                <span ref={ratingHolderRef} className="stars flex gap-2 mt-5">
                    <SVGElement rateHandle={rateHandle} parentRef={ratingHolderRef} />
                    <SVGElement rateHandle={rateHandle} parentRef={ratingHolderRef} />
                    <SVGElement rateHandle={rateHandle} parentRef={ratingHolderRef} />
                    <SVGElement rateHandle={rateHandle} parentRef={ratingHolderRef} />
                    <SVGElement rateHandle={rateHandle} parentRef={ratingHolderRef} />
                    <SVGElement rateHandle={rateHandle} parentRef={ratingHolderRef} />
                    <SVGElement rateHandle={rateHandle} parentRef={ratingHolderRef} />
                    <SVGElement rateHandle={rateHandle} parentRef={ratingHolderRef} />
                    <SVGElement rateHandle={rateHandle} parentRef={ratingHolderRef} />
                    <SVGElement rateHandle={rateHandle} parentRef={ratingHolderRef} />
                </span>

                <button 
                    className="button mt-5 px-15 py-1 bg-white !text-black font-medium rounded-[5px]" 
                    onClick={handleClick}
                >
                    Rate
                </button>
            </span>
        </div>
    );
})

// 43DFD7

function SVGElement({rateHandle, parentRef}: {rateHandle: (e: SVGSVGElement) => void, parentRef: RefObject<HTMLSpanElement | null>}){
    let timeout = useRef<ReturnType<typeof setTimeout>>(null);
    const mouseEnterHandle = (e: SVGSVGElement) => {
        if(timeout.current)
            clearTimeout(timeout.current);
        
        e.classList.add("open");
    }

    const mouseLeaveHandle = (e: SVGSVGElement) => {
        timeout.current = setTimeout(() => {
            e.classList.remove("open");
            timeout.current = null;
        }, 50);
    }

    const clickHandle = (e: SVGSVGElement) => {
        if(parentRef.current)
            parentRef.current.querySelector(".clicked")?.classList?.remove("clicked");

        e.classList.add("clicked");
    }
    
    return (
        <svg onMouseEnter={e => mouseEnterHandle(e.target as SVGSVGElement)} onMouseLeave={e => mouseLeaveHandle(e.target as SVGSVGElement)} width="30" height="30" viewBox="0 0 43 42" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={e => {rateHandle(e.target as SVGSVGElement); clickHandle(e.target as SVGSVGElement)}}>
            <path d="M19.6533 3.15519C20.3365 1.5126 22.6634 1.5126 23.3466 3.15519L27.4043 12.9111C27.6923 13.6036 28.3435 14.0767 29.0911 14.1366L39.6234 14.981C41.3967 15.1232 42.1157 17.3362 40.7647 18.4935L32.7402 25.3674C32.1706 25.8553 31.9218 26.6208 32.0959 27.3503L34.5475 37.6281C34.9603 39.3585 33.0777 40.7262 31.5595 39.7989L22.5424 34.2913C21.9024 33.9004 21.0974 33.9004 20.4574 34.2913L11.4403 39.7989C9.92209 40.7262 8.03958 39.3585 8.45236 37.6281L10.904 27.3503C11.078 26.6208 10.8292 25.8553 10.2597 25.3674L2.23516 18.4935C0.884088 17.3362 1.60314 15.1232 3.37645 14.981L13.9088 14.1366C14.6563 14.0767 15.3076 13.6036 15.5956 12.9111L19.6533 3.15519Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

export default RatingPopup;