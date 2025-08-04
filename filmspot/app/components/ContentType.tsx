function ContentType({type, additionalClasses}: {type: "movie" | "tv", additionalClasses?: string}){
    return (
        <span className={`type${type === "movie" ? '' : " series"} ${additionalClasses ?? ''}`}>
            {type === "movie" ? "MOVIE" : "TV SHOW"}
        </span>
    );
}

export default ContentType;