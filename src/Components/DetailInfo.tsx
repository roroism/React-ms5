import { useQuery } from "react-query";
import styled from "styled-components";
import { getMoviesDetail } from "../api";

const Wrapper = styled.div`
  width: 100%;
`;

interface IDetailInfoProps {
  movieId: string;
}

function DetailInfo({ movieId }: IDetailInfoProps) {
  const { data, isLoading } = useQuery(["movies", movieId], () =>
    getMoviesDetail(movieId)
  );

  console.log("detail : ", data);
  return <Wrapper>{data ? <div>test</div> : null}</Wrapper>;
}

export default DetailInfo;
