import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { getMovies, getTvshows, IGetMoviesResult, IGetTvResult } from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import useWindowDimensions from "../Hooks/useWindowDimensions";
import { useMatch, useNavigate } from "react-router-dom";
import DetailInfo from "../Components/DetailMovieInfo";
import { takeCoverage } from "v8";

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

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
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

export enum EnumProgramList {
  movies,
  tv,
}

interface IProgramList {
  list: EnumProgramList;
}

function ProgramList({ list }: IProgramList) {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery<IGetTvResult>(
    ["tv", "onTheAir"],
    getTvshows
  );
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
    navigate(`/${list}/${id}`);
  };

  return (
    <Slider>
      <AnimatePresence
        initial={false}
        onExitComplete={toggleLeaving}
        custom={[clickedNextBtn, width]}
      >
        <Row
          variants={rowVariants}
          initial="enter"
          exit="exit"
          animate="visible"
          custom={[clickedNextBtn, width]}
          // initial={
          //   clickedNextBtn
          //     ? { x: width - 11, opacity: 0 }
          //     : { x: -width - 11, opacity: 0 }
          // }
          // animate={{ x: 0, opacity: 1 }}
          // exit={
          //   clickedNextBtn
          //     ? { x: -width + 11, opacity: 0 }
          //     : { x: width + 11, opacity: 0 }
          // }
          transition={{ type: "tween", duration: 1 }}
          key={index}
        >
          {data?.results
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((tv) => (
              <Box
                layoutId={tv.id + ""}
                key={tv.id}
                variants={BoxVariants}
                whileHover="hover"
                initial="normal"
                transition={{ type: "tween" }}
                onClick={() => onBoxClicked(tv.id)}
                bgPhoto={makeImagePath(tv.backdrop_path, "w500")}
              >
                <Info variants={infoVariants}>
                  <h4>{tv.name}</h4>
                </Info>
              </Box>
            ))}
        </Row>
      </AnimatePresence>
      <SliderLeftButton onClick={decreaseIndex}>&lt;</SliderLeftButton>
      <SliderRightButton onClick={increaseIndex}>&gt;</SliderRightButton>
    </Slider>
  );
}

export default ProgramList;
