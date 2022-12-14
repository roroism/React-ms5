import { useQuery } from "react-query";
import { getTvshows, IGetTvResult } from "../api";
import ProgramList, { EnumProgramList } from "./ProgramList";

function TvData() {
  const { data, isLoading } = useQuery<IGetTvResult>(
    ["tv", "onTheAir"],
    getTvshows
  );

  return (
    <ProgramList list={EnumProgramList.tv} data={data} isLoading={isLoading} />
  );
}

export default TvData;
