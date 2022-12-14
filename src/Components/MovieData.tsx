import { useQuery } from "react-query";
import { getMovies, IGetTvResult } from "../api";
import ProgramList, { EnumProgramList } from "./ProgramList";

function MovieData() {
  const { data, isLoading } = useQuery<IGetTvResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  return (
    <ProgramList
      list={EnumProgramList.movies}
      data={data}
      isLoading={isLoading}
    />
  );
}

export default MovieData;
