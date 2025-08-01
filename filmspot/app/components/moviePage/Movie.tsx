import { useParams } from "react-router";

function MoviePage(){
    const {id} = useParams();

    return <>
        <h1>Film: {`${id}`}</h1>
    </>
}

export default MoviePage;