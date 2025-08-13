import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "~/firebase";
import type { ProfileInfoProps } from "~/types";
import { useQuery } from "@tanstack/react-query";
import Man from "app/assets/Man.png";
import { Link } from "react-router";

function ProfileInfo(){
    const { data: userInfo } = useQuery<ProfileInfoProps | null>(
        {queryKey: [`firebaseProfile`], 
        queryFn: async () => {
            if(!auth.currentUser)
                return null;

            const result = await getDoc(doc(db, `FilmSpot/${auth.currentUser}`));
            // const result = await getDoc(doc(db, `FilmSpot/nRwWPESnQmwfYJMjsAe0`));
            return result.exists() ? result.data() as ProfileInfoProps : null;
        }}
    )

    return (
        <div>
            <h2 className="text-3xl font-bold mb-2 mt-10">Profile</h2>
            <span className="w-fit flex overflow-hidden rounded-[20px] bg-[var(--backgroundTransparentSecondary)]">
                {userInfo?.Name
                    ? <img className="w-[180px] h-[180px]" src={userInfo.PhotoURL} alt="Photo" />
                    : <img className="w-[180px] h-[180px]" src={Man} alt="" />
                }

                <span className="flex flex-col gap-3 px-7 py-5">
                    <h2 className="text-2xl font-semibold">{userInfo?.Name ?? "Anoniman korisnik"}</h2>
                    {userInfo
                        ? <p className="mt-[-10px]">{userInfo.Email}</p>
                        : <Link className="button w-fit flex items-center gap-2 py-1.5 px-7 bg-[var(--textAccentColor)] rounded-full !text-black font-medium" to="/login">Sign in</Link>
                    }
                    {userInfo &&
                        <span className="flex gap-2 items-center mt-[10px]">
                            <button className="button flex items-center gap-2 py-1.5 px-4 bg-[var(--textAccentColor)] rounded-full !text-black font-medium">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.1667 5.27273L17.0455 8M1.5 20V17.2727L16.2596 3.28998C17.0232 2.56654 18.2192 2.56654 18.9829 3.28998V3.28998C19.8072 4.0709 19.8072 5.38365 18.9829 6.16457L4.37879 20H1.5Z" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Edit Profile
                            </button>

                            <button className="button flex items-center gap-2 py-1.5 px-4 bg-[#DF354B] rounded-full font-medium">
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