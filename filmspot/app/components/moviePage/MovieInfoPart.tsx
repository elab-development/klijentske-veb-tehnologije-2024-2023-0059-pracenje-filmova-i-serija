function MovieInfoPart({items, additionalClasses}: {items: string[], additionalClasses?: string}){
    return (
        <span className={`infoPart ${additionalClasses}`}>
            <span className="type">{items?.[0]}</span>
            <span className="type">{items?.[1]}</span>
            <span className="type">{items?.[2]}</span>
        </span>
    );
}

export default MovieInfoPart;