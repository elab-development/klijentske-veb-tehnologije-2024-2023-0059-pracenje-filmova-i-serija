import { useQuery } from "@tanstack/react-query";
import { fetchActorDetails } from "~/APICalls";
import type { PersonInfo } from "~/types";
import Man from "app/assets/Man.png";
import Woman from "app/assets/Man.png";
import MovieSlider from "../MovieSlider";
import NoBanner from "app/assets/NoBanner.png";
import ContentType from "../ContentType";

function PersonHolder({props}: {props: {id: string}}){
    const { status: castStatus, error: castError, data: personInfo } = useQuery<PersonInfo>({queryKey: [`person${props.id}`], queryFn: () => fetchActorDetails({id: props.id})})
    
    console.log(personInfo);
    const starringList = personInfo?.credits?.cast?.map(item => {
        return (
            <a key={item.id} href={`/content/${item.media_type}.${item.id}`} className="contentItem snap-center">
                <span className="topShadow"></span>
                
                <img src={item.poster_path?.length > 0 ? `${import.meta.env.VITE_TMDB_POSTER_BASE_URL}/${item.poster_path}` : NoBanner} alt="Banner" />

                <span>
                    <h3>{item.title}</h3>
                    <ContentType type={item.media_type as "movie" | "tv"} />
                </span>

                <button className="bookmark absolute button z-1">
                    <svg width="15" height="15" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M1 3C1 1.89543 1.89543 1 3 1H12C13.1046 1 14 1.89543 14 3V17.6779C14 18.5555 12.9505 19.0074 12.3129 18.4045L7.5 13.8529L2.68711 18.4045C2.04954 19.0074 1 18.5555 1 17.6779V3Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                <span className="bottomShadow"></span>
            </a>
        );
    })

    return <>
        <main className="!pt-0 w-full max-w-[1400px] mx-auto flex gap-10 items-start">
            <span className="personInfo w-fit shrink-0">
                <img src={personInfo?.details.profile_path ? `${import.meta.env.VITE_TMDB_PROFILE_BASE_URL}${personInfo?.details.profile_path}` : personInfo?.details.gender === 1 ? Man : Woman} alt="Profile" />
                <span className="flex flex-col gap-2 p-4">
                    <h2 className="text-xl font-medium">Personal Information</h2>
                    
                    <PersonalInfoItem props={{title: "Known For", text: personInfo?.details.known_for_department}} />
                    <PersonalInfoItem props={{title: "Known Credits", text: personInfo?.credits.cast.length.toString()}} />
                    <PersonalInfoItem props={{title: "Gender", text: personInfo?.details.gender === 1 ? "Female" : personInfo?.details.gender === 2 ? "Male" : "Non binary"}} />
                    <PersonalInfoItem props={{title: "Birthday", text: personInfo?.details.birthday}} />
                    <PersonalInfoItem props={{title: "Place of Birth", text: personInfo?.details.place_of_birth}} />
                </span>
            </span>

            <div className="personDetails mt-10 overflow-x-hidden">
                <h1 className="text-3xl font-medium mb-5">{personInfo?.details.name}</h1>

                <span>
                    <h2 className="font-medium">Biography</h2>
                    <p className="break-all text-[.95rem] text-[var(--textSecondaryColor)] mt-1 max-h-[250px] overflow-y-auto overflow-x-hidden">{(personInfo?.details && personInfo?.details?.biography?.length > 0) ? personInfo?.details.biography : "No biography available"}</p>
                </span>

                <div className="similarMovies mt-[50px] z-1">
                    <h2 className="text-xl font-medium">Starring in</h2>

                    <span className="block px-[20px]">
                        {starringList && 
                            <div className="similarMovies mt-[10px] z-1">
                                <MovieSlider props={{content: starringList}} />
                            </div>
                        }
                    </span>
                </div>
            </div>
        </main>
    </>
}

function PersonalInfoItem({props}: {props: {title: string, text?: string}}){
    return <>
        <span className="personalInfoItem">
            <h2 className="text-[.85rem] font-bold">{props.title}</h2>
            <p className="text-[.75rem] text-[var(--textSecondaryColor)]">{(props.text && props.text.length > 0) ? props.text : "No data available"}</p>
        </span>
    </>
}

export default PersonHolder;