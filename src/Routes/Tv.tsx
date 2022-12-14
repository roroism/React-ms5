import { motion } from "framer-motion";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getTvshows, IGetTvResult } from "../api";
import { makeImagePath } from "../utils";
import TvData from "../Components/TVData";
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

const TvList = styled.div`
  position: relative;
  top: -100px;
`;

const H2 = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 24px;
  padding: 7px 16px;
  font-weight: 700;
`;

function Tv() {
  const { data, isLoading } = useQuery<IGetTvResult>(
    ["tv", "onTheAir"],
    getTvshows
  );
  // console.log("tv data : ", data);

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
              data?.results[0].backdrop_path
                ? makeImagePath(data?.results[0].backdrop_path)
                : data?.results[0].poster_path
                ? makeImagePath(data?.results[0].poster_path)
                : ""
            }
          >
            <Title>{data?.results[0].name}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <TvList>
            <H2>Tv Shows</H2>
            <TvData />
          </TvList>
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
