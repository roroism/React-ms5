const API_KEY = "3f553d72b2c837a9f26caae0b3856de3";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
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

interface ITv {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
}

export interface IGetTvResult {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
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
