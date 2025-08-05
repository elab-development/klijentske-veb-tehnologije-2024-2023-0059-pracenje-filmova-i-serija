function ButtonWithArrow({title, additionalClasses}: {title: string, additionalClasses?: string}){
    return (
        <button className={`castButton ${additionalClasses ?? ''}`}>
            {title}
            <svg width="12" height="17" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.125 19.1201L10.125 10.1201L1.125 1.12012" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </button>
    );
}

export default ButtonWithArrow;