import type { RefObject } from "react";
import type { MovieInfo, ToggleFnProps } from "./types";

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

export function saveToWatchlist(itemId: MovieInfo["id"], rating?: number){
    if(!itemId)
        return;

    const type = !rating ? "wishlist" : "rating";
    let currentList = JSON.parse(localStorage.getItem(type) ?? "null");

    if(currentList?.[itemId]?.[type]){
        console.log("Obrisi")
        delete currentList[itemId][type];
        
        if(Object.keys(currentList[itemId]).length === 0)
            delete currentList[itemId];

        document.getElementsByName(`movie${itemId}`).forEach(element => {
            element.classList.remove("open");
            if(!element.querySelector("p"))
                return;

            element.querySelector("p")!.innerHTML = "Add to Watchlist";
        })
    }else if(currentList?.[itemId]){
        console.log("Postavi u listu");
        currentList[itemId][type] = !rating ? true : rating;

        document.getElementsByName(`movie${itemId}`).forEach(element => {
            element.classList.add("open");
            if(element.querySelector("p"))
                element.querySelector("p")!.innerHTML = "In Watchlist";
        })
    }else{
        currentList = {[itemId]: {[type]: !rating ? true : rating}};

        document.getElementsByName(`movie${itemId}`).forEach(element => {
            element.classList.add("open");
            if(element.querySelector("p"))
                element.querySelector("p")!.innerHTML = "In Watchlist";
        })
    }

    localStorage.wishlist = JSON.stringify(currentList);
}