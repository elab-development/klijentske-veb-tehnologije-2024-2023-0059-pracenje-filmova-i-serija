import type { ReactNode } from "react"

type MovieSectionProps = {
    id?: string,
    class?: string, 
    image: ReactNode,
    title: string,
    content: ReactNode
}

function MovieSection({props}: {props: MovieSectionProps}){
    return (
        <div id={props?.id ?? ''} className={`${props?.class ?? ''} movieSection`}>
            <span className="title">
                {props.image}

                <h2>{props.title}</h2>
            </span>

            <span className="movieHolder">
                {props.content}
            </span>
        </div>
    )
}

export default MovieSection;