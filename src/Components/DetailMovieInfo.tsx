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

const WrapDetailInfo = styled.article`
  display: flex;
  flex-direction: column;
  padding: 7px 20px 10px;
  opacity: 0;
  animation: 0.4s forwards ${fadeIn};
`;

const Title = styled.p`
  font-size: 22px;
  font-weight: 600;
`;

const ReleaseDate = styled.span``;

const Runtime = styled.span`
  margin-left: 16px;
`;

const InnerDetailInfo = styled.div`
  margin-top: 10px;
  display: flex;
`;

const Overview = styled.p`
  margin-top: 10px;
  position: relative;
  font-size: 1rem;
  line-height: 1.5em;
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
            <ReleaseDate>{data?.release_date}</ReleaseDate>
            <Runtime>{data?.runtime} min</Runtime>
          </InnerDetailInfo>
          <Overview>{data?.overview}</Overview>
        </WrapDetailInfo>
      )}
    </Wrapper>
  );
}

export default DetailMovieInfo;
