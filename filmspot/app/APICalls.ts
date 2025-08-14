import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { MovieInfo, ProfileInfoProps, VideoInfo } from "~/types";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { toggleCustomPopup } from "./functions";
import type { NavigateFunction } from "react-router";

const urlBase = import.meta.env.VITE_TMDB_BASE_URL;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
export function getContent({type, content, page}: {type: "movie" | "tv", content: "trending" | "upcoming" | "popular", page: number}){
    // apiKey

    let fetchURL = urlBase;
    const filter = `&language=en-US&page=${page}&include_adult=false`;
    if(type === "movie"){
        switch(content){
            case "popular": case "upcoming": {
                fetchURL+=`/${type}/${content}?api_key=${apiKey}${filter}`;
                break;
            }
            case "trending": {
                fetchURL+=`/trending/movie/week?api_key=${apiKey}${filter}`;
                break;
            }
        }
    }else{
        switch(content){
            case "popular": {
                fetchURL+=`/tv/popular?api_key=${apiKey}${filter}`;
                break;
            }
            case "upcoming": {
                fetchURL+=`/tv/on_the_air?api_key=${apiKey}${filter}`;
                break;
            }
            case "trending": {
                fetchURL+=`/trending/tv/week?api_key=${apiKey}${filter}`;
                break;
            }
        }
    }
    
    return fetch(fetchURL)
    .then(res => {
        return res.json();
    })
    .then(data => {
        return data.results as MovieInfo[];
    })
}

type SingleProps = {
    id: string | number,
    type: "movie" | "tv"
}

export function getSingle({id, type}: SingleProps){
    return fetch(`${urlBase}/${type}/${id}?api_key=${apiKey}&language=en-US`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        return data as MovieInfo;
    })
}

export function getSingleCast({id, type}: SingleProps){
    return fetch(`${urlBase}/${type}/${id}/credits?api_key=${apiKey}&language=en-US`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        return data;
    })
}

export function getSingleTrailer({id, type}: SingleProps){
    return fetch(`${urlBase}/${type}/${id}/videos?api_key=${apiKey}&language=en-US`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        let trailer = data.results.find(
          (vid: VideoInfo) =>
            vid.site === 'YouTube' &&
            vid.type === 'Trailer' &&
            vid.official === true
        );

        return trailer ?? data.results[0] ?? false;
    })
}

export function getSimilarOrRecommended({id, type, isSimilar}: SingleProps & {isSimilar: boolean}){
    return fetch(`${urlBase}/${type}/${id}/${isSimilar ? "similar" : "recommendations"}?api_key=${apiKey}`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        return data.results;
    })
}

export function fetchActorDetails({id}: {id: string}) {
  return fetch(`${urlBase}/person/${id}?api_key=${apiKey}&language=en-US`)
    .then(response => response.json())
    .then(details => {
      return fetch(`${urlBase}/person/${id}/combined_credits?api_key=${apiKey}&language=en-US`)
        .then(response => response.json())
        .then(credits => {
          return { details, credits };
        });
    });
}

export function getProfileFromFirebase(): UseQueryResult<ProfileInfoProps | null, Error>{
    return useQuery<ProfileInfoProps | null>(
        {queryKey: [`firebaseProfile`], 
        queryFn: async () => {
            if(!auth.currentUser)
                return null;

            const result = await getDoc(doc(db, `FilmSpot/${auth.currentUser.uid}`));
            return result.exists() ? result.data() as ProfileInfoProps : null;
        },
        enabled: !!auth.currentUser
    })
}

export function createUser({email, password, username}: {email: string, password: string, username: string}){
    return new Promise(complete => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;

            setDoc(doc(db, `FilmSpot/${user.uid}`), {
                Name: username,
                Email: email,
                PhotoURL: null,
            })
            .then(() => {
                toggleCustomPopup({text: `Welcome ${username}, You can sign in now!`, time: 3000});
                return complete(true);
            })
            .catch(() => {
                toggleCustomPopup({text: `Plase check!`, time: 3000});
                return complete(false);
            })
        })
        .catch(error => {
            if(error.code === "auth/email-already-in-use")
                toggleCustomPopup({text: `Account with this email already exists!`, time: 3000});
            else
                toggleCustomPopup({text: `Please check credentials that You entered!`, time: 3000});

            return complete(error.code);
        });
    })
}

export function loginUser({type, navigate, email, password}: {type: "google" | "email", navigate: NavigateFunction, email?: string, password?: string}){
    return new Promise(complete => {
        if(type === "email")
            signInWithEmailAndPassword(auth, email!, password!)
            .then(() => {
                navigate("/");
                return complete(true);
            })
            .catch(() => {
                toggleCustomPopup({text: `Credentials that you entered don't match!`, time: 3000});
                return complete(false);
            })
        else
            signInWithPopup(auth, new GoogleAuthProvider())
            .then(userCredential => {
                const user = userCredential.user;

                setDoc(doc(db, `FilmSpot/${user.uid}`), {
                Name: user.email?.split('@')[0],
                Email: user.email,
                PhotoURL: user.photoURL,
                })
                .then(() => {
                    navigate("/");
                    return complete(true);
                })     
            })
            .catch(error => {
                if(error.code !== "auth/popup-closed-by-user")
                    toggleCustomPopup({text: `Error with Google sign in!`, time: 3000});
                return complete(false);
            })
    })
}

export function userSignOut(){
    signOut(auth);
}

export function trackAuthState(refetch: any){
    onAuthStateChanged(auth, () => {
        refetch();
    })
}