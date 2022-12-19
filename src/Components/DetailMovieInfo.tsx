import { useQuery } from "react-query";
import styled, { keyframes } from "styled-components";
import { getMoviesDetail, IGetMoviesDetail } from "../api";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  width: 100%;
`;

const fadeIn = keyframes`
  0% {
   opacity: 0;
  }
  100% {
   opacity: 1;
  }
 `;

const WrapDetailInfo = styled.article`
  display: flex;
  flex-direction: column;
  padding: 7px 20px 10px;
  /* opacity: 0; */
  /* animation: 0.4s forwards ${fadeIn}; */
`;

const Title = styled(motion.p)`
  font-size: 22px;
  font-weight: 600;
`;

const ReleaseDate = styled(motion.span)``;

const Runtime = styled(motion.span)`
  margin-left: 16px;
`;

const InnerDetailInfo = styled.div`
  margin-top: 10px;
  display: flex;
`;

const Overview = styled(motion.p)`
  margin-top: 10px;
  position: relative;
  font-size: 1rem;
  line-height: 1.5em;
`;

const variants = {
  start: { opacity: 0, y: 10 },
  end: { opacity: 1, y: 0 },
};

interface IDetailMovieInfoProps {
  movieId: string;
}

function DetailMovieInfo({ movieId }: IDetailMovieInfoProps) {
  const { data, isLoading } = useQuery<IGetMoviesDetail>(
    ["movies", movieId],
    () => getMoviesDetail(movieId)
  );

  console.log("detail : ", data);
  return (
    <Wrapper>
      {isLoading ? null : (
        <WrapDetailInfo>
          <Title
            variants={variants}
            initial="start"
            animate="end"
            transition={{ default: { duration: 0.5, delay: 0.1 } }}
          >
            {data?.title}
          </Title>
          <InnerDetailInfo>
            <ReleaseDate
              variants={variants}
              initial="start"
              animate="end"
              transition={{ default: { duration: 0.5, delay: 0.2 } }}
            >
              {data?.release_date}
            </ReleaseDate>
            <Runtime
              variants={variants}
              initial="start"
              animate="end"
              transition={{ default: { duration: 0.5, delay: 0.2 } }}
            >
              {data?.runtime} min
            </Runtime>
          </InnerDetailInfo>
          <Overview
            variants={variants}
            initial="start"
            animate="end"
            transition={{ default: { duration: 0.5, delay: 0.3 } }}
          >
            {data?.overview}
          </Overview>
        </WrapDetailInfo>
      )}
    </Wrapper>
  );
}

export default DetailMovieInfo;
