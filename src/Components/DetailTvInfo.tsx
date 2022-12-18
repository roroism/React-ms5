import { useQuery } from "react-query";
import styled, { keyframes } from "styled-components";
import { getTvDetail, IGetTvDetail } from "../api";

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

const WrapDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 7px 20px 10px;
  opacity: 0;
  animation: 0.5s forwards ${fadeIn};
`;

const Title = styled.p`
  font-size: 22px;
`;

const InnerDetailInfo = styled.div`
  display: flex;
`;

const Overview = styled.p`
  font-size: 1rem;
`;

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
          <Title>{data?.name}</Title>
          <InnerDetailInfo>
            {data?.first_air_date}
            {data?.last_air_date}
            {data?.overview}
          </InnerDetailInfo>
          {data?.overview ? (
            <Overview>{data?.overview}</Overview>
          ) : (
            <Overview>Description not ready</Overview>
          )}
        </WrapDetailInfo>
      )}
    </Wrapper>
  );
}

export default DetailTvInfo;
