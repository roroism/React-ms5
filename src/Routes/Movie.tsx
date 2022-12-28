import { motion } from "framer-motion";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, getTvshows, IGetMoviesResult, IGetTvResult } from "../api";
import MovieData from "../Components/MovieData";
import { makeImagePath } from "../utils";
import { useEffect } from "react";

const Wrapper = styled.div`
  background: black;
  overflow-x: hidden;
  padding-bottom: 200px;
  min-height: 1650px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 36px;
  width: 50%;
`;

// const Slider = styled.div`
//   position: relative;
//   top: -100px;
// `;

// const Row = styled(motion.div)`
//   display: grid;
//   gap: 5px;
//   grid-template-columns: repeat(6, 1fr);
//   position: absolute;
//   width: 100%;
// `;

const MovieList = styled.div`
  position: relative;
  top: -100px;
`;

const H2 = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 24px;
  padding: 7px 16px;
  font-weight: 700;
`;

function Movie() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  // console.log("movie data : ", data);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <>
          <Banner
            // onClick={increaseIndex}
            bgphoto={
              data?.results[0].poster_path
                ? makeImagePath(data?.results[0].poster_path)
                : data?.results[0].backdrop_path
                ? makeImagePath(data?.results[0].backdrop_path)
                : ""
            }
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <MovieList>
            <H2>on Movie</H2>
            <MovieData />
          </MovieList>
        </>
      )}
    </Wrapper>
  );
}

export default Movie;
