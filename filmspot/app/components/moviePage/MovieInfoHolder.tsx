import type { MovieCardProps } from "~/types";
import ContentType from "../ContentType";
import MovieInfoPart from "./MovieInfoPart";

function MovieInfoHolder({props}: {props: MovieCardProps}){
    return (
        <div className="flex items-start gap-10">
            <span className="bannerHolder relative w-fit block">
                <img src={props.banner} alt="Banner" />

                <span className="rating absolute top-[-20px] right-[-20px]">
                    <circle className="progress absolute w-full h-full"></circle>
                    <p>{props.rating}</p>
                </span>
            </span>

            <span className="importantHolder">
                <h2 className="mb-2">{props.title}</h2>

                <span className="infoPartsHolder">
                    <ContentType type={props.type} additionalClasses="infoChild"/>
                    <MovieInfoPart items={["2021", "1h 58m", "PG-13"]} />
                    <MovieInfoPart items={["Action", "Comedy", "Crime"]} additionalClasses="genre" />
                </span>

                <span className="buttonHolder">
                    <button className="addToWatchlist">
                        <svg width="13" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1 3C1 1.89543 1.89543 1 3 1H8C9.10457 1 10 1.89543 10 3V10.8165C10 11.6724 8.99479 12.1328 8.34677 11.5737L5.5 9.11765L2.65323 11.5737C2.00521 12.1328 1 11.6724 1 10.8165V3Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Add to watchlist
                    </button>

                    <button className="rateMovie">
                        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.53834 1.48741C7.70914 1.07676 8.29086 1.07676 8.46166 1.48741L9.96858 5.11048C10.0406 5.2836 10.2034 5.40188 10.3903 5.41687L14.3017 5.73044C14.745 5.76598 14.9248 6.31924 14.587 6.60857L11.6069 9.16133C11.4645 9.28331 11.4024 9.4747 11.4459 9.65708L12.3563 13.474C12.4595 13.9066 11.9889 14.2485 11.6093 14.0167L8.26063 11.9713C8.10062 11.8736 7.89938 11.8736 7.73937 11.9713L4.39066 14.0167C4.01111 14.2485 3.54048 13.9066 3.64367 13.474L4.55414 9.65708C4.59764 9.4747 4.53546 9.28331 4.39306 9.16133L1.41298 6.60857C1.07521 6.31924 1.25497 5.76598 1.6983 5.73044L5.60971 5.41687C5.79661 5.40188 5.95941 5.2836 6.03142 5.11048L7.53834 1.48741Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Rate this movie
                    </button>
                </span>

                <p className="description">{props.description}</p>

                <span>
                    <button className="castButton">
                        Cast
                        <svg width="12" height="17" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.125 19.1201L10.125 10.1201L1.125 1.12012" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                    <span className="cast">
                        <span className="castItem">
                            <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT8beMp4Bxy_9m2J-sC3LGc_qrLVL9Xs51Dl1cze1dM8jms0Ae9TvZBfPj4VkBiXNrKZClqrgv8WSAYLXGCf9LJrreOxgOc9srg3qtTsbg_SA" alt="Profile" />

                            <span>
                                <h3>Rawson Thurber</h3>
                                <p>Producer</p>
                            </span>
                        </span>

                        <span className="castItem">
                            <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT8beMp4Bxy_9m2J-sC3LGc_qrLVL9Xs51Dl1cze1dM8jms0Ae9TvZBfPj4VkBiXNrKZClqrgv8WSAYLXGCf9LJrreOxgOc9srg3qtTsbg_SA" alt="Profile" />

                            <span>
                                <h3>Rawson Thurber</h3>
                                <p>Producer</p>
                            </span>
                        </span>

                        <span className="castItem">
                            <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT8beMp4Bxy_9m2J-sC3LGc_qrLVL9Xs51Dl1cze1dM8jms0Ae9TvZBfPj4VkBiXNrKZClqrgv8WSAYLXGCf9LJrreOxgOc9srg3qtTsbg_SA" alt="Profile" />

                            <span>
                                <h3>Rawson Thurber</h3>
                                <p>Producer</p>
                            </span>
                        </span>

                        <span className="castItem">
                            <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT8beMp4Bxy_9m2J-sC3LGc_qrLVL9Xs51Dl1cze1dM8jms0Ae9TvZBfPj4VkBiXNrKZClqrgv8WSAYLXGCf9LJrreOxgOc9srg3qtTsbg_SA" alt="Profile" />

                            <span>
                                <h3>Rawson Thurber</h3>
                                <p>Producer</p>
                            </span>
                        </span>

                        <span className="castItem">
                            <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT8beMp4Bxy_9m2J-sC3LGc_qrLVL9Xs51Dl1cze1dM8jms0Ae9TvZBfPj4VkBiXNrKZClqrgv8WSAYLXGCf9LJrreOxgOc9srg3qtTsbg_SA" alt="Profile" />

                            <span>
                                <h3>Rawson Thurber</h3>
                                <p>Producer</p>
                            </span>
                        </span>

                        <span className="castItem">
                            <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT8beMp4Bxy_9m2J-sC3LGc_qrLVL9Xs51Dl1cze1dM8jms0Ae9TvZBfPj4VkBiXNrKZClqrgv8WSAYLXGCf9LJrreOxgOc9srg3qtTsbg_SA" alt="Profile" />

                            <span>
                                <h3>Rawson Thurber</h3>
                                <p>Producer</p>
                            </span>
                        </span>
                    </span>
                </span>
            </span>
        </div>
    );
}

export default MovieInfoHolder;