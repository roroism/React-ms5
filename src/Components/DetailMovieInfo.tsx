import { useQuery } from "react-query";
import styled, { keyframes } from "styled-components";
import { getMoviesDetail, IGetMoviesDetail } from "../api";

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
