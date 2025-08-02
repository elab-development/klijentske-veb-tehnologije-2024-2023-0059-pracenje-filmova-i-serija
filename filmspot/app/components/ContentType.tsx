function ContentType({type, additionalClasses}: {type: number, additionalClasses?: string}){
    return (
        <span className={`type${type === 0 ? '' : " series"} ${additionalClasses}`}>
            {type === 0 ? "MOVIE" : "TV SHOW"}
        </span>
    );
}

export default ContentType;