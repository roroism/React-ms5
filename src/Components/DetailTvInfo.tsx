import { useQuery } from "react-query";
import styled, { keyframes } from "styled-components";
import { getTvDetail, IGetTvDetail } from "../api";
import { motion } from "framer-motion";
import { makeImagePath } from "../utils";

const Wrapper = styled.article`
  display: flex;
  width: 100%;
  height: calc(100% - 400px);
`;

const fadeIn = keyframes`
  0% {
   opacity: 0;
  }
  100% {
   opacity: 1;
  }
 `;

const WrapPoster = styled.div`
  min-width: 40%;
  padding: 25px 10px;
`;

const PosterBox = styled(motion.div)<{ bgPoster: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: no-repeat center / contain url(${(props) => props.bgPoster});
`;

const WrapDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 7px 20px 10px;
  /* opacity: 0; */
  /* animation: 0.5s forwards ${fadeIn}; */
`;

const Title = styled(motion.p)`
  font-size: 22px;
  font-weight: 600;
`;

const FirstAirDate = styled.span`
  margin-right: 7px;
`;

const LastAirDate = styled.span`
  margin-left: 7px;
`;

const BadgeTv = styled.span`
  display: block;
  color: ${(props) => props.theme.white.lighter};
  border-radius: 3px;
  background-color: green;
  margin-left: 7px;
  padding: 2px 7px;
  font-weight: 700;
`;

const InnerDetailInfo = styled(motion.div)`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const Overview = styled(motion.p)`
  margin-top: 24px;
  position: relative;
  font-size: 1rem;
  line-height: 1.5em;
  overflow-y: auto;
  padding: 5px 2px;
  &::first-letter {
    font-weight: 700;
    font-size: 1.7em;
    color: rgba(299, 9, 20, 0.7);
  }
  &.noDes {
    &::first-letter {
      font-weight: 400;
      font-size: 1rem;
      color: ${(props) => props.theme.white.darker};
    }
  }
  &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    background-color: #777; /* 또는 트랙에 추가한다 */
  }
  &::-webkit-scrollbar-thumb {
    background: #222;
  }
`;

const variantsPoster = {
  start: { opacity: 0, x: -10 },
  end: { opacity: 1, x: 0 },
};

const variants = {
  start: { opacity: 0, y: 10 },
  end: { opacity: 1, y: 0 },
};

interface IDetailTvInfoProps {
  tvId: string;
}

function DetailTvInfo({ tvId }: IDetailTvInfoProps) {
  const { data, isLoading } = useQuery<IGetTvDetail>(["tvshows", tvId], () =>
    getTvDetail(tvId)
  );

  console.log("detail : ", data);
  return (
    <Wrapper>
      {isLoading ? null : (
        <>
          <WrapPoster>
            <PosterBox
              variants={variantsPoster}
              initial="start"
              animate="end"
              transition={{ default: { duration: 0.5, delay: 0.1 } }}
              bgPoster={
                data?.poster_path
                  ? makeImagePath(data?.poster_path, "w500")
                  : process.env.PUBLIC_URL + "/img/content_background.png"
              }
            ></PosterBox>
          </WrapPoster>
          <WrapDetailInfo>
            <Title
              variants={variants}
              initial="start"
              animate="end"
              transition={{ default: { duration: 0.5, delay: 0.1 } }}
            >
              {data?.name}
            </Title>
            <InnerDetailInfo
              variants={variants}
              initial="start"
              animate="end"
              transition={{ default: { duration: 0.5, delay: 0.2 } }}
            >
              <FirstAirDate>{data?.first_air_date}</FirstAirDate>~
              <LastAirDate>{data?.last_air_date}</LastAirDate>
              <BadgeTv>TV</BadgeTv>
            </InnerDetailInfo>
            {data?.overview ? (
              <Overview
                variants={variants}
                initial="start"
                animate="end"
                transition={{ default: { duration: 0.5, delay: 0.3 } }}
              >
                {data?.overview}
              </Overview>
            ) : (
              <Overview
                variants={variants}
                initial="start"
                animate="end"
                transition={{ default: { duration: 0.5, delay: 0.3 } }}
                className="noDes"
              >
                Description not ready
                <br />
                Coming Soon!!
              </Overview>
            )}
          </WrapDetailInfo>
        </>
      )}
    </Wrapper>
  );
}

export default DetailTvInfo;
