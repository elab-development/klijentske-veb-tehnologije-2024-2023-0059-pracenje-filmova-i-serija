import type { CastInfo } from "~/types";
import Man from "app/assets/Man.png";
import Woman from "app/assets/Man.png";
import { Link } from "react-router";

function CastItem({props}: {props: CastInfo}){
    return <>
        <Link to={`/person/${props.id}`} className="castItem">
            <img src={props.profile_path ? `${import.meta.env.VITE_TMDB_PROFILE_BASE_URL}${props.profile_path}` : props.gender === 1 ? Woman : Man} alt="Profile" />

            <span>
                <h3>{props.name}</h3>
                <p>{props.character}</p>
            </span>
        </Link>
    </>;
}

export default CastItem;