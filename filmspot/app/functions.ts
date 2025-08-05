import type { RefObject } from "react";
import type { ToggleFnProps } from "./types";

let timeouts: { [id: string]: ReturnType<typeof setTimeout> } = {};

export function toggleElementWD(props: ToggleFnProps){
    console.log(props.element);

    if(props.element.classList.contains("open")){
        props.element.classList.remove("open");

        timeouts[`${props.element.id}open`] = setTimeout(() => {
            props.element.classList.add("hidden");
        }, props.time);
    }else{
        if(timeouts[`${props.element.id}close`])
            clearTimeout(timeouts[`${props.element.id}close`]);

        props.element.classList.remove("hidden");
        timeouts[`${props.element.id}open`] = setTimeout(() => {
            props.element.classList.add("open");
        }, 10);
    }
}

export function scrollBy(offset: number, scrollRef: RefObject<HTMLSpanElement | null>){
    if (scrollRef.current)
        scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
}

export function handleMovieSliderScroll(scrollRef: RefObject<HTMLSpanElement | null>){
    if(scrollRef.current === null) return;

    const atStart = scrollRef.current.scrollLeft <= 5;
    const atEnd = scrollRef.current.scrollLeft + scrollRef.current.clientWidth >= scrollRef.current.scrollWidth - 5;
    scrollRef.current.classList.toggle("no-left", atStart);
    scrollRef.current.classList.toggle("no-right", atEnd);
}