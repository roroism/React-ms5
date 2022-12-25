const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_PATH = process.env.REACT_APP_BASE_PATH;

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  name?: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface ITv {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  title?: string;
  overview: string;
}

export interface IGetTvResult {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}

export interface IGetMoviesDetail {
  id: number;
  title: string;
  adult: boolean;
  release_date: string;
  runtime: number;
  status: string;
  popularity: number;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  vote_average: number;
  vote_count: number;
  genres: Array<{ id: number; name: string }>;
  overview: string;
  poster_path: string;
}

export interface IGetTvDetail {
  id: number;
  name: string;
  first_air_date: string;
  last_air_date: string;
  tagline: string;
  status: string;
  popularity: number;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  vote_average: number;
  vote_count: number;
  genres: Array<{ id: number; name: string }>;
  overview: string;
  poster_path: string;
}

export enum MediaType {
  movie = "movie",
  tv = "tv",
  person = "person",
}

export interface ITvSearch {
  id: number;
  backdrop_path: string | null;
  poster_path: string | null;
  name: string;
  overview: string;
  media_type: MediaType;
}

export interface IMovieSearch {
  id: number;
  backdrop_path: string | null;
  poster_path: string | null;
  title: string;
  overview: string;
  media_type: MediaType;
}

export interface getMultiSearchResult {
  page: number;
  results: (ITvSearch | IMovieSearch)[];
  total_results: number;
  total_pages: number;
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
// https://api.themoviedb.org/3/movie/now_playing?api_key=3f553d72b2c837a9f26caae0b3856de3

export function getTvshows() {
  console.log(
    "tv api url : ",
    `${BASE_PATH}
  /tv/on_the_air?api_key=${API_KEY}`
  );
  return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
// https://api.themoviedb.org/3/tv/on_the_air?api_key=3f553d72b2c837a9f26caae0b3856de3

export function getMoviesDetail(movieId: string) {
  return fetch(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getTvDetail(tvId: string) {
  return fetch(`${BASE_PATH}/tv/${tvId}?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}

export function getMultiSearch(searchKeyword: string | null) {
  return fetch(
    `${BASE_PATH}/search/multi?query=${searchKeyword}&api_key=${API_KEY}`
  ).then((response) => response.json());
}
