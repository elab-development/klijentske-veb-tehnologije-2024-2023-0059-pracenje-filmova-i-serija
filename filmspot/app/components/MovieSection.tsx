import { useRef } from "react";
import type { ReactNode } from "react";
import MovieCardLoadingTemplate from "./homePage/MovieCardLoadingTemplate";

type MovieSectionProps = {
    id?: string,
    class?: string,
    image: ReactNode,
    title: string,
    content: ReactNode
}

function MovieSection({ props }: { props: MovieSectionProps }) {
    const scrollRef = useRef<HTMLSpanElement>(null);
    const disableButtons = useRef(false);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current && props.content && !disableButtons.current) {
            const scrollValue = scrollRef.current.offsetWidth;
            scrollRef.current.scrollBy({ left: direction === "left" ? -scrollValue : scrollValue, behavior: 'smooth' });
        }
    };

    return (
        <div id={props?.id ?? ''} className={`${props?.class ?? ''} movieSection relative z-50`}>
            <span className="title">
                {props.image}
                <h2>{props.title}</h2>
            </span>

            {props?.id === "top5" && (
                <>
                    <button
                        className="button absolute top-[50%] left-0 bg-white p-3 z-2 aspect-square w-[50px] flex items-center justify-center rounded-full"
                        onClick={() => scroll("left")}
                    >
                        <svg className="ml-[-4px]" width="15" height="20" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.9834 23.1334L2.71676 12.8668L12.9834 2.6001" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button
                        className="button absolute top-[50%] right-0 bg-white p-3 z-2 aspect-square w-[50px] flex items-center justify-center rounded-full"
                        onClick={() => scroll("right")}
                    >
                        <svg className="mr-[-2px]" width="15" height="20" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.01672 23.1334L12.2834 12.8668L2.01672 2.6001" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </>
            )}

            <span ref={scrollRef} className="movieHolder snap-x snap-mandatory" onScroll={() => disableButtons.current = true} onScrollEnd={() => disableButtons.current = false} >
                {props.content
                    ? props.content
                    : <MovieCardLoadingTemplate />
                }
            </span>
        </div>
    );
}

export default MovieSection;