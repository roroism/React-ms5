import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import { useEffect, useState } from "react";
import useWindowDimensions from "../Hooks/useWindowDimensions";
import { useMatch, useNavigate, useSearchParams } from "react-router-dom";
import DetailMovieInfo from "../Components/DetailMovieInfo";
import ProgramList, { EnumProgramList } from "../Components/ProgramList";
import TvData from "../Components/TVData";
import MovieData from "../Components/MovieData";

const Wrapper = styled.div`
  background: black;
  overflow-x: hidden;
  padding-bottom: 200px;
  min-height: 1650px;
`;

export const Loader = styled.div`
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

const MovieList = styled.div`
  position: relative;
  top: -100px;
`;

const TvList = styled.div`
  position: relative;
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

const H2 = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 24px;
  padding: 7px 16px;
  font-weight: 700;
`;

const Title = styled.h3`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 36px;
  width: 50%;
`;

const SliderButton = styled.button`
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 50px;
  height: 100px;
  color: #fff;
  font-size: 20px;
  /* transition: font-size 0.3s, background-color 0.3s; */
  transition: all 0.3s;
  border: none;
  cursor: pointer;
  /* &:hover {
    font-size: 25px;
    background-color: rgba(0, 0, 0, 0.7);
  } */
`;

const SliderLeftButton = styled(SliderButton)`
  left: 0;
`;

const SliderRightButton = styled(SliderButton)`
  right: 0;
`;

const Slider = styled.div`
  position: relative;
  /* top: -100px; */
  height: 200px;
  &:hover ${SliderButton} {
    background-color: rgba(0, 0, 0, 0.3);
    display: block;
    &:hover {
      font-size: 25px;
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
`;

const RowWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 200px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  color: ${(props) => props.theme.white.lighter};
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const anchorEl = styled.a`
  display: block;
  height: 100%;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)<{ scrolly: number }>`
  position: fixed;
  width: 40vw;
  height: 80vh;
  /* top: ${(props) => props.scrolly + 100}px; */
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  /* text-align: center; */
  font-size: 46px;
  position: absolute;
  width: 100%;
  top: 330px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BigOverview = styled.p`
  padding: 20px;
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  top: -70px;
`;

const rowVariants = {
  enter: ([clickedNextBtn, width]: [boolean, number]) => {
    return {
      x: clickedNextBtn ? width - 11 : -width - 11,
    };
  },
  visible: {
    x: 0,
  },
  exit: ([clickedNextBtn, width]: [boolean, number]) => {
    return {
      x: clickedNextBtn ? -width - 11 : width - 11,
    };
  },
};

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.4,
      duration: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.4,
      duration: 0.3,
      type: "tween",
    },
  },
};

const offset = 6;

// detail ?????? ???????????? api : GET /movie/{movie_id}
function Home() {
  const navigate = useNavigate();
  // const bigMoviematch = useMatch("/movies/:movieId");
  const [searchParam, setSearchParam] = useSearchParams();
  // console.log('searchParam.get("movies")', searchParam.get("movies"));
  const { scrollY } = useScroll();
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  // console.log("movies data : ", data);
  // console.log(data, isLoading);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [clickedNextBtn, setClickedNextBtn] = useState(false);
  const width = useWindowDimensions();
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setClickedNextBtn(true);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setClickedNextBtn(false);
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (id: number) => {
    // navigate(`/movies/${movieId}`);
    // navigate(`?movies=${Id}`);
    setSearchParam({ movies: id.toString() });
  };
  const onOverlayClick = () => navigate("/");
  // const clickedMovie =
  //   bigMoviematch?.params.movieId &&
  //   data?.results.find(
  //     (movie) => String(movie.id) === bigMoviematch.params.movieId
  //   );
  const clickedMovie =
    searchParam.get("movies") &&
    data?.results.find(
      (movie) => String(movie.id) === searchParam.get("movies")
    );

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
            bgphoto={
              data?.results[0].backdrop_path
                ? makeImagePath(data?.results[0].backdrop_path)
                : data?.results[0].poster_path
                ? makeImagePath(data?.results[0].poster_path)
                : ""
            }
          >
            <HiddenH2>MainVisual</HiddenH2>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <MovieList>
            <H2>on Movie</H2>
            <MovieData />
          </MovieList>
          <TvList>
            <H2>Tv Shows</H2>
            <TvData />
          </TvList>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
