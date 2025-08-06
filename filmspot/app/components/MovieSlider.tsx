import { useRef } from "react";
import { handleMovieSliderScroll, scrollBy } from "~/functions";

function MovieSlider({props}: {props: {content: any, scrollValue?: number}}){
    const scrollRef = useRef<HTMLSpanElement>(null);
    const disableButtons = useRef(false);

    const buttonHandle = (sign: '-' | '+') => {
        if(!disableButtons.current)
            scrollBy(Number(sign+(props.scrollValue ?? scrollRef.current?.offsetWidth)), scrollRef);
    }
    
    return <>
        <span className="relative">
            <span className="content fade-mask no-left snap-x snap-mandatory" ref={scrollRef} onScroll={() => {handleMovieSliderScroll(scrollRef); disableButtons.current = true;}} onScrollEnd={() => {disableButtons.current = false}} >
                {props.content}
            </span>

            <button className="button" onClick={() => buttonHandle('-')}>
                <svg className="ml-[-4px]" width="15" height="20" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.9834 23.1334L2.71676 12.8668L12.9834 2.6001" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            <button className="button right" onClick={() => buttonHandle('+')}>
                <svg className="mr-[-2px]" width="15" height="20" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.01672 23.1334L12.2834 12.8668L2.01672 2.6001" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </span>
    </>
}

export default MovieSlider;