import { useRef } from "react"

export default function Header(){
    const searchRef = useRef<HTMLInputElement>(null);

    function da(value: string){
        console.log("Value: ", value);
    }

    function search(){
        if(!searchRef.current || searchRef.current.value.trim() == "") return;
        window.location.href = `/search/${searchRef.current?.value.trim()}`;
    }

    return (
        <header className="fixed top-0 left-0 w-full h-fit z-102">
            <div className="liquidGlass-wrapper w-full bg-[var(--backgroundTransparentPrimary)]">
                <div className="liquidGlass-effect"></div>
                <div className="liquidGlass-tint"></div>
                <div className="liquidGlass-shine"></div>
                <div className="liquidGlass-text py-2 px-5 h-full border-b-1 border-[var(--borderColorPrimary)] w-full z-1000 relative flex items-center justify-between">
                    <a href="/" className="title flex items-center gap-2">
                        <svg width="50" height="50" viewBox="0 0 55 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.50931 12.4432C6.50931 8.74028 9.51458 5.735 13.2175 5.735H42.2976C46.0005 5.735 49.0058 8.74028 49.0058 12.4432V41.5233C49.0058 45.2262 46.0005 48.2315 42.2976 48.2315H13.2175C9.51458 48.2315 6.50931 45.2262 6.50931 41.5233V12.4432Z" fill="white"/>
                            <path d="M12.1308 16.5956C12.0235 14.3752 13.7408 12.4902 15.9612 12.3828L38.1586 11.3565C40.379 11.2491 42.264 12.9664 42.3647 15.1869L43.3977 37.3843C43.4983 39.6047 41.781 41.4897 39.5606 41.5903L17.3699 42.6234C15.1495 42.724 13.2645 41.0067 13.1571 38.7863L12.1308 16.5956Z" fill="#43DFD7"/>
                            <path d="M16.9406 19.46C22.4413 18.4448 29.4737 17.6868 38.0379 17.1859C38.4135 21.4613 38.4717 24.6454 38.2123 26.7384C34.961 26.8099 31.7746 27.0022 28.6531 27.3153L28.8476 29.4955C31.1731 29.2495 33 29.093 34.3282 29.0259C34.4579 30.4346 34.4512 32.854 34.3081 36.2842C32.6176 36.4273 30.9495 36.5838 29.3038 36.7537C29.344 38.9361 29.4447 41.369 29.6057 44.0523C26.7211 44.5352 23.9685 44.7767 21.3479 44.7767C21.2361 44.258 20.97 38.6611 20.5496 27.9861L17.437 28.3752C17.2089 25.598 17.0434 22.6263 16.9406 19.46Z" fill="white"/>
                        </svg>

                        <h1 className="font-medium"><span className="text-[var(--textAccentColor)] font-bold">Film</span>Spot</h1>
                    </a>

                    <span className="content flex h-fit items-center gap-7">
                        <div>
                            <input ref={searchRef} type="text" placeholder="Search movies and tv shows" id="searchInput" onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                    search();
                                }
                            }} />
                            <button onClick={search}>
                                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.5558 15.5558L20 20M10.7692 17.5385C14.5078 17.5385 17.5385 14.5078 17.5385 10.7692C17.5385 7.03069 14.5078 4 10.7692 4C7.03069 4 4 7.03069 4 10.7692C4 14.5078 7.03069 17.5385 10.7692 17.5385Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <a href="/about" className="button">About</a>
                        <a href="/watchlist" className="button">Watchlist</a>
                    </span>

                    <svg className="hidden">
                        <filter
                            id="glass-distortion"
                            x="0%"
                            y="0%"
                            width="100%"
                            height="100%"
                            filterUnits="objectBoundingBox"
                        >
                            <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.01 0.01"
                            numOctaves="1"
                            seed="5"
                            result="turbulence"
                            />
                            <feComponentTransfer in="turbulence" result="mapped">
                            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
                            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
                            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
                            </feComponentTransfer>
                            <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
                            <feSpecularLighting
                            in="softMap"
                            surfaceScale="5"
                            specularConstant="1"
                            specularExponent="100"
                            lightingColor="white"
                            result="specLight"
                            >
                            <fePointLight x="-200" y="-200" z="300" />
                            </feSpecularLighting>
                            <feComposite
                            in="specLight"
                            operator="arithmetic"
                            k1="0"
                            k2="1"
                            k3="1"
                            k4="0"
                            result="litImage"
                            />
                            <feDisplacementMap
                            in="SourceGraphic"
                            in2="softMap"
                            scale="150"
                            xChannelSelector="R"
                            yChannelSelector="G"
                            />
                        </filter>
                    </svg>
                </div>
            </div>
        </header>
    )
}