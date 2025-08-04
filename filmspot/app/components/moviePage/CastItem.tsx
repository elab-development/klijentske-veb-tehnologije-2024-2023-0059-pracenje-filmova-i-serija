import type { CastInfo } from "~/types";

function CastItem({props}: {props: CastInfo}){
    return <>
        <span className="castItem">
            <img src={`${import.meta.env.VITE_TMDB_PROFILE_BASE_URL}${props.profile_path}`} alt="Profile" />

            <span>
                <h3>{props.name}</h3>
                <p>{props.character}</p>
            </span>
        </span>
    </>;
}

export default CastItem;