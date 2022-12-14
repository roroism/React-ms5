import { useQuery } from "react-query";
import styled from "styled-components";
import { getTvDetail, IGetTvDetail } from "../api";
import { Loader } from "../Routes/Home";

const Wrapper = styled.div`
  width: 100%;
`;

const WrapDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 7px 20px 10px;
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
