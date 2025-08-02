import React from "react";
import { Link } from "react-router";
import ContentType from "~/components/ContentType";
import type { MovieCardClassProps } from "~/types";

class MovieCard<P extends MovieCardClassProps = MovieCardClassProps> extends React.Component<P>{
    constructor(props: P){
        super(props);
    }

    render(){
        return (
            <div className="movieCard relative">
                <img src={this.props.banner} alt="Background" />

                <button className="bookmark absolute button z-1">
                    <svg width="15" height="15" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1 3C1 1.89543 1.89543 1 3 1H12C13.1046 1 14 1.89543 14 3V17.6779C14 18.5555 12.9505 19.0074 12.3129 18.4045L7.5 13.8529L2.68711 18.4045C2.04954 19.0074 1 18.5555 1 17.6779V3Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>

                <Link to={`/movie/${this.props.id}`} className="absolute top-0 left-0 w-full h-full" />

                <span className="moreInfo absolute left-0 w-full h-full pointer-events-none">
                    <span className="flex justify-between relative">
                        <span className="w-full">
                            <h3>{this.props.title}</h3>

                            <span className="flex w-[175px] h-fit items-center gap-2">
                                <ContentType type={this.props.type} />

                                <span className="flex gap-1 items-center">
                                    <svg width="13" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.20501 1.10996C6.3758 0.699318 6.95753 0.699318 7.12833 1.10996L8.40349 4.17582C8.47549 4.34893 8.63829 4.46722 8.82519 4.4822L12.135 4.74755C12.5784 4.78309 12.7581 5.33635 12.4204 5.62568L9.8986 7.78583C9.75621 7.90781 9.69402 8.09919 9.73753 8.28157L10.508 11.5114C10.6112 11.944 10.1405 12.286 9.76098 12.0541L6.92729 10.3233C6.76729 10.2256 6.56605 10.2256 6.40604 10.3233L3.57235 12.0541C3.1928 12.286 2.72218 11.944 2.82537 11.5114L3.59581 8.28157C3.63931 8.09919 3.57712 7.90781 3.43473 7.78583L0.912978 5.62568C0.57521 5.33635 0.754972 4.78309 1.1983 4.74755L4.50814 4.4822C4.69504 4.46722 4.85784 4.34893 4.92985 4.17582L6.20501 1.10996Z" stroke="#43DFD7" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <p>{this.props.rating}/10</p>
                                </span>
                            </span>
                        </span>
                    </span>
                </span>

                <span className="bottomShadow"></span>
                <span className="topShadow"></span>
            </div>
        );
    }
}

export default MovieCard;