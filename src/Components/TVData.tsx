import { useQuery } from "react-query";
import { getTvshows, IGetTvResult } from "../api";
import ProgramList, { EnumProgramList } from "./ProgramList";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import DetailTvInfo from "./DetailTvInfo";
import { makeImagePath } from "../utils";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigInfo = styled(motion.div)<{ scrolly: number }>`
  position: fixed;
  width: 50vw;
  height: 80vh;
  /* top: ${(props) => props.scrolly + 100}px; */
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
  z-index: 1000;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  /* text-align: center; */
  font-size: 46px;
  position: absolute;
  width: 100%;
  top: 330px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function TvData() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading } = useQuery<IGetTvResult>(
    ["tv", "onTheAir"],
    getTvshows
  );
  const [searchParam, setSearchParam] = useSearchParams();
  const { scrollY } = useScroll();

  const clickedTv = searchParam.get(EnumProgramList.tv)
    ? data?.results.find(
        (tv) => String(tv.id) === searchParam.get(EnumProgramList.tv)
      )
    : null;
  // searchParam.get(EnumProgramList.tv) &&
  // data?.results.find(
  //   (movie) => String(movie.id) === searchParam.get(EnumProgramList.tv)
  // );

  const onOverlayClick = () => {
    if (location.pathname === "/") navigate("/");
    else navigate(`${location.pathname}`);
  };

  return (
    <>
      <ProgramList
        list={EnumProgramList.tv}
        data={data}
        isLoading={isLoading}
      />
      <AnimatePresence>
        {searchParam.get(EnumProgramList.tv) ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <BigInfo
              layoutId={searchParam.get(EnumProgramList.tv) as string}
              scrolly={scrollY.get()}
            >
              {clickedTv && (
                <>
                  <BigCover
                    style={
                      clickedTv.backdrop_path
                        ? {
                            backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                              clickedTv.backdrop_path,
                              "w500"
                            )})`,
                          }
                        : {
                            backgroundImage: `linear-gradient(to top, black, transparent), url(${
                              process.env.PUBLIC_URL +
                              "/img/content_background.png"
                            })`,
                          }
                    }
                  />
                  <BigTitle>{clickedTv?.name}</BigTitle>
                  {/* <BigOverview>{clickedMovie.overview}</BigOverview> */}
                  {searchParam.get(EnumProgramList.tv) ? (
                    <DetailTvInfo
                      tvId={searchParam.get(EnumProgramList.tv) as string}
                    />
                  ) : null}
                </>
              )}
            </BigInfo>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default TvData;
