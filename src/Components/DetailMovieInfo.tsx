import { useQuery } from "react-query";
import styled from "styled-components";
import { getMoviesDetail, IGetMoviesDetail } from "../api";
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
          <Title>{data?.title}</Title>
          <InnerDetailInfo>
            {data?.release_date}
            {data?.runtime}
          </InnerDetailInfo>
          <Overview>{data?.overview}</Overview>
        </WrapDetailInfo>
      )}
    </Wrapper>
  );
}

export default DetailMovieInfo;