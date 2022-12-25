import { Suspense, useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import {
  MediaType,
  getMultiSearch,
  getMultiSearchResult,
  IMovieSearch,
} from "../api";
import { makeImagePath } from "../utils";
import styled from "styled-components";
import { motion } from "framer-motion";
import SearchedList from "../Components/SearchedList";

function Search() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <SearchedList />;
}

export default Search;

// TheMovieDB Search Movies
// API: https://api.themoviedb.org/3/search/movie?api_key=api_key&language=en-US&query=hello&page=1&include_adult=false
// https://developers.themoviedb.org/3/search/search-movies

// TheMovieDB Search TV Shows
// https://developers.themoviedb.org/3/search/search-tv-shows
