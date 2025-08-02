import type { Top5MovieCardProps } from "~/types";
import MovieCard from "./MovieCardClass";

class Top5MovieCard extends MovieCard<Top5MovieCardProps>{
    constructor(props: Top5MovieCardProps){
        super(props);
    }

    render(){
        return <>
            {super.render()}

            <h2>{this.props.index + 1}</h2>
        </>;
    }
}

export default Top5MovieCard;