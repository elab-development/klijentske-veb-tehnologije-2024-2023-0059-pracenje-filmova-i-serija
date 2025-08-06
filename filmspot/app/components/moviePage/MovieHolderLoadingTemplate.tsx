function MovieHolderLoadingTemplate(){
    return <>
        <div className="flex items-start gap-10">
            <span className="bannerHolder relative w-fit block z-1">
                <span className="block w-[300px] aspect-[3/4.3] bg-white/20 rounded-[20px]"></span>
            </span>

            <span className="importantHolder z-1">
                <span className="block w-[200px] h-[40px] bg-white/20 rounded-[12px]"></span>

                <span className="infoPartsHolder flex items-center gap-3 mt-3">
                    <span className="block w-[80px] h-[30px] bg-white/20 rounded-full"></span>
                    <span className="block w-[80px] h-[30px] bg-white/20 rounded-full"></span>
                    <span className="block w-[80px] h-[30px] bg-white/20 rounded-full"></span>
                    <span className="block w-[80px] h-[30px] bg-white/20 rounded-full"></span>
                    <span className="block w-[80px] h-[30px] bg-white/20 rounded-full"></span>
                </span>

                <span className="buttonHolder">
                    <span className="w-[140px] h-[32px] rounded-full bg-white/20"></span>
                    <span className="w-[140px] h-[32px] rounded-full bg-white/20"></span>
                </span>

                <span className="block w-full h-[80px] bg-white/20 mt-2 rounded-[20px]"></span>

                <span className="block w-full h-[120px] bg-white/20 mt-5 rounded-[20px]"></span>
            </span>
        </div>

        <span className="trailer mt-15 w-full h-[300px] z-1 bg-white/20 rounded-[20px]"></span>
    </>;
}

export default MovieHolderLoadingTemplate;