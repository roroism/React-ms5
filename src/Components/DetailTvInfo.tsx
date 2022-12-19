import { useQuery } from "react-query";
import styled, { keyframes } from "styled-components";
import { getTvDetail, IGetTvDetail } from "../api";
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
  /* animation: 0.5s forwards ${fadeIn}; */
`;

const Title = styled(motion.p)`
  font-size: 22px;
  font-weight: 600;
`;

const FirstAirDate = styled.span`
  margin-right: 16px;
`;

const LastAirDate = styled.span`
  margin-left: 16px;
`;

const InnerDetailInfo = styled(motion.div)`
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
            >
              Description not ready
            </Overview>
          )}
        </WrapDetailInfo>
      )}
    </Wrapper>
  );
}

export default DetailTvInfo;
