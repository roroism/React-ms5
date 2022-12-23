import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getMultiSearch } from "../api";

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery(
    ["search", "multi"],
    () => getMultiSearch(keyword),
    { enabled: !!keyword }
  );
  console.log("search data : ", data);
  console.log(keyword);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div>{keyword}</div>;
}

export default Search;

// TheMovieDB Search Movies
// API: https://api.themoviedb.org/3/search/movie?api_key=api_key&language=en-US&query=hello&page=1&include_adult=false
// https://developers.themoviedb.org/3/search/search-movies

// TheMovieDB Search TV Shows
// https://developers.themoviedb.org/3/search/search-tv-shows
