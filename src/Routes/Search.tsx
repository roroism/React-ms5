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

const Wrapper = styled.div`
  background: black;
  overflow-x: hidden;
  /* padding-bottom: 200px; */
  padding: 200px 0 200px;
`;

const HiddenEl = styled.h2`
  display: block;
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: polygon(0 0, 0 0, 0 0);
`;

const HiddenH2 = HiddenEl.withComponent("h2");

const SpanSearchResults = styled.span`
  margin-left: 10px;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
      <HiddenH2>Searched Contents</HiddenH2>
      <SpanSearchResults>Search Results for "{keyword}"</SpanSearchResults>
      <SearchedList keyword={keyword} />
    </Wrapper>
  );
}

export default Search;

// TheMovieDB Search Movies
// API: https://api.themoviedb.org/3/search/movie?api_key=api_key&language=en-US&query=hello&page=1&include_adult=false
// https://developers.themoviedb.org/3/search/search-movies

// TheMovieDB Search TV Shows
// https://developers.themoviedb.org/3/search/search-tv-shows
