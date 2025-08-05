function MovieInfoPart({items, additionalClasses}: {items: string[], additionalClasses?: string}){
    console.log("Rerender", items);

    const itemsList = items.map((item, index) => {
        return <span key={index} className="type">{item}</span>
    })
    
    return (
        <span className={`infoPart ${additionalClasses ?? ''}`}>
            {itemsList}
        </span>
    );
}

export default MovieInfoPart;