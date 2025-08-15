# FilmSpot

Dobrodošli u **FilmSpot** – aplikaciju za praćenje, ocenjivanje i preporučivanje filmova i serija!

---

## Povlačenje i pokretanje projekta

Projekat je preporučljivo povući na računar pomoću modernog okruženja kao što je **GitHub Desktop**. Odaberite opciju za kloniranje repozitorijuma pomoću URL-a:

**URL do projekta:** [FilmSpot GitHub](https://github.com/elab-development/klijentske-veb-tehnologije-2024-2023-0059-pracenje-filmova-i-serija)

---

## Pokretanje projekta

1. Nakon preuzimanja, udjite u filmspot folder:
    ```bash
    cd filmspot
    ```
2. Instalirajte Node.js, koji ce sam skinuti potrebne dodatke:
    ```bash
    npm i
    ```
3. Kreirajte .env fajl u filmspot folderu:
    ```bash
    VITE_TMDB_API_KEY='TMBD_API_KEY'
    VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
    VITE_TMDB_POSTER_BASE_URL=https://image.tmdb.org/t/p/w500
    VITE_TMDB_PROFILE_BASE_URL=https://image.tmdb.org/t/p/w500
    VITE_FIREBASE_API_KEY='FIREBASE_API_KEY'
    ```
4. Pokrenite aplikaciju na lokalnoj mašini:
    ```bash
    npm run dev
    ```
> Projekat koristi **React Router v7** za upravljanje rutama.

---

## Opis funkcionalnosti

FilmSpot omogućava sledeće funkcionalnosti:

- **Dodavanje filmova u Watchlist** – sačuvajte filmove koje želite da pogledate.
- **Ocenjivanje filmova** – ocenite filmove i serije koje ste gledali.
- **Preporučivanje filmova** – dobijte preporuke na osnovu vaših ocena i interesovanja.
- **Pretraga i filtriranje filmova** – lako pronađite filmove po žanru, godini, oceni i drugim kriterijumima.

---

Uživajte u korišćenju FilmSpot aplikacije!
