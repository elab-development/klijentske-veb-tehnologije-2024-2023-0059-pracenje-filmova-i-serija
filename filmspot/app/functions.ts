import type { RefObject } from "react";
import type { MovieInfo, ToggleFnProps, watchlistItem } from "./types";

let timeouts: { [id: string]: ReturnType<typeof setTimeout> } = {};

export function toggleElementWD(props: ToggleFnProps){
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

export function saveToWatchlist(itemId: MovieInfo["id"], rating?: number, itemData?: watchlistItem){
    if(!itemId)
        return;

    const type = !rating ? "wishlist" : "rating";
    let currentList = JSON.parse(localStorage.userActions ?? "null");

    if(currentList?.[itemId]?.[type]){
        if(type === "wishlist"){
            delete currentList[itemId][type];
        
            const keys = Object.keys(currentList[itemId]);
            if(keys.length === 1 && keys[0] === "details")
                delete currentList[itemId];

            toggleBookmarks(`movie${itemId}`, false);
        }else{
            currentList[itemId][type] = rating;
            toggleRating(`rating${itemId}`, rating);
        }
    }else if(currentList?.[itemId]){
        currentList[itemId][type] = !rating ? true : rating;

        if(type === "wishlist")
            toggleBookmarks(`movie${itemId}`, true);
        else
            toggleRating(`rating${itemId}`, rating);
    }else{
        currentList = {[itemId]: {details: itemData, [type]: !rating ? true : rating}};

        if(type === "wishlist")
            toggleBookmarks(`movie${itemId}`, true);
        else
            toggleRating(`rating${itemId}`, rating);
    }

    localStorage.userActions = JSON.stringify(currentList);
    // localStorage.clear();
}

function toggleBookmarks(name: string, option: boolean){
    if(option)
        document.getElementsByName(name).forEach(element => {
            element.classList.add("open");
            if(element.querySelector("p"))
                element.querySelector("p")!.innerHTML = "In Watchlist";
        })
    else
        document.getElementsByName(name).forEach(element => {
            element.classList.remove("open");
            if(element.querySelector("p"))
                element.querySelector("p")!.innerHTML = "Add to Watchlist";
        })
}

function toggleRating(name: string, rating?: number){
    if(rating)
        document.getElementsByName(name).forEach(element => {
            element.classList.add("open");
            if(element.querySelector("p"))
                element.querySelector("p")!.innerHTML = `${rating}/10`;
        })
    else{
        document.getElementsByName(name).forEach(element => {
            element.classList.remove("open");
            if(element.querySelector("p"))
                element.querySelector("p")!.innerHTML = "Rate this movie";
        })
    }
}