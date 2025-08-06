function MovieCardLoadingTemplate(){
    return <>
        <Template />
        <Template />
        <Template />
        <Template />
        <Template />
    </>;
}

function Template(){
    return (
        <div className="movieCard loading">
            <span className="moreInfo absolute left-0 mt-[-5px] w-full h-full pointer-events-none">
                <span className="flex justify-between relative">
                    <span className="w-full">
                        <span className="block w-full h-[1.7rem] bg-white/20 rounded-[5px]"></span>

                        <span className="flex w-[175px] h-fit items-center gap-2 mt-[5px]">
                            <span className="block w-[35%] h-[1.7rem] bg-white/20 rounded-[5px]"></span>

                            <span className="flex gap-1 items-center w-[35%] h-[1.7rem] bg-white/20 rounded-[5px]">
                            </span>
                        </span>
                    </span>
                </span>
            </span>

            <span className="bottomShadow"></span>

            <div className="background"></div>
        </div>
    );
}

export default MovieCardLoadingTemplate;