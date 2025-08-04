function MovieInfoPart({items, additionalClasses}: {items: string[], additionalClasses?: string}){
    console.log("Rerender", items);
    
    const itemsList = items.map(item => {
        return <span className="type">{item}</span>
    })
    
    return (
        <span className={`infoPart ${additionalClasses ?? ''}`}>
            {itemsList}
        </span>
    );
}

export default MovieInfoPart;