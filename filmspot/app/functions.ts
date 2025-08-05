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