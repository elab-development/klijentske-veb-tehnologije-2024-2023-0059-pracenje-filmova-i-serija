export const tmdbAllGenres: { [id: number]: string } = {
  // Movie Genres
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",

  // TV-Only Genres (not present in movies)
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics"
};

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "laptop-centar.firebaseapp.com",
  projectId: "laptop-centar",
  storageBucket: "laptop-centar.firebasestorage.app",
  messagingSenderId: "1040074510089",
  appId: "1:1040074510089:web:26157161cd8e2ca0844dd8",
  measurementId: "G-XW1GRLK7S7"
}
