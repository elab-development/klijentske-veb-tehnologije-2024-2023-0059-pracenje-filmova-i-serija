type Props = {
    title: string,
    type: 0 | 1,
    banner: string
}

function MovieCard({props}: {props: Props}){
    return (
        <div className="movieCard">
            <img src={props.banner} alt="Background" />
            <h3>{props.title}</h3>
            <span className="type" style={{backgroundColor: `${props.type === 0 ? "#5B3B02" : "#03405A"}`}}>
                {props.type === 0 ? "MOVIE" : "TV SHOW"}
            </span>
            <span className="bottomShadow"></span>
        </div>
    );
}

export default MovieCard;