import Man from "app/assets/Man.png";
import { useCallback, useRef } from "react";
import { Link } from "react-router";
import { getProfileFromFirebase, trackAuthState, userSignOut } from "~/APICalls";

function ProfileInfo(){
    const firstLoad = useRef(true);
    const { data: userInfo, refetch } = getProfileFromFirebase();

    const handleSignOut = useCallback(() => {
        userSignOut();
    }, []);

    if(firstLoad.current === true){
        trackAuthState(refetch);

        firstLoad.current = false;
    }

    return (
        <div>
            <h2 className="text-3xl font-bold mb-2">Profile</h2>
            <span className="profileInfo w-fit flex overflow-hidden rounded-[20px] bg-[#ffffff12] border-1 border-[var(--borderColorSecondary)]">
                {userInfo?.PhotoURL
                    ? <img className="w-[180px] h-[180px]" src={userInfo.PhotoURL} alt="Photo" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                    : <img className="w-[180px] h-[180px]" src={Man} alt="" />
                }

                <span className="flex flex-col gap-3 px-7 py-5">
                    <h2 className="text-2xl font-semibold">{userInfo?.Name ?? "Anonymous user"}</h2>
                    {userInfo
                        ? <p className="mt-[-10px]">{userInfo.Email}</p>
                        : <Link className="button w-fit flex items-center gap-2 py-1.5 px-7 bg-[var(--textAccentColor)] rounded-full !text-black font-medium" to="/login">Sign in</Link>
                    }
                    {userInfo &&
                        <span className="flex gap-2 items-center mt-[10px]">
                            <button className="button flex items-center gap-2 py-1.5 px-4 bg-[#DF354B] rounded-full font-medium" onClick={handleSignOut}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 20H6C4.89543 20 4 19.1046 4 18L4 6C4 4.89543 4.89543 4 6 4H14M10 12H21M21 12L18 15M21 12L18 9" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Log out
                            </button>
                        </span>
                    }
                </span>
            </span>
        </div>
    );
}

export default ProfileInfo;