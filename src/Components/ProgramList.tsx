import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { IGetMoviesResult, IGetTvResult, IMovie, ITv } from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import useWindowDimensions from "../Hooks/useWindowDimensions";
import { useLocation, useSearchParams } from "react-router-dom";

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
      /* font-size: 25px; */
      color: orange;
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

const boxVariants = {
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
  movies = "movies",
  tv = "tv",
}

interface IProgramList {
  list: EnumProgramList;
  data: IGetTvResult | IGetMoviesResult | undefined;
  isLoading: boolean;
  movieData?: IGetMoviesResult | undefined;
  tvData?: IGetTvResult | undefined;
}

function ProgramList({
  list,
  data,
  isLoading,
  movieData,
  tvData,
}: IProgramList) {
  const location = useLocation();
  console.log("location : ", location);
  const [searchParam, setSearchParam] = useSearchParams();
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
    // navigate(`/${list}/${id}`);
    setSearchParam({ [list]: id.toString() });
  };

  return (
    <>
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
              .map((content) => (
                <Box
                  layoutId={content.id + ""}
                  key={content.id}
                  variants={boxVariants}
                  whileHover="hover"
                  initial="normal"
                  transition={{ type: "tween" }}
                  onClick={() => onBoxClicked(content.id)}
                  bgPhoto={
                    content.backdrop_path
                      ? makeImagePath(content.backdrop_path, "w500")
                      : process.env.PUBLIC_URL + "/img/content_background.png"
                  }
                >
                  <Info variants={infoVariants}>
                    {list === EnumProgramList.movies ? (
                      <h4>{content.title}</h4>
                    ) : list === EnumProgramList.tv ? (
                      <h4>{content.name}</h4>
                    ) : null}
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
        <SliderLeftButton onClick={decreaseIndex}>&lt;</SliderLeftButton>
        <SliderRightButton onClick={increaseIndex}>&gt;</SliderRightButton>
      </Slider>
    </>
  );
}

export default ProgramList;
